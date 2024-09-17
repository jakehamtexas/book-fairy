import { Input } from '@chakra-ui/react';
import React from 'react';
import { useBackgroundImage } from '../providers/BackgroundImage';

const UploadBackgroundImageInput = () => {
  const { setFile } = useBackgroundImage();

  return (
    <Input
      type="file"
      accept=".png"
      name="myImage"
      onChange={(event) => {
        const file = event.target.files?.[0];
        setFile(file);
      }}
    />
  );
};

export const UploadTab: React.FC = () => {
  return <UploadBackgroundImageInput />;
};
