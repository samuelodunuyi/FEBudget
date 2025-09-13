import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional size here */
const extendedSize: DeepPartial<Record<string, Theme['sizes']['container']>> = {
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

/** override chakra sizes here */
const overridenChakraSizes: DeepPartial<Theme['sizes']> = {};

export const sizes = {
  ...overridenChakraSizes,
  ...extendedSize,
};
