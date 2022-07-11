import { CircularProgress, Divider, Grid, useTheme } from '@mui/material'
import {useXmtp} from '@utils/useXmtp'
import { useCallback, useEffect, useRef } from 'react'
import useConversation from '@utils/useConversation'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

export const MessagePanel = ({ recipientAddress }: { recipientAddress: string }) => {
  const colorTheme = useTheme().palette
  const { walletAddress, client } = useXmtp()
  const messagesEndRef = useRef(null)
  const scrollToMessagesEndRef = useCallback(() => {
    ;(messagesEndRef.current as any)?.scrollIntoView({ behavior: 'smooth' })
  }, [messagesEndRef])
  const { messages, sendMessage, loading } = useConversation(
    recipientAddress,
    scrollToMessagesEndRef
  )

  const hasMessages = messages.length > 0
  useEffect(() => {
    if (!hasMessages) return
    const initScroll = () => {
      scrollToMessagesEndRef()
    }
    initScroll()
  }, [recipientAddress, hasMessages, scrollToMessagesEndRef])

  if (loading && !messages?.length) {
    return (
      <CircularProgress />
    )
  }

  if (!recipientAddress || !walletAddress || !client) {
    return <div />
  }

  return (
    <Grid container direction={'column'} maxHeight={'calc(100vh - 96px)'} minHeight={'calc(100vh - 96px)'} sx={{ overflowY: 'auto', display: 'flex' }}>
      <MessageList
        messagesEndRef={messagesEndRef}
        messages={messages}
        walletAddress={walletAddress}
      />
      {walletAddress && <MessageInput onSend={sendMessage} />}
    </Grid>
  )
}

export default MessagePanel
