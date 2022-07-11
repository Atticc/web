import Head from 'next/head'
import { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@app/createEmotionCache'

import { appWithTranslation } from 'next-i18next'
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

import dynamic from 'next/dynamic'

const AppWithoutSSR = dynamic(() => import('@c/App'), {
  ssr: false,
})

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppWithoutSSR>
        <CssBaseline />
        <Component {...pageProps} />
      </AppWithoutSSR>
    </CacheProvider>
  )
}

export default appWithTranslation(MyApp)
