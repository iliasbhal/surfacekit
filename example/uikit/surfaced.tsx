import { createSurfaced } from "surfacekit";
import * as themes from './theme';
export * as themes from './theme';

type Theme = typeof themes[keyof typeof themes];

export const surfaced = createSurfaced<Theme>()
export const View = surfaced.createView();
export const Text = surfaced.createText();


<View backgroundColor="surfaces.0" />