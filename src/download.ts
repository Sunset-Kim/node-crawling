import { readFileSync, writeFile } from "node:fs";

const node_fetch = require("node-fetch");
const path = require("path");

async function download() {
  const filePath = path.resolve(__dirname, "../data", "크림_옷.json");
  const response = readFileSync(filePath, "utf-8");
  const items = JSON.parse(response) as { name: string; image: string }[];

  const promises = items.map(async ({ name, image }) => {
    const response = await node_fetch(image);
    const buffer = await response.buffer();
    writeFile(`data/kream/${name}.png`, buffer, () => {
      console.log(`${name} 완료`);
    });
    return;
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
