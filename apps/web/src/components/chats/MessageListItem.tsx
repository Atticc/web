import { Avatar, Chip, Grid, Stack, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { formatAddress, formatTime } from '@utils/helper'
import { Message } from '@xmtp/xmtp-js'
import ProfileImage from '@c/users/Avatar'
import Address from '@c/users/Address'
import useWallet from '@utils/useWallet'

type MessageListItemProps = {
  message: Message
  isSender: boolean
}

export const MessageListItem = ({ isSender, message }: MessageListItemProps) => {
  const colorTheme = useTheme().palette
  const { address } = useWallet()

  if (!message) {
    return null
  }

  return (
    <Stack direction={isSender ? 'row-reverse' : 'row'} paddingY={2}>
      <ProfileImage address={message.senderAddress as string} />
      <Stack direction={'column'}>
        <Stack direction={isSender ? 'row-reverse' : 'row'}>
          {isSender ? (
            <Typography paddingX={1} variant="body1">
              Me
            </Typography>
          ) : (
            <Address address={message.senderAddress || ''} variant={'body1'} />
          )}
          <Chip label={formatTime(message.sent)} variant="outlined" size="small" />
        </Stack>
        <Typography textAlign={isSender ? 'right' : 'left'} paddingX={1}>
          {
            message.error ? `Error: ${message.error?.message}` : message.content // <Emoji text={message.content || ''} />
          }
        </Typography>
      </Stack>
    </Stack>
  )
}

export default MessageListItem
