import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const BackgroundImageContainer = styled.div<{ $bgImgUrl: string | undefined }>`
  ${({ $bgImgUrl }) => css`
    background: url(${$bgImgUrl}) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    height: 100vh;
    width: 100vw;
  `}
`;
