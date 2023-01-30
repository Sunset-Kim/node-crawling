import { CheerioAPI } from "cheerio";
import { SiteInfo } from "../../types/siteInfo.type";
import debug from "../../utils/debug";
import { v4 as uuidv4 } from "uuid";

const log = debug("크림 |");

export const kream_옷: SiteInfo = {
  type: "infinite",
  site_name: "크림_옷",
  url: "https://kream.co.kr/search?category_id=2&per_page=40",
  filter: ($: CheerioAPI) => {
    try {
      const arr: any[] = [];

      $(".search_result_list > .product_card").each((i, el) => {
        const image = $(el).find(".product .picture.product_img .image").attr("src") || "";
        const brand = $(el).find(".product_info_area .title .product_info_brand.brand").text().trim();
        const name = $(el).find(".product_info_area .product_info_product_name .translated_name").text();
        const id = uuidv4();
        const category = 'clothes';
        
        arr.push({ id, image, brand, name,category });
      });
      return arr;
    } catch (error) {}
  },
};
