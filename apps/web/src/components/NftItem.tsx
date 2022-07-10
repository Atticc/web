import { Nft } from '@alch/alchemy-web3'
import { Avatar, Stack } from '@mui/material'

export const NftItem = ({ nft }: { nft: Nft | undefined }) => {
  if (!nft) {
    return null
  }

  return (
    <Stack>
      <Avatar alt={nft.title} src={nft.metadata?.image} sx={{ width: 80, height: 80 }} />
    </Stack>
  )
}
