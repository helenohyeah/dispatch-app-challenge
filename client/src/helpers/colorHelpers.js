/**
 * Returns a hex color given hue, saturation, and lightness
 * Based on code from: https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
 */
const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

/**
 * Returns a random color given a number between 1-10
 */
const getRandColor = (num) => {
  const h = num * 35; // max 356
  const s = 50;
  const l = 50;
  const hexColor = hslToHex(h, s, l);
  return hexColor;
};

export { getRandColor };
