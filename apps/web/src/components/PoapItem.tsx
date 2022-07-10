import { Avatar, Stack } from '@mui/material'
import { IPoapNft } from '../app/types'

export const PoapItem = ({ poap, size = 80 }: { poap: IPoapNft | undefined; size?: number }) => {
  if (!poap) {
    return null
  }

  return (
    <Stack>
      <Avatar alt={poap.event?.name} src={poap.event?.image_url} sx={{ width: size, height: size }} />
    </Stack>
  )
}
