import { Property } from 'csstype';

type PropertyMap<T extends string | number> = Partial<Record<T, { [key: string]: any }>>

export const Position = {
  'static': { position: 'static' },
  'relative': { position: 'relative' },
  'absolute': { position: 'absolute' },
  'fixed': { position: 'fixed' },
  'sticky': { position: 'sticky' },
} as const

export const FlexDirection = {
  'row': { flexDirection: 'row' },
  'row-reverse': { flexDirection: 'row-reverse' },
  'column': { flexDirection: 'column' },
  'column-reverse': { flexDirection: 'column-reverse' },
} as const


export const ContentSizing = {
  borderBox: { boxSizing: 'border-box' },
  contentBox: { boxSizing: 'content-box' }
} as const

export const Cursor: PropertyMap<Property.Cursor> = {
  'auto': { cursor: 'auto' },
  'default': { cursor: 'default' },
  'none': { cursor: 'none' },
  'context-menu': { cursor: 'context-menu' },
  'help': { cursor: 'help' },
  'pointer': { cursor: 'pointer' },
  'progress': { cursor: 'progress' },
  'wait': { cursor: 'wait' },
  'cell': { cursor: 'cell' },
  "zoom-in": { cursor: 'zoom-in' },
  "zoom-out": { cursor: 'zoom-out' },
  "grab": { cursor: 'grab' },
  "grabbing": { cursor: 'grabbing' },
  "ew-resize": { cursor: 'ew-resize' },
  "ns-resize": { cursor: 'ns-resize' },
  "nesw-resize": { cursor: 'nesw-resize' },
  "nwse-resize": { cursor: 'nwse-resize' },
  "col-resize": { cursor: 'col-resize' },
  "row-resize": { cursor: 'row-resize' },
  "all-scroll": { cursor: 'all-scroll' },
  "copy": { cursor: 'copy' },
  "move": { cursor: 'move' },
  "no-drop": { cursor: 'no-drop' },
  "text": { cursor: 'text' },
  "crosshair": { cursor: 'crosshair' },
  'unset': { cursor: 'unset' },
  'revert': { cursor: 'revert' },
  'inherit': { cursor: 'inherit' },
  'initial': { cursor: 'initial' },
  'revert-layer': { cursor: 'revert-layer' },
  'auto-fill': { cursor: 'auto-fill' },
  'auto-fit': { cursor: 'auto-fit' },
  "-moz-grab": { cursor: '-moz-grab' },
  "-moz-grabbing": { cursor: '-moz-grabbing' },
  "-webkit-grab": { cursor: '-webkit-grab' },
  "-webkit-grabbing": { cursor: '-webkit-grabbing' },
  "-webkit-zoom-in": { cursor: '-webkit-zoom-in' },
  "-webkit-zoom-out": { cursor: '-webkit-zoom-out' },
  "e-resize": { cursor: 'e-resize' },
  "n-resize": { cursor: 'n-resize' },
  "ne-resize": { cursor: 'ne-resize' },
  "nw-resize": { cursor: 'nw-resize' },
  "s-resize": { cursor: 's-resize' },
  "se-resize": { cursor: 'se-resize' },
  "sw-resize": { cursor: 'sw-resize' },
  "w-resize": { cursor: 'w-resize' },
  "-moz-initial": { cursor: '-moz-initial' },
  "-webkit-initial": { cursor: '-webkit-initial' },
  "vertical-text": { cursor: 'vertical-text' },
  "alias": { cursor: 'alias' },
  "not-allowed": { cursor: 'not-allowed' },
}


