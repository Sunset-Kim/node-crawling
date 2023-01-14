import { CheerioAPI } from "cheerio";

export interface SiteInfo {
  type: "infinite" | "default";
  site_name: string;
  url: string;
  filter: ($: CheerioAPI) => unknown;
}
