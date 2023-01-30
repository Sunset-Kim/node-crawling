import { readFileSync, writeFile } from "node:fs";

const node_fetch = require("node-fetch");
const path = require("path");

const clothes = {
  category: "clothes",
  path: path.resolve(__dirname, "../data", "크림_옷.json"),
};
const shoes = {
  category: "shoes",
  path: path.resolve(__dirname, "../data", "크림_신발.json"),
};

const paths = [shoes, clothes];

async function download() {
  const items = paths.map(({ path, category }) => {
    const response = readFileSync(path, "utf-8");
    return { category, data: JSON.parse(response) as { id: string; name: string; image: string }[] };
  });

  const promises = items.map(({ category, data }) => {
    return data.map(async ({ name, image, id }) => {
      const response = await node_fetch(image);
      const buffer = await response.buffer();
      writeFile(path.resolve(__dirname, "../data/kream", category, `${id}.png`), buffer, (err) => {
        if (err === null) {
          console.log(`${name} 완료`);
          return;
        }
        console.log(err);
      });
      return;
    });
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    console.log("에러");
  }

  console.log("완료");
}

(async () => {
  await download();
})();
