export type ObjectEndingPaths<T> = T extends object ? {
  [K in keyof T & (string | number)]: K extends (string | number)
  ? T[K] extends object
  ? `${K}.${ObjectEndingPaths<T[K]>}`
  : `${K}`
  : never;
}[keyof T & (string | number)]
  : never;

export const getCompiledTokens = (tokensObject: Record<string, any>, config: { fonts: boolean }) => {
  const compiledTokens: Record<string, any> = {};

  const compileRecursive = (tokensObject: Record<string, any>, path?: string) => {
    for (const key in tokensObject) {
      const compiledKey = !path ? `${key}` : `${path}.${key}`;

      if (typeof tokensObject[key] === 'object') {
        compileRecursive(tokensObject[key], compiledKey);
      } else {
        const value = tokensObject[key];
        compiledTokens[compiledKey] = value;

        if (typeof value === 'number' && !config.fonts) {
          compiledTokens[`-${compiledKey}`] = -value;
        }
      }
    }
  }

  compileRecursive(tokensObject);
  return compiledTokens;
}

export const pathToFontFamily = (path: string) => {
  return path.replaceAll('.', '_');
}

export const withFontsFamilyKeys = (fontsObject: Record<string, any>) => {
  const fontObjectFixed: Record<string, any> = {};

  for (const key in fontsObject) {
    const fontFamily = pathToFontFamily(key);
    fontObjectFixed[fontFamily] = fontsObject[key];
  }

  return fontObjectFixed;
}