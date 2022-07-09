import Head from 'next/head';
import { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { getDesignTokens } from '../app/theme';
import createEmotionCache from '../app/createEmotionCache';
import { ColorModeContext } from '../layouts/core/mode_switch/Mode_switch';
import { appWithTranslation } from 'next-i18next';
import { QueryClientProvider } from "react-query";
import { GraphContextProvider } from "../utils/GraphContext";
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { Web3ContextProvider } from '../utils/Web3Context';
import client from '../graphql/cyberconnect/client';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );
  // @ts-ignore
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={client}>
              <Web3ContextProvider>
                <GraphContextProvider>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />
                  <Component {...pageProps} />
                </GraphContextProvider>
              </Web3ContextProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </Provider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp);
