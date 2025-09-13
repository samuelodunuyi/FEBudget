'use client';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { CacheProvider } from '@chakra-ui/next-js';
import { GlobalStyle } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import { msalConfig } from '~/authConfig';
import { Chakra as ChakraProvider } from '~/lib/components/Chakra';
import SessionCheck from '~/lib/components/SessionCheck';
import { store } from '~/lib/redux/store';

import '~/lib/styles/globals.css';
import 'focus-visible/dist/focus-visible';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const instance: any = new PublicClientApplication(msalConfig);
  return (
    <Provider store={store}>
      <CacheProvider>
        <GlobalStyle />
        <ChakraProvider>
          <MsalProvider instance={instance}>
            <SessionCheck />
            {children}
          </MsalProvider>
        </ChakraProvider>
      </CacheProvider>
    </Provider>
  );
};

export default Providers;
