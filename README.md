# node-crawling
- node, puppeteer, cheerio를 이용해서 간단히 crawling을 할 수 있습니다

# install
```
npm install
```

# Usage

0. target을 등록한다
```ts
// ...target/file.ts

export const target: SiteInfo = {
  type: "infinite", // 0. infinite scroll 인 사이트
  site_name: "name", // 1. site name
  url: "url",
  filter: ($: CheerioAPI) => {
    try {
      const arr: any[] = [];
      
      // 2. 찾을 dom을 등록
      $(".search_result_list > .product_card").each((i, el) => {
        const image = $(el).find(".product .picture.product_img .image").attr("src") || "";
        const brand = $(el).find(".product_info_area .title .product_info_brand.brand").text().trim();
        const name = $(el).find(".product_info_area .product_info_product_name .translated_name").text();
        const category = "shoes";
        const id = uuidv4();

        const item = { id, image, brand, name, category };
        log(item);
        arr.push(item);
      });

      log(arr);
      return arr;
    } catch (error) {}
  },
};
```

1. index.ts, target file을 등록한다
```ts
// 1.1 target을 등록
const targets = [target];

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

    // 1.2 경로를 입력
    fs.writeFileSync(`data/${item.site_name}.json`, JSON.stringify(array));
  }

  await browser.close();
  log("스크래핑 완료");
})();
```

3. script 실행

```
npm run start
```
