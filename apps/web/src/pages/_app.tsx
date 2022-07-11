import Head from 'next/head'
import { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@app/createEmotionCache'

import { appWithTranslation } from 'next-i18next'
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

import dynamic from 'next/dynamic'
import { APP_NAME } from '@app/config'

const AppWithoutSSR = dynamic(() => import('@c/App'), {
  ssr: false,
  suspense: false,
})

const title = `${APP_NAME} - For Crypto Communities`
const description = `We are crypto and NFT enthusiasts with diverse professional backgrounds. We came together for a shared vision - building the best crypto native social media platform for the communities we love.`

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title key="title">{title}</title>
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:image" content="../assets/attic.png" key="og:image" />
      </Head>
      <AppWithoutSSR>
        <CssBaseline />
        <Component {...pageProps} />
      </AppWithoutSSR>
    </CacheProvider>
  )
}

export default appWithTranslation(MyApp)
