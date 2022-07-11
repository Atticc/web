import type { GetServerSideProps, NextPage } from 'next'
import LayoutWithoutFooter from '@c/layouts/LayoutWithoutFooter'
import { useCallback, useEffect, useRef } from 'react'
import { Grid, Stack, Typography, useTheme } from '@mui/material'
import { getIdentity, useIdentity } from '@req/cyberconnect/queries/getIdentity'
import { isValidAddr, formatAddress } from '@utils/helper'
import Head from 'next/head'
import { APP_NAME } from '@app/config'
import { IUser } from '@app/constants'
import ConversationPanel from '@c/chats/ConversationPanel'
import useXmtp from '@utils/useXmtp'
import useWallet from '@utils/useWallet'
import { PrimaryDarkButton } from '@c/buttons/Buttons'

interface UserDetailProps {
  contactAddress: string
  userData: IUser
}

const ChatDetailsPage: NextPage<UserDetailProps> = ({ contactAddress, userData }) => {
  const colorTheme = useTheme().palette
  const { data: contactUser, refetch } = useIdentity({ address: contactAddress, data: userData })
  const title = `${contactAddress ? `${contactUser?.domain}(${formatAddress(contactAddress)}) - `: ''}${APP_NAME} Chats`
  const { connect: connectXmtp, disconnect: disconnectXmtp, client } = useXmtp()
  const { signer, connect: connectWallet } = useWallet()

  useEffect(() => {
    refetch()
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
    if(!signer) {
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

    return () => disconnectXmtp()
  }, [signer, prevSigner, connectXmtp, disconnectXmtp])

  const renderMessages = () => {
    return null
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
        <Grid container direction={'row'} columnSpacing={3} paddingX={5} marginTop={2}>
          <Grid item xs={12} md={3}>
            <Grid container direction={'column'} alignItems={'center'} maxWidth={320}>
              <ConversationPanel onConnect={handleConnect} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container direction={'column'} alignItems={'center'}>
              {contactUser?.address ? renderMessages() : renderEmpty()}
            </Grid>
          </Grid>
        </Grid>
      </LayoutWithoutFooter>
  )
}

export default ChatDetailsPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params = [] } = context.query
  const contactAddress = params?.[0] || ''
  let userData: IUser = { address: contactAddress }

  try {
    if (contactAddress) {
      if (isValidAddr(String(contactAddress))) {
        userData = await getIdentity(String(contactAddress))
        if (!userData?.address) {
          throw new Error('ERR_FETCH_WALLET_ADDRESS_FAILED')
        }
      } else {
        throw new Error('ERR_WALLET_ADDRESS_PATH_INCORRECT')
      }
    }
  } catch (err: any) {
    console.warn(err.message)
    return {
      redirect: {
        destination: '/chats/',
        permanent: true,
      },
      props: {
        contactAddress: '',
        userData: {},
      },
    }
  }

  return {
    props: { contactAddress, userData },
  }
}
