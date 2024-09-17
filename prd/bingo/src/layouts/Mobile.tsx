import { Outlet } from 'react-router-dom';
import { ArrowNav } from '../components/ArrowNav';
import { useBackgroundImage } from '../providers/BackgroundImage';
import styled from '@emotion/styled';
import { Container } from '@chakra-ui/react';
import { css } from '@emotion/react';

const BackgroundImageContainer = styled.div<{ $bgImgUrl: string | undefined }>`
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

export const Layout: React.FC = () => {
  const { fileUrl } = useBackgroundImage();

  return (
    <BackgroundImageContainer $bgImgUrl={fileUrl}>
      <Container>
        <nav>
          <ArrowNav left />
          <ArrowNav right />
        </nav>
        <Outlet />
      </Container>
    </BackgroundImageContainer>
  );
};
