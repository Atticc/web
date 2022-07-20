import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Chip,
  colors,
  Grid,
  InputAdornment,
  InputAdornmentProps,
  TextField,
  useTheme,
  withStyles,
} from '@mui/material'
import useEns from '@utils/useEns'
import styled from '@emotion/styled'
import FilterIcon from '@mui/icons-material/Filter'

const EndAdornment = styled(InputAdornment)<InputAdornmentProps>({
  alignSelf: 'flex-end',
  paddingBottom: 10,
  flexDirection: 'column',
})

type PostInputProps = {
  onSend: (msg: string) => Promise<void>
  authedAddress: string
}

const PostInput = ({ onSend, authedAddress }: PostInputProps): JSX.Element => {
  const [message, setMessage] = useState('')
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
      setMessage('')
      await onSend(message)
    },
    [onSend, message]
  )
  return (
    <Grid item py={3} width={'100%'}>
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
          minRows={4}
          maxRows={10}
          name="message"
          value={message}
          onChange={handleChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <EndAdornment position="end">
                <Button onClick={handleUploadImage} variant={'icon'} size={'small'}>
                  <FilterIcon fontSize={'small'} />
                </Button>
                {/* <Chip label={'Send'} clickable component="button" disabled={!message} type={'submit'} /> */}
              </EndAdornment>
            ),
          }}
        />
        <Button fullWidth variant={'fill'} sx={{ mt: 2 }} type={'submit'} disabled={!message}>
          Post
        </Button>
      </Box>
    </Grid>
  )
}

export default PostInput
