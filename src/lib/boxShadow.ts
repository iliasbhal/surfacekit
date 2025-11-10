import hexToHSL from 'hex-to-hsl';
import rgbToHSL from 'rgb-to-hsl';



interface LightSource {
  x: number
  y: number
}

interface ShadowOffsetConfig {
  size: string
  oomph: number
  crispy: number
  layerIndex: number
  lightSource: LightSource
  numOfLayers: number
}
function calculateShadowOffsets({
  size,
  oomph,
  crispy,
  layerIndex,
  lightSource,
  numOfLayers,
}: ShadowOffsetConfig) {

  // We don't want to use linear interpolation here because we want
  // the shadows to cluster near the front and fall off. Otherwise,
  // the most opaque part of the shadow is in the middle of the
  // group, rather than being near the element.
  // We'll use a bezier curve and pluck points along it.
  const curve = {
    startPoint: [0, 1],
    endPoint: [1, 0],
    controlPoint1: [
      normalize(crispy, 0, 1, 0.25, 0),
      normalize(crispy, 0, 1, 0.25, 0),
    ],
    controlPoint2: [
      normalize(crispy, 0, 1, 0.25, 0),
      normalize(crispy, 0, 1, 0.25, 0),
    ],
  };
  const t = layerIndex / (numOfLayers - 1);
  const [ratio] = getValuesForBezierCurve(curve, t);

  const maxOffsetBySize = {
    small: normalize(oomph, 0, 1, 3, 5),
    medium: normalize(oomph, 0, 1, 15, 25),
    large: normalize(oomph, 0, 1, 30, 50),
    xlarge: normalize(oomph, 0, 1, 50, 150),
  };
  const max = maxOffsetBySize[size];

  // Now, for x/y offset... we have this lightSource value, with
  // X and Y from -1 to 1.
  const xOffsetMin = normalize(lightSource.x, -1, 1, 1, -1);
  const xOffsetMax = normalize(lightSource.x, -1, 1, max, max * -1);
  const yOffsetMin = normalize(lightSource.y, -1, 1, 1, -1);
  const yOffsetMax = normalize(lightSource.y, -1, 1, max, max * -1);

  const offsetX = roundTo(
    normalize(ratio, 0, 1, xOffsetMin, xOffsetMax),
    1
  );
  const offsetY = roundTo(
    normalize(ratio, 0, 1, yOffsetMin, yOffsetMax),
    1
  );

  return {
    x: offsetX,
    y: offsetY,
  };
}

interface ShadowOffset {
  x: number,
  y: number,
}

function calculateBlurRadius({ shadowOffset, crispy }: { shadowOffset: ShadowOffset, crispy: number }) {
  // The blur radius should depend on the x/y offset.
  // Calculate the hypothenuse length and use it as the blur radius?
  const hypothenuse = (shadowOffset.x ** 2 + shadowOffset.y ** 2) ** 0.5;

  const radius = normalize(
    crispy,
    0,
    1,
    hypothenuse * 1.5,
    hypothenuse * 0.75
  );

  return roundTo(radius, 1);
}

interface ShadowOpacityConfig {
  oomph: number
  crispy: number
  surfaceColor: string
  layerIndex: number
  numOfLayers: number
  minLayers: number
  maxLayers: number
}
function calculateShadowOpacity({
  oomph,
  crispy,
  surfaceColor,
  layerIndex,
  numOfLayers,
  minLayers,
  maxLayers,
}: ShadowOpacityConfig) {
  const baseOpacity = normalize(oomph, 0, 1, 0.4, 1.25);

  const initialOpacityMultiplier = normalize(crispy, 0, 1, 0, 1);
  const finalOpacityMultiplier = normalize(crispy, 0, 1, 1, 0);

  // Crispy determines which shadows are more visible, and
  // which shadows are less visible.
  const layerOpacityMultiplier = normalize(
    layerIndex,
    0,
    numOfLayers,
    initialOpacityMultiplier,
    finalOpacityMultiplier
  );

  let opacity = baseOpacity * layerOpacityMultiplier;

  // So, here's the problem.
  // The `resolution` param lets us change how many layers are
  // generated. Every additional layer should reduce the opacity
  // of all layers, so that "resolution" doesn't change the
  // perceived opacity.
  const averageLayers = (minLayers + maxLayers) / 2;
  const ratio = averageLayers / numOfLayers;

  let layerOpacity = opacity * ratio;

  // This is the opacity if we're using color-tinted shadows.
  // If NOT, though, we want the shadows to be WAY less opaque!
  if (!surfaceColor) {
    layerOpacity *= 0.3;
  }

  return clamp(roundTo(layerOpacity, 2), 0, 1);
}

