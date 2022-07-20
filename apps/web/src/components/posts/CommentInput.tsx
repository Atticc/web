import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, InputAdornment, InputAdornmentProps, Stack, TextField, useTheme } from '@mui/material'
import useEns from '@utils/useEns'
import styled from '@emotion/styled'
import FilterIcon from '@mui/icons-material/Filter'
import useWallet from '@utils/useWallet'
import ProfileImage from '@c/users/Avatar'
import SendIcon from '@mui/icons-material/Send'

const EndAdornment = styled(InputAdornment)<InputAdornmentProps>({
  flexDirection: 'row',
})

type CommentInputProps = {
  onSend: (msg: string) => Promise<void>
}

const CommentInput = ({ onSend }: CommentInputProps): JSX.Element => {
  const [message, setMessage] = useState('')
  const router = useRouter()
  const { address } = useWallet()
  const { avatarUrl } = useEns(address)
  const color = useTheme().palette

  useEffect(() => setMessage(''), [router.query.recipientWalletAddr])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleUploadImage = () => {}

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!message) {
        return
      }
      setMessage('')
      await onSend(message)
    },
    [onSend, message]
  )
  if (!address) {
    return <></>
  }

  return (
    <Stack
      component="form"
      autoComplete="off"
      onSubmit={onSubmit}
      bgcolor={color.white.main}
      py={2}
      borderRadius={4}
      flexDirection={'row'}
      alignItems={'center'}
    >
      <ProfileImage src={avatarUrl} address={address} sx={{ height: 70, width: 70 }} />
      <TextField
        multiline
        type="text"
        label={`Comments`}
        placeholder="Write a comment..."
        minRows={1}
        maxRows={4}
        name="message"
        value={message}
        onChange={handleChange}
        fullWidth
        sx={{ pl: 1, borderRadius: '20px' }}
        InputProps={{
          endAdornment: (
            <EndAdornment position="end">
              <Button onClick={handleUploadImage} variant={'icon'} size={'small'}>
                <FilterIcon fontSize={'small'} />
              </Button>
              <Button type={'submit'} disabled={!message} variant={'icon'} size={'small'} sx={{ pl: 1 }}>
                <SendIcon fontSize={'small'} />
              </Button>
            </EndAdornment>
          ),
        }}
      />
    </Stack>
  )
}

export default CommentInput
