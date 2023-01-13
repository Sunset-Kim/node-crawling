const COLORS = ["\x1b[31m", "\x1b[32m", "\x1b[33m", "\x1b[34m", "\x1b[35m", "\x1b[36m"];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default function debug(keyword: string) {
  return function log(message: string) {
    console.log(`\x1b[1m${getRandomColor()}%s`, keyword, message);
  };
}
