import { Avatar, CircularProgress, Stack, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { IPoapNft } from '../../app/types'

export const PoapItem = ({ poap, size = 80 }: { poap: IPoapNft | undefined; size?: number }) => {
  const [show, setShow] = useState(true)
  const [loading, setLoading] = useState(true)
  if (!poap) {
    return null
  }

  const handleError = () => {
    setShow(false)
  }

  const handleLoad = () => {
    setLoading(false)
  }

  return show ? (
    <Stack sx={{ position: 'relative', width: size, height: size }} alignItems={'center'} justifyContent={'center'}>
      <Tooltip
        title={
          <Stack direction={'column'}>
            <Typography>{poap.event?.name}</Typography>
            <Typography>{poap.event?.description}</Typography>
          </Stack>
        }
        arrow
      >
        <Avatar
          variant={'rounded'}
          alt={poap.event.name}
          src={poap.event.image_url}
          onLoad={handleLoad}
          sx={{ width: size, height: size }}
          onError={handleError}
        />
      </Tooltip>
      {loading ? (
        <CircularProgress
          sx={{
            position: 'absolute',
          }}
        />
      ) : null}
    </Stack>
  ) : null
}
