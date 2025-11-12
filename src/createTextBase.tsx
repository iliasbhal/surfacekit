import { Cursor } from "./lib/properties";
import { Text } from "react-native";
import { Surfaced } from './createViewBase';

export const createTextBase = <C extends Surfaced>(surfaced: C) => surfaced(Text).with(({ theme, attrs }) => ({
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
}));
