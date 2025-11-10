import * as convert from '@csstools/convert-colors';

interface HSLColor {
  hue: number
  saturation: number
  lightness: number
  opacity: number
}

export function toRGB(color: string) {
  const hsl = toHSL(color);

  const rgb = hsl.lightness === 100 
    ? [255, 255, 255]
    : convert.hsl2rgb(hsl.hue, hsl.saturation, hsl.lightness);

  const red = interpolate(rgb[0],[0, 100], [0, 255]);
  const green = interpolate(rgb[1],[0, 100], [0, 255]);
  const blue = interpolate(rgb[2],[0, 100], [0, 255]);
  
  return {
    red: red,
    green: green,
    blue: blue,
    opacity: hsl.opacity
  }
}

/**
 * Converts a color to a fully transparent version while preserving the RGB values.
 * This is useful for creating fade effects where you want to transition from a solid color to transparent.
 * @param color - The color to make transparent (can be hex, rgb, or hsl format)
 * @returns An rgba string with 0 opacity but same RGB values as input color
 */
export function toTransparent(color: string) {
  const rgb = toRGB(color);
  const transparentBackground = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0)`;
  return transparentBackground;
}

export function toOpaque(color: string) {
  const rgb = toRGB(color);

  const opaqueBackground = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 1)`;
  return opaqueBackground;
}

export function toHSL(color: string): HSLColor {
  // Already in HSL format
  if (color.startsWith('hsl')) {
    const matches = color.match(/\d+\.?\d*/g)!.map(Number);
    const [h, s, l] = matches;
    const opacity = matches[3];
    return {
      hue: h,
      saturation: s,
      lightness: l,
      opacity: opacity !== undefined ? opacity : 1
    };
  }

  // Convert hex to HSL
  if (color.startsWith('#')) {
    const [h, s, l] = convert.hexToHSL(color);
    return {
      hue: h,
      saturation: s,
      lightness: l,
      opacity: 1
    };
  }

  // Convert RGB/RGBA to HSL
  if (color.startsWith('rgb')) {
    const rgba = getRGB(color);

    // convert only the rgb values between 0-100.
    const red = interpolate(rgba.red,[0, 255], [0, 100]);
    const green = interpolate(rgba.green,[0, 255], [0, 100]);
    const blue = interpolate(rgba.blue,[0, 255], [0, 100]);
    const [h, s, l] = convert.rgb2hsl(red, green, blue);

    return {
      hue: h,
      saturation: s,  
      lightness: l,
      opacity: rgba.alpha
    };
  }

  // Default fallback to black in HSL
  return {
    hue: 0,
    saturation: 0,
    lightness: 0,
    opacity: 1
  };
}

const getRGB = (color: string) => {
  const matches = color.match(/\d+\.?\d*/g)!.map(Number);
  const [r, g, b, a = 1] = matches;

  return {
    red: r,
    green: g,
    blue: b,
    alpha: a
  };
}

const interpolate = (value: number, inputRange: number[], outputRange: number[]) => {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  
  if (inputMax - inputMin === 0) return outputMin;
  
  const progress = (value - inputMin) / (inputMax - inputMin);
  return outputMin + progress * (outputMax - outputMin);
}

