import { Cursor } from "./lib/properties";
import { attribute } from "./lib/anyConfig";
import { getTypedTheme, SurfaceTheme } from "./surface";

export const createTextBase = <T extends SurfaceTheme>(rawTheme: T) => {
  const theme = getTypedTheme(rawTheme);
  const attrs = {
    any: attribute
  };

  return {
    variants: {
      fontFamily: attrs.any({ attribute: 'fontFamily', fonts: true, tokens: theme.fonts }),
      fontSize: attrs.any({ attribute: 'fontSize', number: true, tokens: theme.size }),
      lineHeight: attrs.any({ attribute: 'lineHeight', number: true, tokens: theme.size }),
      color: attrs.any({ attribute: 'color', color: true, tokens: theme.colors }),
      textAlignVertical: attrs.any({ attribute: 'textAlignVertical', string: true, tokens: ['auto', 'top', 'bottom', 'center'] }),
      textAlign: attrs.any({ attribute: 'textAlign', string: true, tokens: ['auto','left', 'center', 'right', 'justify'] }),
      textDecorationStyle: attrs.any({ attribute: 'textDecorationStyle', string: true, tokens: ['none', 'double', 'dashed', 'dotted', 'solid'] }),
      textDecorationLine: attrs.any({ attribute: 'textDecorationLine', string: true, tokens: ['none', 'line-through', 'underline', 'underline line-through'] }),
      textDecorationColor: attrs.any({ attribute: 'textDecorationColor', color: true, tokens: theme.colors }),
      opacity: attrs.any({ attribute: 'opacity', number: true, }),
      cursor: Cursor,
    }
  }
};
