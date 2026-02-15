import { chromium } from "playwright";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, "public", "screenshots");

const BASE_URL = "https://cellflow.com.br";
const EMAIL = "teste.prints@cellflow.com.br";
const PASSWORD = "Teste@123456";
const TRACKING_CODE = "TK7X9BPL";

const VIEWPORT = { width: 1440, height: 960 };

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForPageReady(page, extraWait = 2000) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await sleep(extraWait);
}

async function main() {
  console.log("═══════════════════════════════════════");
  console.log("  Capturing all screenshots");
  console.log("═══════════════════════════════════════\n");

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
  console.log("1/7 Logging in...");
  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
  await sleep(1500);

  await page.fill('input[type="email"], input[name="email"]', EMAIL);
  await page.fill(
    'input[type="password"], input[name="password"], input[name="senha"]',
    PASSWORD
  );
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard**", { timeout: 30000 });
  await waitForPageReady(page, 4000);
  console.log("   Logged in!\n");

  // ===================== DASHBOARD =====================
  console.log("2/7 Capturing Dashboard...");
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: "networkidle" });
  await waitForPageReady(page, 4000);

  // Scroll to trigger lazy content, then back up
  await page.evaluate(() => window.scrollTo(0, 300));
  await sleep(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1000);

  await page.screenshot({
    path: join(SCREENSHOTS_DIR, "dashboard.png"),
    fullPage: false,
    type: "png",
  });
  console.log("   ✓ dashboard.png saved\n");

  // ===================== PDV WITH 4 PRODUCTS =====================
  console.log("3/7 Capturing PDV with 4 products in cart...");
  await page.goto(`${BASE_URL}/vendas`, { waitUntil: "networkidle" });
  await waitForPageReady(page, 3000);

  const searchInput = page
    .locator('input[placeholder*="Buscar produto"]')
    .first();

  // Product 1: Película de Vidro 3D
  await searchInput.click();
  await searchInput.fill("Película");
  await sleep(1500);
  let result = page.locator("text=Película de Vidro 3D").first();
  if (await result.isVisible().catch(() => false)) {
    await result.click();
    await sleep(1000);
  } else {
    const anyResult = page.locator('[role="option"]').first();
    if (await anyResult.isVisible().catch(() => false)) {
      await anyResult.click();
      await sleep(1000);
    }
  }

  // Product 2: Capinha Anti-Shock Premium
  await searchInput.click();
  await searchInput.fill("Capinha Anti");
  await sleep(1500);
  result = page.locator("text=Capinha Anti-Shock").first();
  if (await result.isVisible().catch(() => false)) {
    await result.click();
    await sleep(1000);
  } else {
    const anyResult = page.locator('[role="option"]').first();
    if (await anyResult.isVisible().catch(() => false)) {
      await anyResult.click();
      await sleep(1000);
    }
  }

  // Product 3: Fone Bluetooth i12 TWS
  await searchInput.click();
  await searchInput.fill("Fone");
  await sleep(1500);
  result = page.locator("text=Fone Bluetooth").first();
  if (await result.isVisible().catch(() => false)) {
    await result.click();
    await sleep(1000);
  } else {
    const anyResult = page.locator('[role="option"]').first();
    if (await anyResult.isVisible().catch(() => false)) {
      await anyResult.click();
      await sleep(1000);
    }
  }

  // Product 4: Carregador Turbo USB-C 33W
  await searchInput.click();
  await searchInput.fill("Carregador");
  await sleep(1500);
  result = page.locator("text=Carregador Turbo").first();
  if (await result.isVisible().catch(() => false)) {
    await result.click();
    await sleep(1000);
  } else {
    const anyResult = page.locator('[role="option"]').first();
    if (await anyResult.isVisible().catch(() => false)) {
      await anyResult.click();
      await sleep(1000);
    }
  }

  // Clear search and wait for toasts to disappear
  await page.keyboard.press("Escape");
  await sleep(4000);

  await page.screenshot({
    path: join(SCREENSHOTS_DIR, "pdv.png"),
    fullPage: false,
    type: "png",
  });
  console.log("   ✓ pdv.png saved\n");

  // ===================== ORDENS DE SERVIÇO =====================
  console.log("4/7 Capturing Ordens de Serviço...");
  await page.goto(`${BASE_URL}/ordens-servico`, { waitUntil: "networkidle" });
  await waitForPageReady(page, 3000);

  await page.screenshot({
    path: join(SCREENSHOTS_DIR, "os.png"),
    fullPage: false,
    type: "png",
  });
  console.log("   ✓ os.png saved\n");

  // ===================== CAIXA =====================
  console.log("5/7 Capturing Caixa...");
  await page.goto(`${BASE_URL}/caixa`, { waitUntil: "networkidle" });
  await waitForPageReady(page, 3000);

  await page.screenshot({
    path: join(SCREENSHOTS_DIR, "caixa.png"),
    fullPage: false,
    type: "png",
  });
  console.log("   ✓ caixa.png saved\n");

  // ===================== ESTOQUE =====================
  console.log("6/7 Capturing Estoque...");
  await page.goto(`${BASE_URL}/estoque`, { waitUntil: "networkidle" });
  await waitForPageReady(page, 3000);

  await page.screenshot({
    path: join(SCREENSHOTS_DIR, "estoque.png"),
    fullPage: false,
    type: "png",
  });
  console.log("   ✓ estoque.png saved\n");

  // ===================== ACOMPANHAMENTO PÚBLICO (MOBILE) =====================
  console.log("7/7 Capturing Acompanhamento Público (mobile)...");

  const publicContext = await browser.newContext({
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2,
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo",
    ignoreHTTPSErrors: true,
  });

  const publicPage = await publicContext.newPage();
  await publicPage.goto(`${BASE_URL}/acompanhar/${TRACKING_CODE}`, {
    waitUntil: "networkidle",
  });
  await waitForPageReady(publicPage, 3000);

  await publicPage.screenshot({
    path: join(SCREENSHOTS_DIR, "acompanhamento.png"),
    fullPage: true,
    type: "png",
  });
  console.log("   ✓ acompanhamento.png saved\n");

  await publicPage.close();
  await publicContext.close();

  // ===================== DONE =====================
  await browser.close();

  console.log("═══════════════════════════════════════");
  console.log("✅ All 6 screenshots captured!");
  console.log(`📁 Saved to: ${SCREENSHOTS_DIR}`);
  console.log("═══════════════════════════════════════");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
