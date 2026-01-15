import React from 'react';

export const surfaceContext = React.createContext<any>(null!);

export const SurfaceProvider = surfaceContext.Provider;

export const useSurface = () => {
  return React.useContext(surfaceContext);
}