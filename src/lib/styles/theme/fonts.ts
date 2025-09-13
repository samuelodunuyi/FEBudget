import type { DeepPartial, Theme } from '@chakra-ui/react';
import localFont from 'next/font/local';

// Outfit-Black.ttf
// Outfit-Bold.ttf
// Outfit-ExtraBold.ttf
// Outfit-ExtraLight.ttf
// Outfit-Light.ttf
// Outfit-Medium.ttf
// Outfit-Regular.ttf
// Outfit-SemiBold.ttf
// Outfit-Thin.ttf

const Outfit = localFont({
  src: [
    {
      path: '../../../../public/font/Outfit/Outfit-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Outfit/Outfit-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Outfit/Outfit-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Outfit/Outfit-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Outfit/Outfit-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Outfit/Outfit-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Outfit/Outfit-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Outfit/Outfit-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../../public/font/Outfit/Outfit-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
});

export const fonts: DeepPartial<Theme['fonts']> = {
  heading: Outfit.style.fontFamily,
  body: Outfit.style.fontFamily,
};
