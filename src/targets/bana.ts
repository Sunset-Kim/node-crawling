import { CheerioAPI } from "cheerio";
import { CafeMenu } from "../types/cafemunu.type";
import { SiteInfo } from "../types/siteInfo.type";
import debug from "../utils/debug";

const log = debug("바나프레소 |");

export const 바나프레소: SiteInfo = {
  site_name: "바나프레소",
  url: "https://banapresso.com/menu",
  fliter($: CheerioAPI) {
    const arr: CafeMenu[] = [];

    $(".menu_box").each((i, el) => {
      const image = $(el).find(".img img").attr("src") || "";
      const name = $(el).find(".menu_name i").text();
      log(`${i + 1}번째 ${image} ${name}`);

      arr.push({ image, name });
    });

    return arr;
  },
};
