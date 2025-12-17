import React from 'react';
import { View, Text } from '@/uikit';
import { Gesture } from 'react-native-gesture-handler';
import * as showcaselinks from '../../components/_index';
import { useSegments, useLocalSearchParams } from 'expo-router';


export default function Screen() {
  const segments = useSegments();
  const search = useLocalSearchParams();

  const showCaseId= search.showcaseId as keyof typeof showcaselinks;
  const Component = showcaselinks[showCaseId] as React.ComponentType<any>;
  // showcaselinks.Toggle

  return (
    <View
      display='flex'
      flexDirection='row'
      // backgroundColor="red"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Component />
    </View>
  );
}

// npx expo install $DEPENDINCIES -- --force