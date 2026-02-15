import { chromium } from "playwright";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, "public", "screenshots");

const BASE_URL = "https://cellflow.com.br";
const EMAIL = "teste.prints@cellflow.com.br";
const PASSWORD = "Teste@123456";
const TRACKING_CODE = "F6HDYNBN";

// Desktop viewport - wide enough to show full UI
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
    deviceScaleFactor: 2, // Retina quality (2x resolution)
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo",
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();

  // ===================== LOGIN =====================
  console.log("1/7 Logging in...");
  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
  await sleep(1500);

  // Fill login form
  await page.fill('input[type="email"], input[name="email"]', EMAIL);
  await page.fill('input[type="password"], input[name="password"], input[name="senha"]', PASSWORD);

  // Click login button
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard**", { timeout: 30000 });
  await waitForPageReady(page, 4000);

  console.log("   Logged in successfully!\n");

  // ===================== DASHBOARD =====================
  console.log("2/7 Capturing Dashboard...");
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: "networkidle" });
  await waitForPageReady(page, 4000);

  // Scroll down slightly to trigger lazy-loaded content, then back up
  await page.evaluate(() => window.scrollTo(0, 300));
  await sleep(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1000);

  await page.screenshot({
    path: join(SCREENSHOTS_DIR, "dashboard.png"),
    fullPage: false, // Just viewport - shows the main KPI area
    type: "png",
  });
  console.log("   ✓ dashboard.png saved\n");

  // ===================== PDV =====================
  console.log("3/7 Capturing PDV...");
  await page.goto(`${BASE_URL}/vendas`, { waitUntil: "networkidle" });
  await waitForPageReady(page, 3000);

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

  // ===================== ACOMPANHAMENTO PÚBLICO =====================
  console.log("7/7 Capturing Acompanhamento Público...");

  // Open a new page without auth cookies for public feel
  const publicPage = await context.newPage();

  // Use mobile viewport for this one (customers use mobile)
  await publicPage.setViewportSize({ width: 430, height: 932 });

  await publicPage.goto(`${BASE_URL}/acompanhar/${TRACKING_CODE}`, {
    waitUntil: "networkidle",
  });
  await waitForPageReady(publicPage, 3000);

  await publicPage.screenshot({
    path: join(SCREENSHOTS_DIR, "acompanhamento.png"),
    fullPage: true, // Full page for the mobile view
    type: "png",
  });
  console.log("   ✓ acompanhamento.png saved\n");

  await publicPage.close();

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
