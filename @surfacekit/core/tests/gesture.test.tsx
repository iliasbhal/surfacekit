import React from 'react';
import * as RNTesting from '@testing-library/react-native';
import { View } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { createSurfaced } from '../src';
import * as themes from './themes';

type TestTheme = typeof themes[keyof typeof themes];
const surfaced = createSurfaced<TestTheme>();

describe('Gesture Surface', () => {
  
  it('should be able to setup onTap gestures', () => {
    throw new Error();
  });
})
