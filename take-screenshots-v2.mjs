import { chromium } from "playwright";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, "public", "screenshots");

const BASE_URL = "https://cellflow.com.br";
const EMAIL = "teste.prints@cellflow.com.br";
const PASSWORD = "Teste@123456";
const TRACKING_CODE = "F6HDYNBN";

const VIEWPORT = { width: 1440, height: 900 };

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForPageReady(page, extraWait = 2000) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await sleep(extraWait);
}

async function main() {
  console.log("Launching Chromium...\n");

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo",
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();

  // ===================== LOGIN =====================
  console.log("1/3 Logging in...");
  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
  await sleep(1500);

  await page.fill('input[type="email"], input[name="email"]', EMAIL);
  await page.fill('input[type="password"], input[name="password"], input[name="senha"]', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard**", { timeout: 30000 });
  await waitForPageReady(page, 3000);
  console.log("   Logged in!\n");

  // ===================== PDV WITH PRODUCTS =====================
  console.log("2/3 Capturing PDV with products in cart...");
  await page.goto(`${BASE_URL}/vendas`, { waitUntil: "networkidle" });
  await waitForPageReady(page, 3000);

  // Search and add a product
  const searchInput = page.locator('input[placeholder*="Buscar produto"]').first();
  await searchInput.click();
  await searchInput.fill("Película");
  await sleep(1500);

  // Click on the first search result
  const firstResult = page.locator('[role="option"], [class*="search-result"], [class*="item"]').first();
  if (await firstResult.isVisible().catch(() => false)) {
    await firstResult.click();
    await sleep(1000);
  } else {
    // Try clicking on any list item that appears in dropdown
    const dropdownItem = page.locator('text=Película de Vidro 3D').first();
    if (await dropdownItem.isVisible().catch(() => false)) {
      await dropdownItem.click();
      await sleep(1000);
    }
  }

  // Add another product
  await searchInput.click();
  await searchInput.fill("Capinha");
  await sleep(1500);
  const capinhaItem = page.locator('text=Capinha Anti-Shock').first();
  if (await capinhaItem.isVisible().catch(() => false)) {
    await capinhaItem.click();
    await sleep(1000);
  } else {
    const anyResult2 = page.locator('[role="option"]').first();
    if (await anyResult2.isVisible().catch(() => false)) {
      await anyResult2.click();
      await sleep(1000);
    }
  }

  // Add a third product
  await searchInput.click();
  await searchInput.fill("Fone");
  await sleep(1500);
  const foneItem = page.locator('text=Fone Bluetooth').first();
  if (await foneItem.isVisible().catch(() => false)) {
    await foneItem.click();
    await sleep(1000);
  } else {
    const anyResult3 = page.locator('[role="option"]').first();
    if (await anyResult3.isVisible().catch(() => false)) {
      await anyResult3.click();
      await sleep(1000);
    }
  }

  // Clear search focus and wait for toast to disappear
  await page.keyboard.press("Escape");
  await sleep(4000);

  await page.screenshot({
    path: join(SCREENSHOTS_DIR, "pdv.png"),
    fullPage: false,
    type: "png",
  });
  console.log("   ✓ pdv.png saved\n");

  // ===================== ACOMPANHAMENTO =====================
  console.log("3/3 Capturing Acompanhamento...");

  // Try the public tracking page in a new context (no cookies)
  const publicContext = await browser.newContext({
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2,
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo",
    ignoreHTTPSErrors: true,
  });
  const publicPage = await publicContext.newPage();

  // Try the URL - if it 404s, try with www or different path
  let acompanhamentoOk = false;

  const urls = [
    `${BASE_URL}/acompanhar/${TRACKING_CODE}`,
    `${BASE_URL}/acompanhamento/${TRACKING_CODE}`,
    `${BASE_URL}/os/${TRACKING_CODE}`,
  ];

  for (const url of urls) {
    console.log(`   Trying: ${url}`);
    await publicPage.goto(url, { waitUntil: "networkidle", timeout: 15000 }).catch(() => {});
    await sleep(3000);

    // Check if it's a 404
    const is404 = await publicPage.locator('text=404').isVisible().catch(() => false);
    const hasContent = await publicPage.locator('text=Motorola, text=Moto G52, text=em_andamento, text=Em Andamento, text=OS').first().isVisible().catch(() => false);

    if (!is404 || hasContent) {
      acompanhamentoOk = true;
      break;
    }
  }

  if (!acompanhamentoOk) {
    console.log("   Public page returned 404 on all routes.");
    console.log("   Taking screenshot of whatever is visible...");
  }

  await publicPage.screenshot({
    path: join(SCREENSHOTS_DIR, "acompanhamento.png"),
    fullPage: true,
    type: "png",
  });
  console.log("   ✓ acompanhamento.png saved\n");

  await publicContext.close();
  await browser.close();

  console.log("═══════════════════════════════════════");
  console.log("✅ Screenshots updated!");
  console.log("═══════════════════════════════════════");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
