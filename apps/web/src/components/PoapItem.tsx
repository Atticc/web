import { Avatar, Stack } from '@mui/material'
import { IPoapNft } from '../app/types'

export const PoapItem = ({ poap }: { poap: IPoapNft | undefined }) => {
  if (!poap) {
    return null
  }

  return (
    <Stack>
      <Avatar alt={poap.event?.name} src={poap.event?.image_url} sx={{ width: 80, height: 80 }} />
    </Stack>
  )
}
