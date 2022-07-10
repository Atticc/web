import { Nft } from '@alch/alchemy-web3'
import { Avatar, Stack } from '@mui/material'

export const NftItem = ({ nft, size = 80 }: { nft: Nft | undefined; size?: number }) => {
  if (!nft) {
    return null
  }

  return (
    <Stack>
      <Avatar alt={nft.title} src={nft.metadata?.image || nft.metadata?.image_url} sx={{ width: size, height: size }} />
    </Stack>
  )
}
