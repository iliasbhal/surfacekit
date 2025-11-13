import { createSurfaced} from "../src";

import * as themes from './theme';
export * as themes from './theme';

type Theme = typeof themes[keyof typeof themes];

export const surfaced = createSurfaced<Theme>();
export const View = surfaced.createView();
export const Text = surfaced.createText();
