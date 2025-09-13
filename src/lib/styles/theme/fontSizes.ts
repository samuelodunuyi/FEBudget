import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional font size here */
const extendedFontSizes: DeepPartial<Record<string, Theme['fontSizes']['sm']>> =
  {
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '40px',
    '4xl': '48px',
    '5xl': '64px',
    '6xl': '72px',
  };

/** override chakra font sizes here */
const overridenChakraFontSizes: DeepPartial<Theme['fontSizes']> = {};

export const fontSizes = {
  ...overridenChakraFontSizes,
  ...extendedFontSizes,
};
