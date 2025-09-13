import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme['colors']['blackAlpha']>
> = {
  brand: {
    100: '#227CBF',
    200: '#47B65C',
    300: '#1B3242',
    400: '#FF6633',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
  headText: {
    100: '#333333',
    200: '#1B3242',
    300: '',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
  bodyText: {
    100: '#85888D',
    200: '#F9F9F9',
    300: '#A0AEC0',
    400: '#424242',
    500: '#7F83A8',
    600: '#999EB3',
    700: '#71757D',
    800: '#636363',
    900: '#202020',
  },
  background: {
    100: '#ECEBFC',
    200: '#FAFAFA',
    300: '#F8FAFC',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
  border: {
    100: '#E2E8F0',
    200: '#E5E7EB',
    300: '',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
  grey: {
    100: '#A6ACBE',
    200: '',
    300: '',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
  customRed: {
    100: '#BC0000',
    200: '',
    300: '',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
  customGreen: {
    100: '#00741A',
    200: '',
    300: '',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
