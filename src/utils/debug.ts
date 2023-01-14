const COLORS = ["\x1b[31m", "\x1b[32m", "\x1b[33m", "\x1b[34m", "\x1b[35m", "\x1b[36m"];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default function debug(keyword: string) {
  return function log(message: any) {
    try {
      const print = typeof message === "string" ? message : JSON.stringify(message);
      return console.log(`\x1b[1m${getRandomColor()}%s`, keyword, print);
    } catch (error) {
      console.log(`\x1b[1m${getRandomColor()}%s`, "error: JSON.stringify in debug");
    }
  };
}
