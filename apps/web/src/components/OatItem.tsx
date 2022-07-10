import { Avatar, Stack } from '@mui/material'
import { IOatNft } from '../app/types'

export const OatItem = ({ oat }: { oat: IOatNft | undefined }) => {
  if (!oat) {
    return null
  }

  return (
    <Stack>
      <Avatar alt={oat.name} src={oat.image} sx={{ width: 80, height: 80 }} />
    </Stack>
  )
}
