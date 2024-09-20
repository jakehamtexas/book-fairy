import { Outlet } from 'react-router-dom';
import { ArrowNavButton } from '../components/ArrowNavButton';
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

const OutletContainer = styled.div`
  height: 90%;
`;

const NavBarLayout = styled.nav`
  display: grid;

  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;

  height: 10%;

  opacity: 0.5;
  background: #000;
`;

const ButtonContainer = styled(Container)`
  background: #000;
  opacity: 1;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavBar: React.FC = () => {
  return (
    <NavBarLayout>
      <ButtonContainer>
        <ArrowNavButton left />
      </ButtonContainer>
      <Container />
      <ButtonContainer>
        <ArrowNavButton right />
      </ButtonContainer>
    </NavBarLayout>
  );
};

export const Layout: React.FC = () => {
  const { fileUrl } = useBackgroundImage();

  return (
    <BackgroundImageContainer $bgImgUrl={fileUrl}>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
      <NavBar />
    </BackgroundImageContainer>
  );
};