function calculateSpread({ crispy, layerIndex, numOfLayers }: { crispy: number, layerIndex: number, numOfLayers: number }) {
  // return 0;

  if (layerIndex === 0) {
    return 0;
  }

  const maxReduction = normalize(crispy, 0, 1, 0, -5);
  const actualReduction = normalize(
    layerIndex + 1,
    1,
    numOfLayers,
    0,
    maxReduction
  );

  return roundTo(actualReduction, 1);
}


const SHADOW_LAYER_LIMITS = {
  small: {
    min: 2,
    max: 3,
  },
  medium: {
    min: 2,
    max: 5,
  },
  large: {
    min: 3,
    max: 7,
  },
} as const;


interface ShadowLayer {
  shadowOffset: ShadowOffset
  blurRadius: number
  spread: number
  shadowColor: string
  opacity: number
  string: string
}

interface ShadowConfig {
  lightSource: LightSource
  resolution: number
  oomph: number
  crispy: number
  surfaceColor: string
  size: keyof typeof SHADOW_LAYER_LIMITS
}
/**
 * We'll generate a set of 3 shadows: small, medium, large.
 * Each shadow will have multiple layers, depending on the size.
 * A small shadow might only have 2 shadows, a large might have 6.
 * Though, this is affected by the `layers` property
 */
export function generateShadows({ lightSource, resolution, oomph, crispy, surfaceColor, size }: ShadowConfig) {


  // for (const size of Object.keys(SHADOW_LAYER_LIMITS) as (keyof typeof SHADOW_LAYER_LIMITS)[]) {
  const minLayers = SHADOW_LAYER_LIMITS[size].min;
  const maxLayers = SHADOW_LAYER_LIMITS[size].max;
  const numOfLayers = Math.round(normalize(resolution, 0, 1, minLayers, maxLayers));

  let layersForSize: ShadowLayer[] = [];

  range(numOfLayers).map((layerIndex) => {
    const opacity = calculateShadowOpacity({
      oomph,
      crispy,
      surfaceColor,
      layerIndex,
      numOfLayers,
      minLayers,
      maxLayers,
    });

    const shadowOffset = calculateShadowOffsets({
      size,
      oomph,
      crispy,
      lightSource,
      layerIndex,
      numOfLayers,
    });

    const blurRadius = calculateBlurRadius({ shadowOffset, crispy });
    const spread = calculateSpread({ crispy, layerIndex, numOfLayers });
    const surfaceColorHSL = getShadowBackgroundHslValues(surfaceColor, oomph);
    const shadowColor = `hsl(${surfaceColorHSL.hue}deg ${surfaceColorHSL.saturation}% ${surfaceColorHSL.lightness}% / ${opacity / 3})`;

    const shadowString = [
      `${shadowOffset.x}px`,
      `${shadowOffset.y}px`,
      `${blurRadius}px`,
      spread !== 0 && `${spread}px`,
      shadowColor,
    ].filter(Boolean).join(' ');

    layersForSize.push({
      shadowOffset,
      shadowColor,
      blurRadius,
      spread,
      opacity,
      string: shadowString,
    });
  });

  function renderShadowLayers(layers) {
    return layers.join(',\n    ');
  }

  return renderShadowLayers(layersForSize.reverse().map(layer => layer.string));
}

