import { CheerioAPI } from "cheerio";

export interface SiteInfo {
  site_name: string;
  url: string;
  fliter: ($: CheerioAPI) => unknown;
}
