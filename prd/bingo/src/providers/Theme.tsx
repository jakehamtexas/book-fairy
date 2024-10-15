import {
  ChakraProvider,
  ThemeProvider as BaseThemeProvider,
  ColorModeProvider,
  type Theme,
  theme as chakraTheme,
  extendBaseTheme,
  type DeepPartial,
} from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

const white = '#fff';
const black = '#000';

const overrideTheme: DeepPartial<Theme> = {
  styles: {
    global: {
      body: {
        color: black,
      },
    },
  },
};

const THEME: Partial<Theme> = extendBaseTheme(chakraTheme, overrideTheme);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChakraProvider>
      <BaseThemeProvider theme={THEME}>
        <ColorModeProvider>{children}</ColorModeProvider>
      </BaseThemeProvider>
    </ChakraProvider>
  );
};
