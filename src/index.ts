export type colorfulConfig = {
  start: string;
  end: string;
  hex: boolean;
  st: number;
  func: (color: string) => void;
};

function hexToRgbArr(hex: string): number[] {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (reg.test(hex)) {
    const color: number[] = [];
    hex = hex.slice(1);

    if (hex.length === 3) {
      for (let i = 0; i < 3; i++) {
        color.push(parseInt(hex[i] + hex[i], 16));
      }
      return color;
    } else if (hex.length === 6) {
      for (let i = 0; i < 3; i++) {
        color.push(parseInt('0x' + hex.substring(i * 2, i * 2 + 2), 16));
      }
      return color;
    }
  }
  return [0, 0, 0];
}

function parseRgbToArr(rgb: string) {
  const regex: RegExp = /^rgb\((?<r>[0-9]+),(?<g>[0-9]+),(?<b>[0-9]+)\)$/gm;
  const m: RegExpMatchArray | null = regex.exec(rgb);
  if (!m) {
    // @ts-ignore
    return [m.groups?.r || 0, m.groups?.g || 0, m.groups?.b || 0];
  } else {
    return [0, 0, 0];
  }
}

export function CaculateColor(config: colorfulConfig): string {
  let start: number[] = [0, 0, 0];
  let end: number[] = [0, 0, 0];
  if (config.hex) {
    start = hexToRgbArr(config.start);
    end = hexToRgbArr(config.end);
  } else {
    start = parseRgbToArr(config.start);
    end = parseRgbToArr(config.end);
  }

  const res: number[] = [];
  for (let i = 0; i < 3; i++) {
    res.push(Math.round(start[i] + (end[i] - start[i]) * config.st));
  }
  const out: string = `rgb(${res[0]},${res[1]},${res[2]})`;
  config.func(out);
  return out;
}
