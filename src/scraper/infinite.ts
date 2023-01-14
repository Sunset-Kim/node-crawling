import { kream_옷 } from "../targets/shopping/kream";
import { kream_신발 } from "../targets/shopping/kream_shoes";
import debug from "../utils/debug";

const log = debug("무한스크롤_스크래핑");

const cheerio = require("cheerio");
const fs = require("fs");
const puppeteer = require("puppeteer");

function extractItems() {
  const extractedElements = Array.from(document.querySelectorAll(".search_result_list > .product_card"));
  const items = [];
  for (let element of extractedElements) {
    items.push(element.innerHTML);
  }
  return items;
}

async function scrapeItems(page: any, extractItems: () => string[], itemCount: number, scrollDelay = 800) {
  let items = [];
  try {
    let previousHeight;
    while (items.length < itemCount) {
      items = await page.evaluate(extractItems);
      previousHeight = await page.evaluate("document.body.scrollHeight");
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await page.waitForTimeout(scrollDelay);
    }
    return await page.content();
  } catch (e) {}
}

const targets = [kream_옷, kream_신발];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  log("스크래핑 시작");

  for (let site of targets) {
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 926 });

    await page.goto(site.url);

    const content = await scrapeItems(page, extractItems, 30);
    const $ = cheerio.load(content);
    const arr = site.filter($);

    fs.writeFileSync(`data/${site.site_name}.json`, JSON.stringify(arr));

    log("파일저장완료");
  }
  await browser.close();
  log("스크래핑 완료");
})();
