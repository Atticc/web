import type { NextPage } from 'next'
import LayoutWithoutFooter from '@c/layouts/LayoutWithoutFooter'
import { useCallback, useEffect, useRef } from 'react'
import { Grid, Stack, Typography, useTheme } from '@mui/material'
import Head from 'next/head'
import { APP_NAME } from '@app/config'
import useXmtp from '@utils/useXmtp'
import useWallet from '@utils/useWallet'
import { PrimaryDarkButton } from '@c/buttons/Buttons'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const MessagePanel = dynamic(() => import('@c/chats/MessagePanel'), {
  ssr: false,
  suspense: false
})

const ConversationPanel = dynamic(() => import('@c/chats/ConversationPanel'), {
  ssr: false,
  suspense: false
})

const ChatDetailsPage: NextPage = () => {
  const colorTheme = useTheme().palette
  const router = useRouter()
  const { params = [] } = router.query
  const contactAddress = params?.[0] || ''
  const title = `${APP_NAME} Chats`
  const { connect: connectXmtp, disconnect: disconnectXmtp, client } = useXmtp()
  const { signer, connect: connectWallet } = useWallet()

  const checkIfOnNetwork = useCallback(
    async (address: string): Promise<boolean> => {
      return client?.canMessage(address) || false
    },
    [client]
  )

  useEffect(() => {
    async function check() {
      if (await checkIfOnNetwork(contactAddress)) {
      } else {
        router.replace('/chats/')
      }
    }

    check()
  }, [contactAddress])

  const usePrevious = <T,>(value: T): T | undefined => {
    const ref = useRef<T>()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }
  const prevSigner = usePrevious(signer)

  const handleConnect = useCallback(async () => {
    if (!signer) {
      await connectWallet()
    } else {
      await connectXmtp(signer)
    }
  }, [connectWallet, connectXmtp])

  useEffect(() => {
    if (!signer && prevSigner) {
      disconnectXmtp()
    }
    if (!signer || signer === prevSigner) return
    const connect = async () => {
      const prevAddress = await prevSigner?.getAddress()
      const address = await signer.getAddress()
      if (address === prevAddress) return
      connectXmtp(signer)
    }
    connect()
  }, [signer, prevSigner, connectXmtp, disconnectXmtp])

  const renderMessages = () => {
    return <MessagePanel recipientAddress={contactAddress} key={contactAddress} />
  }
  const renderEmpty = () => {
    return (
      <Stack alignItems={'center'}>
        <Typography variant="h4">Select a conversation</Typography>
        <Typography variant="body2">Start a new conversation</Typography>
        {!client ? <PrimaryDarkButton textcontent='Connect' onClick={handleConnect} /> : null}
      </Stack>
    )
  }

  return (
    <LayoutWithoutFooter>
      <Head>
        <title key="title">{title}</title>
        <meta property="og:title" content={title} key="og:title" />
      </Head>
      <Grid container direction={'row'} columnSpacing={3} paddingX={5} marginTop={2} >
        <Grid item xs={12} md={3}>
          <Grid container direction={'column'} alignItems={'center'} maxWidth={320} >
            <ConversationPanel onConnect={handleConnect} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container direction={'column'} alignItems={'center'}>
            {contactAddress ? renderMessages() : renderEmpty()}
          </Grid>
        </Grid>
      </Grid>
    </LayoutWithoutFooter>
  )
}

export default ChatDetailsPage
