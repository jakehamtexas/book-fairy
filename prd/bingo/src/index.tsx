import { createRoot } from 'react-dom/client';
import { redirect } from 'react-router-dom';
import { CardsProvider } from './providers/Cards';
import { RouterProvider } from './providers/Router';
import { ThemeProvider } from './providers/Theme';
import { BackgroundImageProvider } from './providers/BackgroundImage';
import { StrictMode } from 'react';

const DevRedirect: React.FC = () => {
  if (process.env['NODE_ENV'] === 'production') {
    return null;
  }

  const redirectTo = new URLSearchParams(window.location.search).get('redirect');

  if (redirectTo) {
    redirect(redirectTo);
  }
  return <></>;
};

function App() {
  return (
    <StrictMode>
      <DevRedirect />
      <ThemeProvider>
        <BackgroundImageProvider>
          <CardsProvider>
            <RouterProvider />
          </CardsProvider>
        </BackgroundImageProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