export function getShadowBackgroundHslValues(
  surfaceColor: string,
  oomph: number,
) {

  const surfaceColorHSL = toHSL(surfaceColor);

  const maxLightness = normalize(oomph, 0, 1, 85, 50);

  const saturationEnhancement = normalize(surfaceColorHSL.lightness, 50, 100, 1, 0.25);

  surfaceColorHSL.saturation = Math.round(clamp(surfaceColorHSL.saturation * saturationEnhancement, 0, 100));
  // lit = Math.round(clamp(lit - 35, 0, 100));
  surfaceColorHSL.lightness = Math.round(
    clamp(normalize(surfaceColorHSL.lightness, 0, 100, 0, maxLightness) - 5, 0, 100)
  );

  return surfaceColorHSL;
}

export const roundTo = (value: number, places = 0) =>
  Math.round(value * 10 ** places) / 10 ** places;

export const range = (
  start: number,
  end?: number,
  step: number = 1
) => {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export const normalize = (
  number: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin = 0,
  newScaleMax = 1
) => {
  // FIrst, normalize the value between 0 and 1.
  const standardNormalization =
    (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

  // Next, transpose that value to our desired scale.
  return (
    (newScaleMax - newScaleMin) * standardNormalization + newScaleMin
  );
};


export const clamp = (value: number, min = 0, max = 1) => {
  // We might be passing in "inverted" values, eg:
  //    clamp(someVal, 10, 5);
  //
  // This is especially common with `clampedNormalize`.
  // In these cases, we'll flip the min/max so that the function works as expected.
  const actualMin = Math.min(min, max);
  const actualMax = Math.max(min, max);

  return Math.max(actualMin, Math.min(actualMax, value));
};

type Point = [number, number];

/**
 * Given 3-4 points for a cubic bezier curve, figure out the X/Y values for
 * `t`, a number from 0-1 representing progress.
 */
export const getValuesForBezierCurve = (
  {
    startPoint,
    endPoint,
    controlPoint1,
    controlPoint2,
  }: {
    startPoint: Point;
    endPoint: Point;
    controlPoint1: Point;
    controlPoint2: Point;
  },
  t: number
): Point => {
  let x, y;
  if (controlPoint2) {
    // Cubic Bezier curve
    x =
      (1 - t) ** 3 * startPoint[0] +
      3 * (1 - t) ** 2 * t * controlPoint1[0] +
      3 * (1 - t) * t ** 2 * controlPoint2[0] +
      t ** 3 * endPoint[0];

    y =
      (1 - t) ** 3 * startPoint[1] +
      3 * (1 - t) ** 2 * t * controlPoint1[1] +
      3 * (1 - t) * t ** 2 * controlPoint2[1] +
      t ** 3 * endPoint[1];
  } else {
    // Quadratic Bezier curve
    x =
      (1 - t) * (1 - t) * startPoint[0] +
      2 * (1 - t) * t * controlPoint1[0] +
      t * t * endPoint[0];
    y =
      (1 - t) * (1 - t) * startPoint[1] +
      2 * (1 - t) * t * controlPoint1[1] +
      t * t * endPoint[1];
  }

  return [x, y];
};

export function formatHslValues(hue: number, sat: number, lit: number) {
  return `${hue}deg ${sat}% ${lit}%`;
}

export function formatHslString(hue: number, sat: number, lit: number) {
  return `hsl(${formatHslValues(hue, sat, lit)})`;
}



// Declare modules since type definitions don't exist
declare module 'hex-to-hsl';
declare module 'rgb-to-hsl';

interface HSLColor {
  hue: number
  saturation: number
  lightness: number
  opacity: number
}
function toHSL(color: string): HSLColor {
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
    const [h, s, l] = hexToHSL(color);
    return {
      hue: h,
      saturation: s,
      lightness: l,
      opacity: 1
    };
  }

  // Convert RGB/RGBA to HSL
  if (color.startsWith('rgb')) {
    const matches = color.match(/\d+\.?\d*/g)!.map(Number);
    const [r, g, b] = matches;
    const opacity = matches[3];
    const [h, s, l] = rgbToHSL(r, g, b);

    return {
      hue: h,
      saturation: parseInt(s.replace('%', '')),  
      lightness: parseInt(l.replace('%', '')  ),
      opacity: opacity !== undefined ? opacity : 1
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

