import React from 'react'
import { ColorModeContext } from '@c/layouts/SwitchBox'
import { QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import store from '../store'
import client from '@req/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { getDesignTokens } from '@app/theme'
import { WalletProvider } from '@utils/WalletProvider'
import XmtpProvider from '@utils/XmtpContext'

type AppProps = {
  children?: React.ReactNode
}

function App({ children }: AppProps) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )
  // @ts-ignore
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={client}>
            <WalletProvider>
              <XmtpProvider>
                <div>{children}</div>
              </XmtpProvider>
            </WalletProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </ColorModeContext.Provider>
  )
}

export default App
