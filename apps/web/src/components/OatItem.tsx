import { Avatar, Stack } from '@mui/material'
import { IOatNft } from '../app/types'

export const OatItem = ({ oat, size = 80 }: { oat: IOatNft | undefined; size?: number }) => {
  if (!oat) {
    return null
  }

  return (
    <Stack>
      <Avatar alt={oat.name} src={oat.image} sx={{ width: size, height: size }} />
    </Stack>
  )
}
