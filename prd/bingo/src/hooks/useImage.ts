import React, { useContext, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from 'react';

export type ImageProviderProps = [
  imageUrl: string | undefined,
  setImageUrl: Dispatch<SetStateAction<string | undefined>>,
];

export function useImage([imageUrl, setImageUrl]: ImageProviderProps) {
  return {
    imageUrl,
    setImageUrl: (blob: Blob) => {
      const blobUrl = URL.createObjectURL(blob);
      setImageUrl(blobUrl);
    },
  };
}
