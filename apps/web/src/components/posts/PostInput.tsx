import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, InputAdornment, InputAdornmentProps, TextField, useTheme } from '@mui/material'
import useEns from '@utils/useEns'
import styled from '@emotion/styled'
import FilterIcon from '@mui/icons-material/Filter'
import { createPost } from '@req/atticc/posts'

const EndAdornment = styled(InputAdornment)<InputAdornmentProps>({
  alignSelf: 'flex-end',
  paddingBottom: 10,
  flexDirection: 'column',
})

type PostInputProps = {
  onSend: (msg: string) => Promise<void>
  authedAddress: string
  line?: number
}

const PostInput = ({ onSend, authedAddress, line = 4 }: PostInputProps): JSX.Element => {
  const [message, setMessage] = useState('')
  const [image, setImage] = useState(null)
  const router = useRouter()
  const color = useTheme().palette
  const { name = '' } = useEns(authedAddress)

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
      await createPost({ address: authedAddress, description: message, imageUrl: image })
      await onSend(message)
      setMessage('')
      setImage(null)
    },
    [onSend, message]
  )
  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={onSubmit}
      bgcolor={color.white.main}
      px={4.5}
      py={5.5}
      borderRadius={4}
    >
      <TextField
        multiline
        type="text"
        label={`What's new${name ? `, ${name}` : ''}?`}
        placeholder="Type your thoughts..."
        minRows={line}
        maxRows={8}
        name="message"
        value={message}
        onChange={handleChange}
        fullWidth
        sx={{ borderRadius: '20px' }}
        InputProps={{
          endAdornment: (
            <EndAdornment position="end">
              <Button onClick={handleUploadImage} variant={'icon'} size={'small'}>
                <FilterIcon fontSize={'small'} />
              </Button>
            </EndAdornment>
          ),
        }}
      />
      <Button fullWidth variant={'fill'} sx={{ mt: 2 }} type={'submit'} disabled={!message}>
        Post
      </Button>
    </Box>
  )
}

export default PostInput
