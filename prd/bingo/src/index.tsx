import { createRoot } from 'react-dom/client';
import { CardsProvider } from './providers/Cards';
import { RouterProvider } from './providers/Router';
import { ThemeProvider } from './providers/Theme';
import { BackgroundImageProvider } from './providers/BackgroundImage';

function App() {
  return (
    <ThemeProvider>
      <BackgroundImageProvider>
        <CardsProvider>
          <RouterProvider />
        </CardsProvider>
      </BackgroundImageProvider>
    </ThemeProvider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
