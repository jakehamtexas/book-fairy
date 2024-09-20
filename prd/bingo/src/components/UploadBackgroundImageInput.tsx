import { Input } from '@chakra-ui/react';
import { useBackgroundImage } from '../providers/BackgroundImage';
import { CenteredButtonMask } from './CenteredButtonMask';
import { useRef } from 'react';
import styled from '@emotion/styled';

const HiddenInput = styled(Input)`
  visibility: hidden;
  position: absolute;
  z-index: -1;
`;

export const UploadBackgroundImageInput = () => {
  const { fileUrl, setFile } = useBackgroundImage();
  const ref = useRef<HTMLInputElement>(null);

  const onClick = () => {
    ref.current?.click();
  };

  if (fileUrl) {
    return null;
  }

  return (
    <>
      <HiddenInput
        ref={ref}
        type="file"
        accept=".png"
        name="myImage"
        onChange={(event) => {
          const file = event.target.files?.[0];
          setFile(file);
        }}
      />
      <CenteredButtonMask onClick={onClick} icon={'add'}>
        Add a background
      </CenteredButtonMask>
    </>
  );
};
