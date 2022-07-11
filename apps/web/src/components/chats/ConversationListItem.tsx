import { CircularProgress, Grid, Stack, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { formatDate, truncate } from '@utils/helper'
import { Message } from '@xmtp/xmtp-js'
import { Conversation } from '@xmtp/xmtp-js/dist/types/src/conversations'
import ProfileImage from '@c/users/Avatar'
import Address from '@c/users/Address'
import useConversation from '@utils/useConversation'
import useEns from '@utils/useEns'

type ConversationListItemProps = {
  conversation: Conversation
  isSelected: boolean
  onClick?: () => void
}

const getLatestMessage = (messages: Message[]): Message | null =>
  messages.length ? messages[messages.length - 1] : null

export const ConversationListItem = ({ conversation, isSelected }: ConversationListItemProps) => {
  const colorTheme = useTheme().palette
  const { loading: isLoadingEns } = useEns(conversation.peerAddress)
  const { messages, loading: isLoadingConversation } = useConversation(conversation.peerAddress)

  if (!conversation) {
    return null
  }

  const loading = isLoadingEns || isLoadingConversation
  const latestMessage = getLatestMessage(messages)

  return (
    <Link href={`/chats/${conversation.peerAddress}`} passHref>
      <Grid
        item
        sx={{
          filter: isSelected ? 'opacity(0.6)' : '',
          borderRadius: 3,
          border: 0.2,
          borderColor: colorTheme.dark.main,
          margin: 1,
          cursor: 'pointer',
          ':hover': {
            filter: 'opacity(0.8)',
          },
          paddingY: 2,
          paddingX: 1,
        }}
      >
        {loading
          ? <CircularProgress />
          : <Stack direction={'row'} alignItems={'center'}>
            <ProfileImage address={conversation.peerAddress} />
            <Address address={conversation?.peerAddress || ''} />
          </Stack>}
          {latestMessage ? 
          <Typography variant='body2'paddingTop={1} paddingLeft={1}>
            {formatDate(latestMessage?.sent)}{`: `}
            {truncate(latestMessage.content, 55)}
          </Typography>
          : null}
      </Grid>
    </Link>
  )
}

export default ConversationListItem
