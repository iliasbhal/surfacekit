import { View } from "react-native";
import { createSurfaced } from "./surface";
import { ContentSizing, Cursor, Position } from "./lib/properties";

export type Surfaced = ReturnType<typeof createSurfaced<any>>;

const transform = (style: any, config: any) => {
  const key = config.variant;
  const value = config.active;
  if (!style.transform) style.transform = [];

  const transformName = config.config.attribute || key;
  style.transform.push({ 
    [transformName]: value,
  });
};

export const createViewBase = <C extends Surfaced>(surfaced: C) => surfaced(View).with((tokens) => ({
  variants: {
    position: Position,
    zIndex: surfaced.any({ attribute: 'zIndex', number: true, }),
    z: surfaced.any({ attribute: 'zIndex', number: true, }),
    absoluteFill: { true: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } },
    absolute: { true: Position.absolute },
    fixed: { true: Position.fixed },
    sticky: { true: Position.sticky },
    relative: { true: Position.relative },
    static: { true: Position.static },
    top: surfaced.any({ attribute: 'top', number: true, tokens: tokens.size }),
    bottom: surfaced.any({ attribute: 'bottom', number: true, tokens: tokens.size }),
    left: surfaced.any({ attribute: 'left', number: true, tokens: tokens.size }),
    right: surfaced.any({ attribute: 'right', number: true, tokens: tokens.size }),
    start: surfaced.any({ attribute: 'start', number: true, tokens: tokens.size }),
    end: surfaced.any({ attribute: 'end', number: true, tokens: tokens.size }),

    // Padding
    padding: surfaced.any({ attribute: 'padding', number: true, tokens: tokens.size }),
    paddingHorizontal: surfaced.any({ attribute: 'paddingHorizontal', number: true, tokens: tokens.size }),
    paddingVertical: surfaced.any({ attribute: 'paddingVertical', number: true, tokens: tokens.size }),
    paddingTop: surfaced.any({ attribute: 'paddingTop', number: true, tokens: tokens.size }),
    paddingBottom: surfaced.any({ attribute: 'paddingBottom', number: true, tokens: tokens.size }),
    paddingLeft: surfaced.any({ attribute: 'paddingLeft', number: true, tokens: tokens.size }),
    paddingRight: surfaced.any({ attribute: 'paddingRight', number: true, tokens: tokens.size }),
    p: surfaced.any({ attribute: 'padding', number: true, tokens: tokens.size }),
    px: surfaced.any({ attribute: 'paddingHorizontal', number: true, tokens: tokens.size }),
    py: surfaced.any({ attribute: 'paddingVertical', number: true, tokens: tokens.size }),
    pt: surfaced.any({ attribute: 'paddingTop', number: true, tokens: tokens.size }),
    pb: surfaced.any({ attribute: 'paddingBottom', number: true, tokens: tokens.size }),
    pl: surfaced.any({ attribute: 'paddingLeft', number: true, tokens: tokens.size }),
    pr: surfaced.any({ attribute: 'paddingRight', number: true, tokens: tokens.size }),
    paddingBlock: surfaced.any({ attribute: 'paddingBlockStart', number: true, tokens: tokens.size }),
    paddingBlockStart: surfaced.any({ attribute: 'paddingBlockStart', number: true, tokens: tokens.size }),
    paddingBlockEnd: surfaced.any({ attribute: 'paddingBlockEnd', number: true, tokens: tokens.size }),
    paddingInline: surfaced.any({ attribute: 'paddingInline', number: true, tokens: tokens.size }),
    paddingInlineStart: surfaced.any({ attribute: 'paddingInlineStart', number: true, tokens: tokens.size }),
    paddingInlineEnd: surfaced.any({ attribute: 'paddingInlineEnd', number: true, tokens: tokens.size }),
    paddingStart: surfaced.any({ attribute: 'paddingStart', number: true, tokens: tokens.size }),
    paddingEnd: surfaced.any({ attribute: 'paddingEnd', number: true, tokens: tokens.size }),
    inset: surfaced.any({ attribute: 'inset', number: true, tokens: tokens.size }),
    insetBlock: surfaced.any({ attribute: 'insetBlockStart', number: true, tokens: tokens.size }),
    insetBlockStart: surfaced.any({ attribute: 'insetBlockStart', number: true, tokens: tokens.size }),
    insetBlockEnd: surfaced.any({ attribute: 'insetBlockEnd', number: true, tokens: tokens.size }),
    insetInline: surfaced.any({ attribute: 'insetInline', number: true, tokens: tokens.size }),
    insetInlineStart: surfaced.any({ attribute: 'insetInlineStart', number: true, tokens: tokens.size }),
    insetInlineEnd: surfaced.any({ attribute: 'insetInlineEnd', number: true, tokens: tokens.size }),

    // Margin
    margin: surfaced.any({ attribute: 'margin', number: true, tokens: tokens.size }),
    marginBottom: surfaced.any({ attribute: 'marginBottom', number: true, tokens: tokens.size }),
    marginLeft: surfaced.any({ attribute: 'marginLeft', number: true, tokens: tokens.size }),
    marginRight: surfaced.any({ attribute: 'marginRight', number: true, tokens: tokens.size }),
    marginTop: surfaced.any({ attribute: 'marginTop', number: true, tokens: tokens.size }),
    marginHorizontal: surfaced.any({ attribute: 'marginHorizontal', number: true, tokens: tokens.size }),
    marginVertical: surfaced.any({ attribute: 'marginVertical', number: true, tokens: tokens.size }),
    m: surfaced.any({ attribute: 'margin', number: true, tokens: tokens.size }),
    mx: surfaced.any({ attribute: 'marginHorizontal', number: true, tokens: tokens.size }),
    my: surfaced.any({ attribute: 'marginVertical', number: true, tokens: tokens.size }),
    mt: surfaced.any({ attribute: 'marginTop', number: true, tokens: tokens.size }),
    mb: surfaced.any({ attribute: 'marginBottom', number: true, tokens: tokens.size }),
    ml: surfaced.any({ attribute: 'marginLeft', number: true, tokens: tokens.size }),
    mr: surfaced.any({ attribute: 'marginRight', number: true, tokens: tokens.size }),
    marginBlock: surfaced.any({ attribute: 'marginBlock', number: true, tokens: tokens.size }),
    marginBlockStart: surfaced.any({ attribute: 'marginBlockStart', number: true, tokens: tokens.size }),
    marginBlockEnd: surfaced.any({ attribute: 'marginBlockEnd', number: true, tokens: tokens.size }),
    marginInline: surfaced.any({ attribute: 'marginInline', number: true, tokens: tokens.size }),
    marginInlineStart: surfaced.any({ attribute: 'marginInlineStart', number: true, tokens: tokens.size }),
    marginInlineEnd: surfaced.any({ attribute: 'marginInlineEnd', number: true, tokens: tokens.size }),
    marginStart: surfaced.any({ attribute: 'marginStart', number: true, tokens: tokens.size }),
    marginEnd: surfaced.any({ attribute: 'marginEnd', number: true, tokens: tokens.size }),

    // Layout
    sizeX: surfaced.any({ attributes: ['width', 'maxWidth', 'minWidth'], number: true, percentage: true, tokens: tokens.size }),
    sizeY: surfaced.any({ attributes: ['height', 'maxHeight', 'minHeight'], number: true, percentage: true, tokens: tokens.size }),
    sizeXY: surfaced.any({ attributes: ['width', 'maxWidth', 'minWidth', 'height', 'maxHeight', 'minHeight'], number: true, percentage: true, tokens: tokens.size }),
    width: surfaced.any({ attribute: 'width', number: true, percentage: true, tokens: tokens.size }),
    height: surfaced.any({ attribute: 'height', number: true, percentage: true, tokens: tokens.size }),
    minWidth: surfaced.any({ attribute: 'minWidth', number: true, percentage: true, tokens: tokens.size }),
    minHeight: surfaced.any({ attribute: 'minHeight', number: true, percentage: true, tokens: tokens.size }),
    maxWidth: surfaced.any({ attribute: 'maxWidth', number: true, percentage: true, tokens: tokens.size }),
    maxHeight: surfaced.any({ attribute: 'maxHeight', number: true, percentage: true, tokens: tokens.size }),

    // Transforms
    rotate: surfaced.any({ custom: transform,  attribute: 'rotate', number: true, angle: true }),
    rotateX: surfaced.any({ custom: transform,  attribute: 'rotateX', number: true, angle: true }),
    rotateY: surfaced.any({ custom: transform,  attribute: 'rotateY', number: true, angle: true }),
    rotateZ: surfaced.any({ custom: transform,  attribute: 'rotateZ', number: true, angle: true }),
    x: surfaced.any({ custom: transform,  attribute: 'translateX', number: true, tokens: tokens.size }),
    y: surfaced.any({ custom: transform,  attribute: 'translateY', number: true, tokens: tokens.size }),
    translateX: surfaced.any({ custom: transform,  attribute: 'translateX', number: true, tokens: tokens.size }),
    translateY: surfaced.any({ custom: transform,  attribute: 'translateY', number: true, tokens: tokens.size }),
    scale: surfaced.any({ custom: transform,  attribute: 'scale', number: true, }),
    scaleX: surfaced.any({ custom: transform,  attribute: 'scaleX', number: true, }),
    scaleY: surfaced.any({ custom: transform,  attribute: 'scaleY', number: true, }),
    skewX: surfaced.any({ custom: transform,  attribute: 'skewX', number: true, }),
    skewY: surfaced.any({ custom: transform,  attribute: 'skewY', number: true, }),
    perspective: surfaced.any({ attribute: 'perspective', number: true, }),
    perspectiveOrigin: surfaced.any({ attribute: 'perspectiveOrigin', string: true }),
    transformOrigin: surfaced.any({ attribute: 'transformOrigin', string: true }),

    // Flex
    flex: surfaced.any({ attribute: 'flex', number: true, }),
    flexDirection: {
      'row': { flexDirection: 'row' },
      'column': { flexDirection: 'column' },
      'row-reverse': { flexDirection: 'row-reverse' },
      'column-reverse': { flexDirection: 'column-reverse' },
    },
    alignItems: {
      'flex-start': { alignItems: 'flex-start' },
      'flex-end': { alignItems: 'flex-end' },
      'center': { alignItems: 'center' },
      'stretch': { alignItems: 'stretch' },
      'baseline': { alignItems: 'baseline' },
    },

    itemsStart: { true: ({ alignItems: 'flex-start' }) },
    itemsEnd: { true: ({ alignItems: 'flex-end' }) },
    itemsCenter: { true: ({ alignItems: 'center' }) },
    itemsStretch: { true: ({ alignItems: 'stretch' }) },
    itemsBaseline: { true: ({ alignItems: 'baseline' }) },

    justifyContent: {
      'flex-start': { justifyContent: 'flex-start' },
      'flex-end': { justifyContent: 'flex-end' },
      'center': { justifyContent: 'center' },
      'space-between': { justifyContent: 'space-between' },
      'space-around': { justifyContent: 'space-around' },
      'space-evenly': { justifyContent: 'space-evenly' },
    },

    justifyStart: { true: { justifyContent: 'flex-start' } },
    justifyEnd: { true: { justifyContent: 'flex-end' } },
    justifyCenter: { true: { justifyContent: 'center' } },
    justifyBetween: { true: { justifyContent: 'space-between' } },
    justifyAround: { true: { justifyContent: 'space-around' } },
    justifyEvenly: { true: { justifyContent: 'space-evenly' } },

    alignContent: {
      'flex-start': { alignContent: 'flex-start' },
      'flex-end': { alignContent: 'flex-end' },
      'center': { alignContent: 'center' },
      'stretch': { alignContent: 'stretch' },
      'space-between': { alignContent: 'space-between' },
      'space-around': { alignContent: 'space-around' },
      'space-evenly': { alignContent: 'space-evenly' },
    },

    contentStart: { true: { alignContent: 'flex-start' } },
    contentEnd: { true: { alignContent: 'flex-end' } },
    contentCenter: { true: { alignContent: 'center' } },
    contentStretch: { true: { alignContent: 'stretch' } },
    contentBetween: { true: { alignContent: 'space-between' } },
    contentAround: { true: { alignContent: 'space-around' } },
    contentEvenly: { true: { alignContent: 'space-evenly' } },

    alignSelf: {
      'auto': { alignSelf: 'auto' },
      'flex-start': { alignSelf: 'flex-start' },
      'flex-end': { alignSelf: 'flex-end' },
      'center': { alignSelf: 'center' },
      'stretch': { alignSelf: 'stretch' },
      'baseline': { alignSelf: 'baseline' },
    },

    selfAuto: { true: { alignSelf: 'auto' } },
    selfStart: { true: { alignSelf: 'flex-start' } },
    selfEnd: { true: { alignSelf: 'flex-end' } },
    selfCenter: { true: { alignSelf: 'center' } },
    selfStretch: { true: { alignSelf: 'stretch' } },
    selfBaseline: { true: { alignSelf: 'baseline' } },

    flexWrap: {
      true: { flexWrap: 'wrap' },
      'wrap': { flexWrap: 'wrap' },
      'nowrap': { flexWrap: 'nowrap' },
      'wrap-reverse': { flexWrap: 'wrap-reverse' },
    },

    wrap: { true: { flexWrap: 'wrap' } },
    nowrap: { true: { flexWrap: 'nowrap' } },
    wrapReverse: { true: { flexWrap: 'wrap-reverse' } },

    flexGrow: surfaced.any({ attribute: 'flexGrow', number: true, }),
    flexShrink: surfaced.any({ attribute: 'flexShrink', number: true, }),
    flexBasis: surfaced.any({ attribute: 'flexBasis', number: true, }),

    gap: surfaced.any({ attribute: 'gap', number: true, percentage: true, tokens: tokens.size }),

    // Grid Item
    row: surfaced.any({ attribute: 'row', number: true, string: true }),
    column: surfaced.any({ attribute: 'column', number: true, string: true }),
    rowSpan: surfaced.any({ attribute: 'rowSpan', number: true, string: true }),
    columnSpan: surfaced.any({ attribute: 'columnSpan', number: true, string: true }),
    rowStart: surfaced.any({ attribute: 'rowStart', number: true, string: true }),
    columnStart: surfaced.any({ attribute: 'columnStart', number: true, string: true }),
    rowEnd: surfaced.any({ attribute: 'rowEnd', number: true, string: true }),
    columnEnd: surfaced.any({ attribute: 'columnEnd', number: true, string: true }),
    area: surfaced.any({ attribute: 'area', string: true }),
    order: surfaced.any({ attribute: 'order', number: true, string: true  }),

    // Background
    backgroundAttachment: surfaced.any({ attribute: 'backgroundAttachment', string: true }),
    backgroundBlendMode: surfaced.any({ attribute: 'backgroundBlendMode', string: true }),
    backgroundClip: surfaced.any({ attribute: 'backgroundClip', string: true }),
    backgroundColor: surfaced.any({ attribute: 'backgroundColor', color: true, tokens: tokens.colors }),
    bg: surfaced.any({ attribute: 'backgroundColor', color: true, tokens: tokens.colors }),
    backgroundOrigin: surfaced.any({ attribute: 'backgroundOrigin', string: true }),
    backgroundPosition: surfaced.any({ attribute: 'backgroundPosition', string: true }),
    backgroundSize: surfaced.any({ attribute: 'backgroundSize', string: true }),
    backgroundImage: surfaced.any({ attribute: 'backgroundImage', string: true }),
    backgroundRepeat: {
      'repeat': { backgroundRepeat: 'repeat' },
      'repeat-x': { backgroundRepeat: 'repeat-x' },
      'repeat-y': { backgroundRepeat: 'repeat-y' },
      'no-repeat': { backgroundRepeat: 'no-repeat' },
      'space': { backgroundRepeat: 'space' },
    },


    // Border
    borderRadius: surfaced.any({ attribute: 'borderRadius', number: true, tokens: tokens.size }),
    borderTopLeftRadius: surfaced.any({ attribute: 'borderTopLeftRadius', number: true, tokens: tokens.size }),
    borderTopRightRadius: surfaced.any({ attribute: 'borderTopRightRadius', number: true, tokens: tokens.size }),
    borderBottomLeftRadius: surfaced.any({ attribute: 'borderBottomLeftRadius', number: true, tokens: tokens.size }),
    borderBottomRightRadius: surfaced.any({ attribute: 'borderBottomRightRadius', number: true, tokens: tokens.size }),
    borderStartStartRadius: surfaced.any({ attribute: 'borderStartStartRadius', number: true, tokens: tokens.size }),
    borderStartEndRadius: surfaced.any({ attribute: 'borderStartEndRadius', number: true, tokens: tokens.size }),
    borderEndStartRadius: surfaced.any({ attribute: 'borderEndStartRadius', number: true, tokens: tokens.size }),
    borderEndEndRadius: surfaced.any({ attribute: 'borderEndEndRadius', number: true, tokens: tokens.size }),
    borderTopStartRadius: surfaced.any({ attribute: 'borderTopStartRadius', number: true, tokens: tokens.size }),
    borderTopEndRadius: surfaced.any({ attribute: 'borderTopEndRadius', number: true, tokens: tokens.size }),
    borderBottomStartRadius: surfaced.any({ attribute: 'borderBottomStartRadius', number: true, tokens: tokens.size }),
    borderBottomEndRadius: surfaced.any({ attribute: 'borderBottomEndRadius', number: true, tokens: tokens.size }),
    borderColor: surfaced.any({ attribute: 'borderColor', color: true, tokens: tokens.colors }),
    borderTopColor: surfaced.any({ attribute: 'borderTopColor', color: true, tokens: tokens.colors }),
    borderRightColor: surfaced.any({ attribute: 'borderRightColor', color: true, tokens: tokens.colors }),
    borderBottomColor: surfaced.any({ attribute: 'borderBottomColor', color: true, tokens: tokens.colors }),
    borderLeftColor: surfaced.any({ attribute: 'borderLeftColor', color: true, tokens: tokens.colors }),
    borderStartColor: surfaced.any({ attribute: 'borderStartColor', color: true, tokens: tokens.colors }),
    borderEndColor: surfaced.any({ attribute: 'borderEndColor', color: true, tokens: tokens.colors }),
    borderBlockColor: surfaced.any({ attribute: 'borderBlockColor', color: true, tokens: tokens.colors }),
    borderBlockStartColor: surfaced.any({ attribute: 'borderBlockStartColor', color: true, tokens: tokens.colors }),
    borderBlockEndColor: surfaced.any({ attribute: 'borderBlockEndColor', color: true, tokens: tokens.colors }),
    borderWidth: surfaced.any({ attribute: 'borderWidth', number: true, tokens: tokens.size }),
    borderTopWidth: surfaced.any({ attribute: 'borderTopWidth', number: true, tokens: tokens.size }),
    borderRightWidth: surfaced.any({ attribute: 'borderRightWidth', number: true, tokens: tokens.size }),
    borderBottomWidth: surfaced.any({ attribute: 'borderBottomWidth', number: true, tokens: tokens.size }),
    borderLeftWidth: surfaced.any({ attribute: 'borderLeftWidth', number: true, tokens: tokens.size }),
    borderStartWidth: surfaced.any({ attribute: 'borderStartWidth', number: true, tokens: tokens.size }),
    borderEndWidth: surfaced.any({ attribute: 'borderEndWidth', number: true, tokens: tokens.size }),
    borderBlockWidth: surfaced.any({ attribute: 'borderBlockWidth', number: true, tokens: tokens.size }),
    borderBlockStartWidth: surfaced.any({ attribute: 'borderBlockStartWidth', number: true, tokens: tokens.size }),
    borderBlockEndWidth: surfaced.any({ attribute: 'borderBlockEndWidth', number: true, tokens: tokens.size }),

    borderCurve: {
      circular: { borderCurve: 'circular' },
      continuous: { borderCurve: 'continuous' },
    },

    borderStyle: {
      solid: { borderStyle: 'solid' },
      dashed: { borderStyle: 'dashed' },
      dotted: { borderStyle: 'dotted' },
    },

    outline: surfaced.any({ attribute: 'outline', string: true }),
    outlineColor: surfaced.any({ attribute: 'outlineColor', color: true, tokens: tokens.colors }),
    outlineWidth: surfaced.any({ attribute: 'outlineWidth', number: true, tokens: tokens.size }),
    outlineOffset: surfaced.any({ attribute: 'outlineOffset', number: true, tokens: tokens.size }),
    outlineStyle: {
      'solid': { outlineStyle: 'solid' },
      'dashed': { outlineStyle: 'dashed' },
      'dotted': { outlineStyle: 'dotted' },
    },

    // Misc
    aspectRatio: surfaced.any({ attribute: 'aspectRatio', number: true, }),
    opacity: surfaced.any({ attribute: 'opacity', number: true, }),

    boxSizing: ContentSizing,
    borderBox: { true: ContentSizing.borderBox },
    contentBox: { true: ContentSizing.contentBox },
    cursor: Cursor,

    overflow: {
      'visible': { overflow: 'visible' },
      'hidden': { overflow: 'hidden' },
      'scroll': { overflow: 'scroll' },
    },

    overflowVisible: { true: { overflow: 'visible' } },
    overflowHidden: { true: { overflow: 'hidden' } },
    overflowScroll: { true: { overflow: 'scroll' } },

    overflowX: {
      'visible': { overflowX: 'visible' },
      'hidden': { overflowX: 'hidden' },
      'scroll': { overflowX: 'scroll' },
    },

    overflowXVisible: { true: { overflowX: 'visible' } },
    overflowXHidden: { true: { overflowX: 'hidden' } },
    overflowXScroll: { true: { overflowX: 'scroll' } },

    overflowY: {
      'visible': { overflowY: 'visible' },
      'hidden': { overflowY: 'hidden' },
      'scroll': { overflowY: 'scroll' },
    },

    overflowYVisible: { true: { overflowY: 'visible' } },
    overflowYHidden: { true: { overflowY: 'hidden' } },
    overflowYScroll: { true: { overflowY: 'scroll' } },

    display: {
      'none': { display: 'none' },
      'flex': { display: 'flex' },
    },


    visibility: {
      'visible': { visibility: 'visible' },
      'hidden': { visibility: 'hidden' },
      'collapse': { visibility: 'collapse' },
    },

    visibilityVisible: { true: { visibility: 'visible' } },
    visibilityHidden: { true: { visibility: 'hidden' } },
    visibilityCollapse: { true: { visibility: 'collapse' } },

    backdropFilter: surfaced.any({ attribute: 'backdropFilter', string: true }),

    backfaceVisibility: {
      hidden: { backfaceVisibility: 'hidden' },
      visible: { backfaceVisibility: 'visible' },
    },

    elevation: surfaced.any({ attribute: 'elevation', number: true }),
    boxShadow: surfaced.any({ attribute: 'boxShadow', string: true }),

    overscrollBehavior: {
      'auto': { overscrollBehavior: 'auto' },
      'contain': { overscrollBehavior: 'contain' },
      'none': { overscrollBehavior: 'none' },
    },

    userSelect: {
      'none': { userSelect: 'none' },
      'text': { userSelect: 'text' },
      'all': { userSelect: 'all' },
      'auto': { userSelect: 'auto' },
    },

    willChange: surfaced.any({ attribute: 'willChange', string: true }),
    pointerEvents: {
      'auto': { pointerEvents: 'auto' },
      'none': { pointerEvents: 'none' },
      'box-none': { pointerEvents: 'box-none' },
      'box-only': { pointerEvents: 'box-only' },
    },

    direction: {
      'ltr': { direction: 'ltr' },
      'rtl': { direction: 'rtl' },
      'inherit': { direction: 'inherit' },
    },

    mixBlendMode: {
      'normal': { mixBlendMode: 'normal' },
      'multiply': { mixBlendMode: 'multiply' },
      'screen': { mixBlendMode: 'screen' },
      'overlay': { mixBlendMode: 'overlay' },
      'darken': { mixBlendMode: 'darken' },
      'lighten': { mixBlendMode: 'lighten' },
      'color-dodge': { mixBlendMode: 'color' },
      'color-burn': { mixBlendMode: 'color' },
      'hard-light': { mixBlendMode: 'hard-light' },
      'soft-light': { mixBlendMode: 'soft-light' },
      'difference': { mixBlendMode: 'difference' },
      'exclusion': { mixBlendMode: 'exclusion' },
      'hue': { mixBlendMode: 'hue' },
      'saturation': { mixBlendMode: 'saturation' },
      'color': { mixBlendMode: 'color' },
      'luminosity': { mixBlendMode: 'luminosity' },
    },

    clip: surfaced.any({ attribute: 'clip', string: true }),
    filter: surfaced.any({ attribute: 'filter', string: true }),
    isolation: {
      'auto': { isolation: 'auto' },
      'isolate': { isolation: 'isolate' },
    },
    overscrollBehaviorX: {
      'auto': { overscrollBehaviorX: 'auto' },
      'contain': { overscrollBehaviorX: 'contain' },
      'none': { overscrollBehaviorX: 'none' },
    },
    overscrollBehaviorY: {
      'auto': { overscrollBehaviorY: 'auto' },
      'contain': { overscrollBehaviorY: 'contain' },
      'none': { overscrollBehaviorY: 'none' },
    },
    rotation: surfaced.any({ attribute: 'rotation', string: true }),

    // Animations & Transition
    transitionProperty: surfaced.any({ attribute: 'transitionProperty', multiple: true, string: true }),
    transitionDuration: surfaced.any({ attribute: 'transitionDuration', multiple: true, number: true }),
    transitionTimingFunction: surfaced.any({ attribute: 'transitionTimingFunction', multiple: true, string: true }),
    transitionDelay: surfaced.any({ attribute: 'transitionDelay', multiple: true, number: true }),
    transitionBehavior: {
      allowDiscrete: { transitionBehavior: 'allow-discrete' } as any,
      normal: { transitionBehavior: 'normal' } as any,
    },

    animationName: surfaced.any({ attribute: 'animationName', any: true }),
    animationDuration: surfaced.any({ attribute: 'animationDuration', multiple: true, number: true, time: true }),
    animationDelay: surfaced.any({ attribute: 'animationDelay', multiple: true, number: true, time: true }),
    animationTimingFunction: surfaced.any({
      attribute: 'animationTimingFunction', multiple: true, tokens: {
        'linear': 'linear',
        'ease': 'ease',
        'easeIn': 'ease-in',
        'easeOut': 'ease-out',
        'easeInOut': 'ease-in-out',
        'stepStart': 'step-start',
        'stepEnd': 'step-end',
      }
    }),
    animationDirection: surfaced.any({
      attribute: 'animationDirection', multiple: true, tokens: {
        normal: 'normal',
        reverse: 'reverse',
        alternate: 'alternate',
        alternateReverse: 'alternate-reverse',
      }
    }),
    animationIterationCount: surfaced.any({
      attribute: 'animationIterationCount', multiple: true, number: true, tokens: {
        'infinity': 'infinite',
      }
    }),
    animationFillMode: surfaced.any({
      attribute: 'animationFillMode', multiple: true, tokens: {
        forwards: 'forwards',
        backwards: 'backwards',
        both: 'both',
        none: 'none',
      }
    }),
    animationPlayState: surfaced.any({
      attribute: 'animationPlayState', 
      multiple: true, 
      tokens: {
        running: 'running',
        paused: 'paused',
      }
    }),
  },
}))
