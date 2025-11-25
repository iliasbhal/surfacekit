import React from 'react';
import { Orientation, addOrientationChangeListener, getOrientationAsync, removeOrientationChangeListener } from 'expo-screen-orientation';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const OrientationContext = createContext<Orientation>(null!);

export const OrientationProvider = ({ children }: { children: ReactNode }) => {
  const [orientation, setOrientation] = useState<Orientation>(null!);

  useEffect(() => {
    let isMounted = true;

    const getOrientation = async () => {
      const currentOrientation = await getOrientationAsync();
      if (isMounted) {
        setOrientation(currentOrientation);
      }
    };

    const subscription = addOrientationChangeListener(({ orientationInfo }) => {
      if (isMounted) {
        setOrientation(orientationInfo.orientation);
      }
    });

    getOrientation();

    return () => {
      isMounted = false;
      removeOrientationChangeListener(subscription);
    };
  }, []);

  return (
    <OrientationContext.Provider value={orientation}>
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
