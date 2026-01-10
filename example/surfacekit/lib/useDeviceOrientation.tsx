import React, { useRef } from 'react';
import { Orientation, addOrientationChangeListener, getOrientationAsync, removeOrientationChangeListener } from 'expo-screen-orientation';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const OrientationContext = createContext<Orientation>(null!);

export const OrientationProvider = ({ children }: { children: ReactNode }) => {

  const [_, rerender] = useState({});
  const orientationRef = React.useRef<Orientation>(Orientation.UNKNOWN);

  useEffect(() => {
    let isMounted = true;

    const onOrientationChange = (orientation: Orientation) => {
      if (!isMounted) return;
      if (!orientation) return;

      console.log('onOrientationChange', orientation, orientationRef.current);
      const hasChanged = orientationRef.current !== orientation;
      if (hasChanged) {
        orientationRef.current = orientation;
        rerender({});
      }
    };

    const getOrientation = async () => {
      const currentOrientation = await getOrientationAsync();
      onOrientationChange(currentOrientation);
    };

    const subscription = addOrientationChangeListener(({ orientationInfo }) => {
      onOrientationChange(orientationInfo.orientation);
    });


    getOrientation();

    return () => {
      isMounted = false;
      subscription.remove?.();
    };
  }, []);

  return (
    <OrientationContext.Provider value={orientationRef.current}>
      {children}
    </OrientationContext.Provider>
  );
};

export const useDeviceOrientation = () => {
  const orientation = useContext(OrientationContext);

  Orientation.LANDSCAPE_LEFT
  Orientation.LANDSCAPE_RIGHT
  Orientation.PORTRAIT_DOWN
  Orientation.PORTRAIT_UP

  const isLandscape = orientation === Orientation.LANDSCAPE_LEFT || orientation === Orientation.LANDSCAPE_RIGHT;
  if (isLandscape) return 'landscape';
  
  const isPortrait = orientation === Orientation.PORTRAIT_DOWN 
    || orientation === Orientation.PORTRAIT_UP
    || orientation === Orientation.UNKNOWN;
  if (isPortrait) return 'portrait';
  
  return 'portrait';

};
