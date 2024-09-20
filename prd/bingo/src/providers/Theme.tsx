import { ThemeProvider as BaseThemeProvider, ColorModeProvider, type Theme } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

// TODO: wtf
const THEME: Partial<Theme> = {
  colors: {
    white: '#000',
  } as Theme['colors'],
};

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <BaseThemeProvider theme={THEME}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </BaseThemeProvider>
  );
};
