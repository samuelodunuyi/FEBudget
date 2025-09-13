import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import { components } from './components';
import { config } from './config';
import { fonts } from './fonts';
import { fontSizes } from './fontSizes';
import { sizes } from './sizes';

const customTheme = extendTheme({
  fonts,
  colors,
  config,
  components,
  sizes,
  fontSizes,
});

export default customTheme;
