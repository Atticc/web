import { Avatar, CircularProgress, Stack, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { IOatNft } from '../app/types'

export const OatItem = ({ oat, size = 80 }: { oat: IOatNft | undefined; size?: number }) => {
  const [show, setShow] = useState(true)
  const [loading, setLoading] = useState(true)
  if (!oat) {
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
            <Typography>{oat?.name}</Typography>
            <Typography>{oat?.description}</Typography>
          </Stack>
        }
        arrow
      >
        <Avatar
          variant={'rounded'}
          alt={oat.name}
          src={oat.image}
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
