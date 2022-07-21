import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, InputAdornment, InputAdornmentProps, Stack, TextField, useTheme } from '@mui/material'
import useEns from '@utils/useEns'
import styled from '@emotion/styled'
import FilterIcon from '@mui/icons-material/Filter'
import useWallet from '@utils/useWallet'
import ProfileImage from '@c/users/Avatar'
import SendIcon from '@mui/icons-material/Send'
import { createComment } from '@req/atticc/comments'

const EndAdornment = styled(InputAdornment)<InputAdornmentProps>({
  flexDirection: 'row',
})

type CommentInputProps = {
  onSend: (msg: string) => Promise<void>
  postId: string
}

const CommentInput = ({ onSend, postId }: CommentInputProps): JSX.Element => {
  const [message, setMessage] = useState('')
  const [image, setImage] = useState(null)
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
      await createComment({ address: address as string, message, imageUrl: image, postId })
      await onSend(message)
      setMessage('')
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
        type="text"
        label={`Comments`}
        placeholder="Write a comment..."
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
