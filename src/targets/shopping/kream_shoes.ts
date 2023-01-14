import { CheerioAPI } from "cheerio";
import { SiteInfo } from "../../types/siteInfo.type";
import debug from "../../utils/debug";

const log = debug("크림신발 | ");

export const kream_신발: SiteInfo = {
  type: "infinite",
  site_name: "크림_신발",
  url: "https://kream.co.kr/search?category_id=34&per_page=40",
  filter: ($: CheerioAPI) => {
    try {
      const arr: any[] = [];

      $(".search_result_list > .product_card").each((i, el) => {
        const image = $(el).find(".product .picture.product_img .image").attr("src") || "";
        const brand = $(el).find(".product_info_area .title .product_info_brand.brand").text().trim();
        const name = $(el).find(".product_info_area .product_info_product_name .translated_name").text();

        const item = { image, brand, name };
        log(item);
        arr.push({ image, brand, name });
      });
      return arr;
    } catch (error) {}
  },
};
