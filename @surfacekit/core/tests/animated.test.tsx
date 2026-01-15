import { createSurfaced } from '../src';
import * as themes from './themes';

type TestTheme = typeof themes[keyof typeof themes];
const surfaced = createSurfaced<TestTheme>();

describe('Animated Surface', () => {
  
  it.todo('can use the initial and animate prop');
})

