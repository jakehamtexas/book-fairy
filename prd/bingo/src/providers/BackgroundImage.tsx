import React, { useContext, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from 'react';
import { createContext } from 'react';

type BackgroundImageProviderProps = [file: File | undefined, setImage: Dispatch<SetStateAction<File | undefined>>];

const BackgroundImageContext = createContext<BackgroundImageProviderProps | undefined>(undefined);

function useBackgroundImageContext() {
  const context = useContext(BackgroundImageContext);

  if (!context) {
    throw new Error('BackgroundImageContext must be used within a provider');
  }

  return context;
}

export type BackgroundImageState = {
  fileUrl: string;
  setFile: Dispatch<SetStateAction<File | undefined>>;
};

export function useBackgroundImage() {
  const [file, setFile] = useBackgroundImageContext();
  const fileUrl = file ? URL.createObjectURL(file) : undefined;

  return {
    fileUrl,
    setFile,
  };
}

export const BackgroundImageProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <BackgroundImageContext.Provider value={useState()}>{children}</BackgroundImageContext.Provider>
);
