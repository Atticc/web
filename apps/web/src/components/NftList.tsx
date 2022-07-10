import { Nft } from '@alch/alchemy-web3'
import { Divider, Grid, Typography } from '@mui/material'
import { IOatNft, IPoapNft } from '../app/types'
import { NftType } from './modal/NftCollectionModal'
import { NftItem } from './NftItem'
import { OatItem } from './OatItem'
import { PoapItem } from './PoapItem'

export const NftList = ({
  title,
  data,
  tab,
}: {
  title?: string
  tab: NftType
  data: Array<Nft | IPoapNft | IOatNft>
}) => {
  return (
    <Grid container direction={'column'} sx={{ borderRadius: 2, paddingX: 2, paddingY: 2 }}>
      <Grid item>
        <Typography marginBottom={1} variant="h5">
          {title}
        </Typography>
        {title ? <Divider /> : null}
      </Grid>
      <Grid container direction={'row'} flexWrap={'wrap'} gap={2}>
        {data?.map((item) =>
          tab === NftType.nfts ? (
            <NftItem key={(item as Nft).id.tokenId} nft={item as Nft} size={148} />
          ) : tab === NftType.poaps ? (
            <PoapItem poap={item as IPoapNft} key={(item as IPoapNft).tokenId} size={148} />
          ) : (
            <OatItem oat={item as IOatNft} key={(item as IOatNft).id} size={120} />
          )
        )}
      </Grid>
    </Grid>
  )
}
