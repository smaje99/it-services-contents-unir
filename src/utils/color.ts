export type HexColor = `#${string}`;
export type RGBColor = [number, number, number];
export type Color = HexColor | RGBColor;

export function hexToRgb(hex: HexColor): RGBColor {
  const cleaned = hex.replace('#', '').trim();
  const full =
    cleaned.length === 3
      ? cleaned.split('').map((colorChar) => colorChar + colorChar).join('')
      : cleaned;

  const r = parseInt(full.substring(0, 2), 16);
  const g = parseInt(full.substring(2, 4), 16);
  const b = parseInt(full.substring(4, 6), 16);

  return [r, g, b];
}

export function mixColors(color1: RGBColor, color2: RGBColor, weight: number): RGBColor {
  const lerp = (x: number, y: number) => Math.round(x + (y - x) * weight);
  return [lerp(color1[0], color2[0]), lerp(color1[1], color2[1]), lerp(color1[2], color2[2])];
}

export function darkenColor(color: RGBColor, amount: number): RGBColor {
  return mixColors(color, [0, 0, 0], amount);
}

export function lightenColor(color: RGBColor, amount: number): RGBColor {
  return mixColors(color, [255, 255, 255], amount);
}

export function gradientColors(color: HexColor): RGBColor[] {
  const baseRgb = hexToRgb(color);
  const color1 = darkenColor(lightenColor(baseRgb, 0.1), 0.18);
  const color2 = darkenColor(baseRgb, 0.28);
  const color3 = lightenColor(baseRgb, 0.42);
  return [color1, color2, color3];
}
