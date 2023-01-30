import puppeteer from "puppeteer";
import cheerio from "cheerio";
import debug from "./utils/debug";
import { kream_옷 } from "./targets/shopping/kream";
import { kream_신발 } from "./targets/shopping/kream_shoes";
const fs = require("fs");

const log = debug("index");

const targets = [kream_신발, kream_옷];

(async () => {
  log("스크래핑 시작");
  const browser = await puppeteer.launch();
  const [page] = await browser.pages();

  for (const item of targets) {
    await page.goto(item.url, {
      waitUntil: "networkidle0",
    });

    const $ = cheerio.load(await page.content());
    const array = item.filter($);

    fs.writeFileSync(`data/${item.site_name}.json`, JSON.stringify(array));
  }

  await browser.close();
  log("스크래핑 완료");
})();
