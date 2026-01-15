import React from 'react';
import { AnimatePresence } from '../AnimatePresence';
import * as RNTesting from '@testing-library/react-native';
import { surfaced, View, Text, themes } from "../fixtures";

describe('PresenceController', () => {
  it('should handle initial render', () => {

    const presence = RNTesting.render(
      <surfaced.Provider theme={themes.dark}>
        <AnimatePresence>
          <View key="1">Hello</View>
          <View key="2">World</View>
        </AnimatePresence>
      </surfaced.Provider>
    );

    const expected = RNTesting.render(
      <surfaced.Provider theme={themes.dark}>
        <View key="1">Hello</View>
        <View key="2">World</View>
      </surfaced.Provider>
    );

    expect(presence.toJSON()).toEqual(expected.toJSON());
  });

  it('should handle subsequent render', () => {
    const presence = RNTesting.render(
      <surfaced.Provider theme={themes.dark}>
        <AnimatePresence>
          <View key="1">Hello</View>
          <View key="2">World</View>
        </AnimatePresence>
      </surfaced.Provider>
    );

    presence.rerender(
      <surfaced.Provider theme={themes.dark}>
        <AnimatePresence>
          <View key="1">Hello Rerender</View>
          <View key="2">World Rerender</View>
          <View key="3">World</View>
        </AnimatePresence>
      </surfaced.Provider>
    )


    const expected = RNTesting.render(
      <surfaced.Provider theme={themes.dark}>
        <View key="1">Hello Rerender</View>
        <View key="2">World Rerender</View>
        <View key="3">World</View>
      </surfaced.Provider>
    )

    expect(presence.toJSON()).toEqual(expected.toJSON());
  });

  it('should remove exiting elements if they don\'t animate', () => {
    const presence = RNTesting.render(
      <surfaced.Provider theme={themes.dark}>
        <AnimatePresence>
          <View key="1">Hello</View>
          <View key="2">World</View>
        </AnimatePresence>
      </surfaced.Provider>
    );

    presence.rerender(
      <surfaced.Provider theme={themes.dark}>
        <AnimatePresence>
          <View key="1">Hello Rerender</View>
        </AnimatePresence>
      </surfaced.Provider>
    );

    const expected = RNTesting.render(
      <surfaced.Provider theme={themes.dark}>
        <AnimatePresence>
          <View key="1">Hello Rerender</View>
        </AnimatePresence>
      </surfaced.Provider>
    )

    expect(presence.toJSON()).toEqual(expected.toJSON());
  });

  it('should remove exiting elements if they don\'t animate', async () => {
    const presence = RNTesting.render(
      <surfaced.Provider theme={themes.dark}>

        <AnimatePresence>
          <View key="1">Hello</View>
          <View 
            key="2"
            transition={{
              backgroundColor: true,
            }}
            overrides={(state) => [
              state.exiting && { backgroundColor: 'red' }
            ]}
          >
            <Text>World</Text>
          </View>
        </AnimatePresence>
      </surfaced.Provider>
    );

    presence.rerender(
      <surfaced.Provider theme={themes.dark}>
        <AnimatePresence>
          <View key="1">Hello Rerender</View>
        </AnimatePresence>
      </surfaced.Provider>
    );

    await RNTesting.waitForElementToBeRemoved(() => presence.getByText('World'), {
      timeout: 3000,
    });

    const expected = RNTesting.render(
      <surfaced.Provider theme={themes.dark}>
        <View key="1">Hello Rerender</View>
      </surfaced.Provider>
    )

    expect(presence.toJSON()).toEqual(expected.toJSON());
  });
});