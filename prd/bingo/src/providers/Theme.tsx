import { ThemeProvider as BaseThemeProvider, ColorModeProvider } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

const THEME = {};

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <BaseThemeProvider theme={THEME}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </BaseThemeProvider>
  );
};
