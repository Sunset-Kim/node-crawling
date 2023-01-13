import { CheerioAPI } from "cheerio";
import { CafeMenu } from "../types/cafemunu.type";
import { SiteInfo } from "../types/siteInfo.type";
import debug from "../utils/debug";

const log = debug("스타벅스 |");

export const starbucks: SiteInfo = {
  site_name: "스타벅스",
  url: "https://www.starbucks.co.kr/menu/drink_list.do",
  fliter: ($: CheerioAPI) => {
    const array: CafeMenu[] = [];

    $(".menuDataSet dl").each((i, el) => {
      const image = $(el).find("dt a img").attr("src") || "";
      const name = $(el).find("dd").text();

      log(`${i + 1}번째 ${image} ${name}`);

      array.push({ name, image });
    });

    return array;
  },
};
