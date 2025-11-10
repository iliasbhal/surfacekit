import { Cursor } from "./lib/properties";
import { Text } from "react-native";
import { Surfaced } from './createViewBase';

export const createTextBase = <C extends Surfaced>(surfaced: C) => surfaced(Text).with((tokens) => ({
  variants: {
    fontFamily: surfaced.any({ attribute: 'fontFamily', fonts: true, tokens: tokens.fonts }),
    fontSize: surfaced.any({ attribute: 'fontSize', number: true, tokens: tokens.size }),
    lineHeight: surfaced.any({ attribute: 'lineHeight', number: true, tokens: tokens.size }),
    color: surfaced.any({ attribute: 'color', color: true, tokens: tokens.colors }),
    textAlignVertical: surfaced.any({ attribute: 'textAlignVertical', string: true, tokens: ['auto', 'top', 'bottom', 'center'] }),
    textAlign: surfaced.any({ attribute: 'textAlign', string: true, tokens: ['auto','left', 'center', 'right', 'justify'] }),
    textDecorationStyle: surfaced.any({ attribute: 'textDecorationStyle', string: true, tokens: ['none', 'double', 'dashed', 'dotted', 'solid'] }),
    textDecorationLine: surfaced.any({ attribute: 'textDecorationLine', string: true, tokens: ['none', 'line-through', 'underline', 'underline line-through'] }),
    textDecorationColor: surfaced.any({ attribute: 'textDecorationColor', color: true, tokens: tokens.colors }),
    opacity: surfaced.any({ attribute: 'opacity', number: true, }),
    cursor: Cursor,
  }
}));


{/* <Text style={{ textDecorationStyle: ''}}/> */}