import { createRoot } from 'react-dom/client';
import { CardsProvider } from './providers/Cards';
import { RouterProvider } from './providers/Router';
import { ThemeProvider } from './providers/Theme';

function App() {
  return (
    <ThemeProvider>
      <CardsProvider>
        <RouterProvider />
      </CardsProvider>
    </ThemeProvider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
