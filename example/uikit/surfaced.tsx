import { createSurfaced, createTextBase, createViewBase } from "surfacekit";

import * as themes from './theme';
export * as themes from './theme';

type Theme = typeof themes[keyof typeof themes];

export const surfaced = createSurfaced<Theme>()

export const View = createViewBase(surfaced);
export const Text = createTextBase(surfaced);
