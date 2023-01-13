import puppeteer from "puppeteer";
import cheerio, { CheerioAPI } from "cheerio";
import debug from "./utils/debug";
import { starbucks } from "./targets/starbucks";
import { 바나프레소 } from "./targets/bana";
const fs = require("fs");

const log = debug("index");

const targets = [starbucks, 바나프레소];

(async () => {
  log("스크래핑 시작");
  const browser = await puppeteer.launch();
  const [page] = await browser.pages();

  for (const item of targets) {
    await page.goto(item.url, {
      waitUntil: "networkidle0",
    });

    const $ = cheerio.load(await page.content());
    const array = item.fliter($);
    fs.writeFileSync(`data/${item.site_name}.json`, JSON.stringify(array));
  }

  await browser.close();
  log("스크래핑 완료");
})();
