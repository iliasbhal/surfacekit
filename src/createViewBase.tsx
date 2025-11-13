import { View as RNView } from "react-native";
import { createSurfaced, getTypedTheme, SurfaceTheme } from "./surface";
import { ContentSizing, Cursor, Position } from "./lib/properties";
import { attribute } from "./lib/anyConfig";

export type Surfaced = ReturnType<typeof createSurfaced<SurfaceTheme>>;

const transform = (style: any, config: any) => {
  const key = config.variant;
  const value = config.active;
  if (!style.transform) style.transform = [];

  const transformName = config.config.attribute || key;
  style.transform.push({
    [transformName]: value,
  });
};

export const createViewBase = <T extends SurfaceTheme>(rawTheme: T) => {
  const attrs = {
    any: attribute
  };

  const theme = getTypedTheme(rawTheme);

  return {
    variants: {
      position: Position,
      zIndex: attrs.any({ attribute: "zIndex", number: true }),
      z: attrs.any({ attribute: "zIndex", number: true }),
      absoluteFill: {
        true: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
      },
      absolute: { true: Position.absolute },
      fixed: { true: Position.fixed },
      sticky: { true: Position.sticky },
      relative: { true: Position.relative },
      static: { true: Position.static },
      top: attrs.any({ attribute: "top", number: true, tokens: theme.size }),
      bottom: attrs.any({
        attribute: "bottom",
        number: true,
        tokens: theme.size,
      }),
      left: attrs.any({ attribute: "left", number: true, tokens: theme.size }),
      right: attrs.any({
        attribute: "right",
        number: true,
        tokens: theme.size,
      }),
      start: attrs.any({
        attribute: "start",
        number: true,
        tokens: theme.size,
      }),
      end: attrs.any({ attribute: "end", number: true, tokens: theme.size }),

      // Padding
      padding: attrs.any({
        attribute: "padding",
        number: true,
        tokens: theme.size,
      }),
      paddingHorizontal: attrs.any({
        attribute: "paddingHorizontal",
        number: true,
        tokens: theme.size,
      }),
      paddingVertical: attrs.any({
        attribute: "paddingVertical",
        number: true,
        tokens: theme.size,
      }),
      paddingTop: attrs.any({
        attribute: "paddingTop",
        number: true,
        tokens: theme.size,
      }),
      paddingBottom: attrs.any({
        attribute: "paddingBottom",
        number: true,
        tokens: theme.size,
      }),
      paddingLeft: attrs.any({
        attribute: "paddingLeft",
        number: true,
        tokens: theme.size,
      }),
      paddingRight: attrs.any({
        attribute: "paddingRight",
        number: true,
        tokens: theme.size,
      }),
      p: attrs.any({ attribute: "padding", number: true, tokens: theme.size }),
      px: attrs.any({
        attribute: "paddingHorizontal",
        number: true,
        tokens: theme.size,
      }),
      py: attrs.any({
        attribute: "paddingVertical",
        number: true,
        tokens: theme.size,
      }),
      pt: attrs.any({
        attribute: "paddingTop",
        number: true,
        tokens: theme.size,
      }),
      pb: attrs.any({
        attribute: "paddingBottom",
        number: true,
        tokens: theme.size,
      }),
      pl: attrs.any({
        attribute: "paddingLeft",
        number: true,
        tokens: theme.size,
      }),
      pr: attrs.any({
        attribute: "paddingRight",
        number: true,
        tokens: theme.size,
      }),
      paddingBlock: attrs.any({
        attribute: "paddingBlockStart",
        number: true,
        tokens: theme.size,
      }),
      paddingBlockStart: attrs.any({
        attribute: "paddingBlockStart",
        number: true,
        tokens: theme.size,
      }),
      paddingBlockEnd: attrs.any({
        attribute: "paddingBlockEnd",
        number: true,
        tokens: theme.size,
      }),
      paddingInline: attrs.any({
        attribute: "paddingInline",
        number: true,
        tokens: theme.size,
      }),
      paddingInlineStart: attrs.any({
        attribute: "paddingInlineStart",
        number: true,
        tokens: theme.size,
      }),
      paddingInlineEnd: attrs.any({
        attribute: "paddingInlineEnd",
        number: true,
        tokens: theme.size,
      }),
      paddingStart: attrs.any({
        attribute: "paddingStart",
        number: true,
        tokens: theme.size,
      }),
      paddingEnd: attrs.any({
        attribute: "paddingEnd",
        number: true,
        tokens: theme.size,
      }),
      inset: attrs.any({
        attribute: "inset",
        number: true,
        tokens: theme.size,
      }),
      insetBlock: attrs.any({
        attribute: "insetBlockStart",
        number: true,
        tokens: theme.size,
      }),
      insetBlockStart: attrs.any({
        attribute: "insetBlockStart",
        number: true,
        tokens: theme.size,
      }),
      insetBlockEnd: attrs.any({
        attribute: "insetBlockEnd",
        number: true,
        tokens: theme.size,
      }),
      insetInline: attrs.any({
        attribute: "insetInline",
        number: true,
        tokens: theme.size,
      }),
      insetInlineStart: attrs.any({
        attribute: "insetInlineStart",
        number: true,
        tokens: theme.size,
      }),
      insetInlineEnd: attrs.any({
        attribute: "insetInlineEnd",
        number: true,
        tokens: theme.size,
      }),

      // Margin
      margin: attrs.any({
        attribute: "margin",
        number: true,
        tokens: theme.size,
      }),
      marginBottom: attrs.any({
        attribute: "marginBottom",
        number: true,
        tokens: theme.size,
      }),
      marginLeft: attrs.any({
        attribute: "marginLeft",
        number: true,
        tokens: theme.size,
      }),
      marginRight: attrs.any({
        attribute: "marginRight",
        number: true,
        tokens: theme.size,
      }),
      marginTop: attrs.any({
        attribute: "marginTop",
        number: true,
        tokens: theme.size,
      }),
      marginHorizontal: attrs.any({
        attribute: "marginHorizontal",
        number: true,
        tokens: theme.size,
      }),
      marginVertical: attrs.any({
        attribute: "marginVertical",
        number: true,
        tokens: theme.size,
      }),
      m: attrs.any({ attribute: "margin", number: true, tokens: theme.size }),
      mx: attrs.any({
        attribute: "marginHorizontal",
        number: true,
        tokens: theme.size,
      }),
      my: attrs.any({
        attribute: "marginVertical",
        number: true,
        tokens: theme.size,
      }),
      mt: attrs.any({
        attribute: "marginTop",
        number: true,
        tokens: theme.size,
      }),
      mb: attrs.any({
        attribute: "marginBottom",
        number: true,
        tokens: theme.size,
      }),
      ml: attrs.any({
        attribute: "marginLeft",
        number: true,
        tokens: theme.size,
      }),
      mr: attrs.any({
        attribute: "marginRight",
        number: true,
        tokens: theme.size,
      }),
      marginBlock: attrs.any({
        attribute: "marginBlock",
        number: true,
        tokens: theme.size,
      }),
      marginBlockStart: attrs.any({
        attribute: "marginBlockStart",
        number: true,
        tokens: theme.size,
      }),
      marginBlockEnd: attrs.any({
        attribute: "marginBlockEnd",
        number: true,
        tokens: theme.size,
      }),
      marginInline: attrs.any({
        attribute: "marginInline",
        number: true,
        tokens: theme.size,
      }),
      marginInlineStart: attrs.any({
        attribute: "marginInlineStart",
        number: true,
        tokens: theme.size,
      }),
      marginInlineEnd: attrs.any({
        attribute: "marginInlineEnd",
        number: true,
        tokens: theme.size,
      }),
      marginStart: attrs.any({
        attribute: "marginStart",
        number: true,
        tokens: theme.size,
      }),
      marginEnd: attrs.any({
        attribute: "marginEnd",
        number: true,
        tokens: theme.size,
      }),

      // Layout
      sizeX: attrs.any({
        attributes: ["width", "maxWidth", "minWidth"],
        number: true,
        percentage: true,
        tokens: theme.size,
      }),
      sizeY: attrs.any({
        attributes: ["height", "maxHeight", "minHeight"],
        number: true,
        percentage: true,
        tokens: theme.size,
      }),
      sizeXY: attrs.any({
        attributes: [
          "width",
          "maxWidth",
          "minWidth",
          "height",
          "maxHeight",
          "minHeight",
        ],
        number: true,
        percentage: true,
        tokens: theme.size,
      }),
      width: attrs.any({
        attribute: "width",
        number: true,
        percentage: true,
        tokens: theme.size,
      }),
      height: attrs.any({
        attribute: "height",
        number: true,
        percentage: true,
        tokens: theme.size,
      }),
      minWidth: attrs.any({
        attribute: "minWidth",
        number: true,
        percentage: true,
        tokens: theme.size,
      }),
      minHeight: attrs.any({
        attribute: "minHeight",
        number: true,
        percentage: true,
        tokens: theme.size,
      }),
      maxWidth: attrs.any({
        attribute: "maxWidth",
        number: true,
        percentage: true,
        tokens: theme.size,
      }),
      maxHeight: attrs.any({
        attribute: "maxHeight",
        number: true,
        percentage: true,
        tokens: theme.size,
      }),

      // Transforms
      rotate: attrs.any({
        custom: transform,
        attribute: "rotate",
        number: true,
        angle: true,
      }),
      rotateX: attrs.any({
        custom: transform,
        attribute: "rotateX",
        number: true,
        angle: true,
      }),
      rotateY: attrs.any({
        custom: transform,
        attribute: "rotateY",
        number: true,
        angle: true,
      }),
      rotateZ: attrs.any({
        custom: transform,
        attribute: "rotateZ",
        number: true,
        angle: true,
      }),
      x: attrs.any({
        custom: transform,
        attribute: "translateX",
        number: true,
        tokens: theme.size,
      }),
      y: attrs.any({
        custom: transform,
        attribute: "translateY",
        number: true,
        tokens: theme.size,
      }),
      translateX: attrs.any({
        custom: transform,
        attribute: "translateX",
        number: true,
        tokens: theme.size,
      }),
      translateY: attrs.any({
        custom: transform,
        attribute: "translateY",
        number: true,
        tokens: theme.size,
      }),
      scale: attrs.any({ custom: transform, attribute: "scale", number: true }),
      scaleX: attrs.any({
        custom: transform,
        attribute: "scaleX",
        number: true,
      }),
      scaleY: attrs.any({
        custom: transform,
        attribute: "scaleY",
        number: true,
      }),
      skewX: attrs.any({ custom: transform, attribute: "skewX", number: true }),
      skewY: attrs.any({ custom: transform, attribute: "skewY", number: true }),
      perspective: attrs.any({ attribute: "perspective", number: true }),
      perspectiveOrigin: attrs.any({
        attribute: "perspectiveOrigin",
        string: true,
      }),
      transformOrigin: attrs.any({
        attribute: "transformOrigin",
        string: true,
      }),

      // Flex
      flex: attrs.any({ attribute: "flex", number: true }),
      flexDirection: {
        row: { flexDirection: "row" },
        column: { flexDirection: "column" },
        "row-reverse": { flexDirection: "row-reverse" },
        "column-reverse": { flexDirection: "column-reverse" },
      },
      alignItems: {
        "flex-start": { alignItems: "flex-start" },
        "flex-end": { alignItems: "flex-end" },
        center: { alignItems: "center" },
        stretch: { alignItems: "stretch" },
        baseline: { alignItems: "baseline" },
      },

      itemsStart: { true: { alignItems: "flex-start" } },
      itemsEnd: { true: { alignItems: "flex-end" } },
      itemsCenter: { true: { alignItems: "center" } },
      itemsStretch: { true: { alignItems: "stretch" } },
      itemsBaseline: { true: { alignItems: "baseline" } },

      justifyContent: {
        "flex-start": { justifyContent: "flex-start" },
        "flex-end": { justifyContent: "flex-end" },
        center: { justifyContent: "center" },
        "space-between": { justifyContent: "space-between" },
        "space-around": { justifyContent: "space-around" },
        "space-evenly": { justifyContent: "space-evenly" },
      },

      justifyStart: { true: { justifyContent: "flex-start" } },
      justifyEnd: { true: { justifyContent: "flex-end" } },
      justifyCenter: { true: { justifyContent: "center" } },
      justifyBetween: { true: { justifyContent: "space-between" } },
      justifyAround: { true: { justifyContent: "space-around" } },
      justifyEvenly: { true: { justifyContent: "space-evenly" } },

      alignContent: {
        "flex-start": { alignContent: "flex-start" },
        "flex-end": { alignContent: "flex-end" },
        center: { alignContent: "center" },
        stretch: { alignContent: "stretch" },
        "space-between": { alignContent: "space-between" },
        "space-around": { alignContent: "space-around" },
        "space-evenly": { alignContent: "space-evenly" },
      },

      contentStart: { true: { alignContent: "flex-start" } },
      contentEnd: { true: { alignContent: "flex-end" } },
      contentCenter: { true: { alignContent: "center" } },
      contentStretch: { true: { alignContent: "stretch" } },
      contentBetween: { true: { alignContent: "space-between" } },
      contentAround: { true: { alignContent: "space-around" } },
      contentEvenly: { true: { alignContent: "space-evenly" } },

      alignSelf: {
        auto: { alignSelf: "auto" },
        "flex-start": { alignSelf: "flex-start" },
        "flex-end": { alignSelf: "flex-end" },
        center: { alignSelf: "center" },
        stretch: { alignSelf: "stretch" },
        baseline: { alignSelf: "baseline" },
      },

      selfAuto: { true: { alignSelf: "auto" } },
      selfStart: { true: { alignSelf: "flex-start" } },
      selfEnd: { true: { alignSelf: "flex-end" } },
      selfCenter: { true: { alignSelf: "center" } },
      selfStretch: { true: { alignSelf: "stretch" } },
      selfBaseline: { true: { alignSelf: "baseline" } },

      flexWrap: {
        true: { flexWrap: "wrap" },
        wrap: { flexWrap: "wrap" },
        nowrap: { flexWrap: "nowrap" },
        "wrap-reverse": { flexWrap: "wrap-reverse" },
      },

      wrap: { true: { flexWrap: "wrap" } },
      nowrap: { true: { flexWrap: "nowrap" } },
      wrapReverse: { true: { flexWrap: "wrap-reverse" } },

      flexGrow: attrs.any({ attribute: "flexGrow", number: true }),
      flexShrink: attrs.any({ attribute: "flexShrink", number: true }),
      flexBasis: attrs.any({ attribute: "flexBasis", number: true }),

      gap: attrs.any({
        attribute: "gap",
        number: true,
        percentage: true,
        tokens: theme.size,
      }),

      // Grid Item
      row: attrs.any({ attribute: "row", number: true, string: true }),
      column: attrs.any({ attribute: "column", number: true, string: true }),
      rowSpan: attrs.any({ attribute: "rowSpan", number: true, string: true }),
      columnSpan: attrs.any({
        attribute: "columnSpan",
        number: true,
        string: true,
      }),
      rowStart: attrs.any({
        attribute: "rowStart",
        number: true,
        string: true,
      }),
      columnStart: attrs.any({
        attribute: "columnStart",
        number: true,
        string: true,
      }),
      rowEnd: attrs.any({ attribute: "rowEnd", number: true, string: true }),
      columnEnd: attrs.any({
        attribute: "columnEnd",
        number: true,
        string: true,
      }),
      area: attrs.any({ attribute: "area", string: true }),
      order: attrs.any({ attribute: "order", number: true, string: true }),

      // Background
      backgroundAttachment: attrs.any({
        attribute: "backgroundAttachment",
        string: true,
      }),
      backgroundBlendMode: attrs.any({
        attribute: "backgroundBlendMode",
        string: true,
      }),
      backgroundClip: attrs.any({ attribute: "backgroundClip", string: true }),
      backgroundColor: attrs.any({
        attribute: "backgroundColor",
        color: true,
        tokens: theme.colors,
      }),
      bg: attrs.any({
        attribute: "backgroundColor",
        color: true,
        tokens: theme.colors,
      }),
      backgroundOrigin: attrs.any({
        attribute: "backgroundOrigin",
        string: true,
      }),
      backgroundPosition: attrs.any({
        attribute: "backgroundPosition",
        string: true,
      }),
      backgroundSize: attrs.any({ attribute: "backgroundSize", string: true }),
      backgroundImage: attrs.any({
        attribute: "backgroundImage",
        string: true,
      }),
      backgroundRepeat: {
        repeat: { backgroundRepeat: "repeat" as const },
        "repeat-x": { backgroundRepeat: "repeat-x" },
        "repeat-y": { backgroundRepeat: "repeat-y" },
        "no-repeat": { backgroundRepeat: "no-repeat" },
        space: { backgroundRepeat: "space" },
      },

      // Border
      borderRadius: attrs.any({
        attribute: "borderRadius",
        number: true,
        tokens: theme.size,
      }),
      borderTopLeftRadius: attrs.any({
        attribute: "borderTopLeftRadius",
        number: true,
        tokens: theme.size,
      }),
      borderTopRightRadius: attrs.any({
        attribute: "borderTopRightRadius",
        number: true,
        tokens: theme.size,
      }),
      borderBottomLeftRadius: attrs.any({
        attribute: "borderBottomLeftRadius",
        number: true,
        tokens: theme.size,
      }),
      borderBottomRightRadius: attrs.any({
        attribute: "borderBottomRightRadius",
        number: true,
        tokens: theme.size,
      }),
      borderStartStartRadius: attrs.any({
        attribute: "borderStartStartRadius",
        number: true,
        tokens: theme.size,
      }),
      borderStartEndRadius: attrs.any({
        attribute: "borderStartEndRadius",
        number: true,
        tokens: theme.size,
      }),
      borderEndStartRadius: attrs.any({
        attribute: "borderEndStartRadius",
        number: true,
        tokens: theme.size,
      }),
      borderEndEndRadius: attrs.any({
        attribute: "borderEndEndRadius",
        number: true,
        tokens: theme.size,
      }),
      borderTopStartRadius: attrs.any({
        attribute: "borderTopStartRadius",
        number: true,
        tokens: theme.size,
      }),
      borderTopEndRadius: attrs.any({
        attribute: "borderTopEndRadius",
        number: true,
        tokens: theme.size,
      }),
      borderBottomStartRadius: attrs.any({
        attribute: "borderBottomStartRadius",
        number: true,
        tokens: theme.size,
      }),
      borderBottomEndRadius: attrs.any({
        attribute: "borderBottomEndRadius",
        number: true,
        tokens: theme.size,
      }),
      borderColor: attrs.any({
        attribute: "borderColor",
        color: true,
        tokens: theme.colors,
      }),
      borderTopColor: attrs.any({
        attribute: "borderTopColor",
        color: true,
        tokens: theme.colors,
      }),
      borderRightColor: attrs.any({
        attribute: "borderRightColor",
        color: true,
        tokens: theme.colors,
      }),
      borderBottomColor: attrs.any({
        attribute: "borderBottomColor",
        color: true,
        tokens: theme.colors,
      }),
      borderLeftColor: attrs.any({
        attribute: "borderLeftColor",
        color: true,
        tokens: theme.colors,
      }),
      borderStartColor: attrs.any({
        attribute: "borderStartColor",
        color: true,
        tokens: theme.colors,
      }),
      borderEndColor: attrs.any({
        attribute: "borderEndColor",
        color: true,
        tokens: theme.colors,
      }),
      borderBlockColor: attrs.any({
        attribute: "borderBlockColor",
        color: true,
        tokens: theme.colors,
      }),
      borderBlockStartColor: attrs.any({
        attribute: "borderBlockStartColor",
        color: true,
        tokens: theme.colors,
      }),
      borderBlockEndColor: attrs.any({
        attribute: "borderBlockEndColor",
        color: true,
        tokens: theme.colors,
      }),
      borderWidth: attrs.any({
        attribute: "borderWidth",
        number: true,
        tokens: theme.size,
      }),
      borderTopWidth: attrs.any({
        attribute: "borderTopWidth",
        number: true,
        tokens: theme.size,
      }),
      borderRightWidth: attrs.any({
        attribute: "borderRightWidth",
        number: true,
        tokens: theme.size,
      }),
      borderBottomWidth: attrs.any({
        attribute: "borderBottomWidth",
        number: true,
        tokens: theme.size,
      }),
      borderLeftWidth: attrs.any({
        attribute: "borderLeftWidth",
        number: true,
        tokens: theme.size,
      }),
      borderStartWidth: attrs.any({
        attribute: "borderStartWidth",
        number: true,
        tokens: theme.size,
      }),
      borderEndWidth: attrs.any({
        attribute: "borderEndWidth",
        number: true,
        tokens: theme.size,
      }),
      borderBlockWidth: attrs.any({
        attribute: "borderBlockWidth",
        number: true,
        tokens: theme.size,
      }),
      borderBlockStartWidth: attrs.any({
        attribute: "borderBlockStartWidth",
        number: true,
        tokens: theme.size,
      }),
      borderBlockEndWidth: attrs.any({
        attribute: "borderBlockEndWidth",
        number: true,
        tokens: theme.size,
      }),

      borderCurve: {
        circular: { borderCurve: "circular" },
        continuous: { borderCurve: "continuous" },
      },

      borderStyle: {
        solid: { borderStyle: "solid" },
        dashed: { borderStyle: "dashed" },
        dotted: { borderStyle: "dotted" },
      },

      outline: attrs.any({ attribute: "outline", string: true }),
      outlineColor: attrs.any({
        attribute: "outlineColor",
        color: true,
        tokens: theme.colors,
      }),
      outlineWidth: attrs.any({
        attribute: "outlineWidth",
        number: true,
        tokens: theme.size,
      }),
      outlineOffset: attrs.any({
        attribute: "outlineOffset",
        number: true,
        tokens: theme.size,
      }),
      outlineStyle: {
        solid: { outlineStyle: "solid" },
        dashed: { outlineStyle: "dashed" },
        dotted: { outlineStyle: "dotted" },
      },

      // Misc
      aspectRatio: attrs.any({ attribute: "aspectRatio", number: true }),
      opacity: attrs.any({ attribute: "opacity", number: true }),

      boxSizing: ContentSizing,
      borderBox: { true: ContentSizing.borderBox },
      contentBox: { true: ContentSizing.contentBox },
      cursor: Cursor,

      overflow: {
        visible: { overflow: "visible" },
        hidden: { overflow: "hidden" },
        scroll: { overflow: "scroll" },
      },

      overflowVisible: { true: { overflow: "visible" } },
      overflowHidden: { true: { overflow: "hidden" } },
      overflowScroll: { true: { overflow: "scroll" } },

      overflowX: {
        visible: { overflowX: "visible" },
        hidden: { overflowX: "hidden" },
        scroll: { overflowX: "scroll" },
      },

      overflowXVisible: { true: { overflowX: "visible" } },
      overflowXHidden: { true: { overflowX: "hidden" } },
      overflowXScroll: { true: { overflowX: "scroll" } },

      overflowY: {
        visible: { overflowY: "visible" },
        hidden: { overflowY: "hidden" },
        scroll: { overflowY: "scroll" },
      },

      overflowYVisible: { true: { overflowY: "visible" } },
      overflowYHidden: { true: { overflowY: "hidden" } },
      overflowYScroll: { true: { overflowY: "scroll" } },

      display: {
        none: { display: "none" },
        flex: { display: "flex" },
      },

      visibility: {
        visible: { visibility: "visible" },
        hidden: { visibility: "hidden" },
        collapse: { visibility: "collapse" },
      },

      visibilityVisible: { true: { visibility: "visible" } },
      visibilityHidden: { true: { visibility: "hidden" } },
      visibilityCollapse: { true: { visibility: "collapse" } },

      backdropFilter: attrs.any({ attribute: "backdropFilter", string: true }),

      backfaceVisibility: {
        hidden: { backfaceVisibility: "hidden" },
        visible: { backfaceVisibility: "visible" },
      },

      elevation: attrs.any({ attribute: "elevation", number: true }),
      boxShadow: attrs.any({ attribute: "boxShadow", string: true }),

      overscrollBehavior: {
        auto: { overscrollBehavior: "auto" },
        contain: { overscrollBehavior: "contain" },
        none: { overscrollBehavior: "none" },
      },

      userSelect: {
        none: { userSelect: "none" },
        text: { userSelect: "text" },
        all: { userSelect: "all" },
        auto: { userSelect: "auto" },
      },

      willChange: attrs.any({ attribute: "willChange", string: true }),
      pointerEvents: {
        auto: { pointerEvents: "auto" },
        none: { pointerEvents: "none" },
        "box-none": { pointerEvents: "box-none" },
        "box-only": { pointerEvents: "box-only" },
      },

      direction: {
        ltr: { direction: "ltr" },
        rtl: { direction: "rtl" },
        inherit: { direction: "inherit" },
      },

      mixBlendMode: {
        normal: { mixBlendMode: "normal" },
        multiply: { mixBlendMode: "multiply" },
        screen: { mixBlendMode: "screen" },
        overlay: { mixBlendMode: "overlay" },
        darken: { mixBlendMode: "darken" },
        lighten: { mixBlendMode: "lighten" },
        "color-dodge": { mixBlendMode: "color" },
        "color-burn": { mixBlendMode: "color" },
        "hard-light": { mixBlendMode: "hard-light" },
        "soft-light": { mixBlendMode: "soft-light" },
        difference: { mixBlendMode: "difference" },
        exclusion: { mixBlendMode: "exclusion" },
        hue: { mixBlendMode: "hue" },
        saturation: { mixBlendMode: "saturation" },
        color: { mixBlendMode: "color" },
        luminosity: { mixBlendMode: "luminosity" },
      },

      clip: attrs.any({ attribute: "clip", string: true }),
      filter: attrs.any({ attribute: "filter", string: true }),
      isolation: {
        auto: { isolation: "auto" },
        isolate: { isolation: "isolate" },
      },
      overscrollBehaviorX: {
        auto: { overscrollBehaviorX: "auto" },
        contain: { overscrollBehaviorX: "contain" },
        none: { overscrollBehaviorX: "none" },
      },
      overscrollBehaviorY: {
        auto: { overscrollBehaviorY: "auto" },
        contain: { overscrollBehaviorY: "contain" },
        none: { overscrollBehaviorY: "none" },
      },
      rotation: attrs.any({ attribute: "rotation", string: true }),

      // Animations & Transition
      transitionProperty: attrs.any({
        attribute: "transitionProperty",
        multiple: true,
        string: true,
      }),
      transitionDuration: attrs.any({
        attribute: "transitionDuration",
        multiple: true,
        number: true,
      }),
      transitionTimingFunction: attrs.any({
        attribute: "transitionTimingFunction",
        multiple: true,
        string: true,
      }),
      transitionDelay: attrs.any({
        attribute: "transitionDelay",
        multiple: true,
        number: true,
      }),
      transitionBehavior: {
        allowDiscrete: { transitionBehavior: "allow-discrete" } as any,
        normal: { transitionBehavior: "normal" } as any,
      },

      animationName: attrs.any({ attribute: "animationName", any: true }),
      animationDuration: attrs.any({
        attribute: "animationDuration",
        multiple: true,
        number: true,
        time: true,
      }),
      animationDelay: attrs.any({
        attribute: "animationDelay",
        multiple: true,
        number: true,
        time: true,
      }),
      animationTimingFunction: attrs.any({
        attribute: "animationTimingFunction",
        multiple: true,
        tokens: {
          linear: "linear",
          ease: "ease",
          easeIn: "ease-in",
          easeOut: "ease-out",
          easeInOut: "ease-in-out",
          stepStart: "step-start",
          stepEnd: "step-end",
        },
      }),
      animationDirection: attrs.any({
        attribute: "animationDirection",
        multiple: true,
        tokens: {
          normal: "normal",
          reverse: "reverse",
          alternate: "alternate",
          alternateReverse: "alternate-reverse",
        },
      }),
      animationIterationCount: attrs.any({
        attribute: "animationIterationCount",
        multiple: true,
        number: true,
        tokens: {
          infinity: "infinite",
        },
      }),
      animationFillMode: attrs.any({
        attribute: "animationFillMode",
        multiple: true,
        tokens: {
          forwards: "forwards",
          backwards: "backwards",
          both: "both",
          none: "none",
        },
      }),
      animationPlayState: attrs.any({
        attribute: "animationPlayState",
        multiple: true,
        tokens: {
          running: "running",
          paused: "paused",
        },
      }),
    },
  };
};
