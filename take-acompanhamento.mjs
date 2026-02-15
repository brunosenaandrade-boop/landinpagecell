import { chromium } from "playwright";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, "public", "screenshots");

const BASE_URL = "https://cellflow.com.br";
const EMAIL = "teste.prints@cellflow.com.br";
const PASSWORD = "Teste@123456";
const TRACKING_CODE = "TK7X9BPL";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("Launching Chromium...\n");

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  // Desktop context first to login
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo",
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();

  // Login
  console.log("Logging in...");
  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
  await sleep(1500);
  await page.fill('input[type="email"], input[name="email"]', EMAIL);
  await page.fill('input[type="password"], input[name="password"], input[name="senha"]', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard**", { timeout: 30000 });
  await sleep(2000);
  console.log("Logged in!\n");

  // Try acompanhar with logged-in session (desktop)
  console.log("Trying /acompanhar/ with session...");
  await page.goto(`${BASE_URL}/acompanhar/${TRACKING_CODE}`, { waitUntil: "networkidle" });
  await sleep(4000);

  let pageContent = await page.content();
  console.log("Page title:", await page.title());
  console.log("URL:", page.url());
  console.log("Has 404:", pageContent.includes("404"));
  console.log("Has OS data:", pageContent.includes("Motorola") || pageContent.includes("Moto G52") || pageContent.includes("Em Andamento"));

  // If it loaded, take mobile screenshot
  if (pageContent.includes("Motorola") || pageContent.includes("Moto G52") || pageContent.includes("Em Andamento") || pageContent.includes("Bateria")) {
    console.log("\n✓ Page loaded with OS data!");

    // Resize to mobile for a nice screenshot
    await page.setViewportSize({ width: 430, height: 932 });
    await sleep(1000);

    await page.screenshot({
      path: join(SCREENSHOTS_DIR, "acompanhamento.png"),
      fullPage: true,
      type: "png",
    });
    console.log("✓ acompanhamento.png saved (mobile view)");
  } else {
    console.log("\nPage didn't load OS data. Trying to debug...");

    // Check all links/routes that might work
    const routes = [
      `/acompanhar/${TRACKING_CODE}`,
      `/acompanhamento/${TRACKING_CODE}`,
      `/os/acompanhar/${TRACKING_CODE}`,
      `/rastreio/${TRACKING_CODE}`,
    ];

    for (const route of routes) {
      console.log(`  Testing ${route}...`);
      await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle", timeout: 10000 }).catch(() => {});
      await sleep(2000);
      const content = await page.content();
      const url = page.url();
      const has404 = content.includes("404");
      const hasData = content.includes("Motorola") || content.includes("Em Andamento");
      console.log(`    URL: ${url}, 404: ${has404}, hasData: ${hasData}`);
      if (hasData) {
        await page.setViewportSize({ width: 430, height: 932 });
        await sleep(1000);
        await page.screenshot({
          path: join(SCREENSHOTS_DIR, "acompanhamento.png"),
          fullPage: true,
          type: "png",
        });
        console.log("    ✓ Screenshot captured!");
        break;
      }
    }
  }

  await browser.close();
}

main().catch(console.error);
