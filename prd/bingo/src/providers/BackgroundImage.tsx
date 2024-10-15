import React, { useContext, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from 'react';
import { createContext } from 'react';
import { useImage, type ImageProviderProps } from '../hooks/useImage';

const BackgroundImageContext = createContext<ImageProviderProps | undefined>(undefined);

function useBackgroundImageContext() {
  const context = useContext(BackgroundImageContext);

  if (!context) {
    throw new Error('BackgroundImageContext must be used within a provider');
  }

  return context;
}

export function useBackgroundImage() {
  const backgroundImageContext = useBackgroundImageContext();
  const { imageUrl, setImageUrl } = useImage(backgroundImageContext);

  return {
    fileUrl: imageUrl,
    setFileUrl: setImageUrl,
  };
}

export const BackgroundImageProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <BackgroundImageContext.Provider value={useState()}>{children}</BackgroundImageContext.Provider>
);
