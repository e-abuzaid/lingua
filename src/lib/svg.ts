const BASE64_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

export function toSvgDataUri(svg: string): string {
  let output = "";
  for (let i = 0; i < svg.length; i += 3) {
    const b1 = svg.charCodeAt(i) & 0xff;
    const b2 = i + 1 < svg.length ? svg.charCodeAt(i + 1) & 0xff : 0;
    const b3 = i + 2 < svg.length ? svg.charCodeAt(i + 2) & 0xff : 0;
    const triplet = (b1 << 16) | (b2 << 8) | b3;

    output += BASE64_CHARS[(triplet >> 18) & 0x3f];
    output += BASE64_CHARS[(triplet >> 12) & 0x3f];
    output += i + 1 < svg.length ? BASE64_CHARS[(triplet >> 6) & 0x3f] : "=";
    output += i + 2 < svg.length ? BASE64_CHARS[triplet & 0x3f] : "=";
  }
  return `data:image/svg+xml;base64,${output}`;
}

