import { Nft, NftFilters } from '@alch/alchemy-web3'
import { Divider, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { IOatNft, IPoapNft } from '@app/types'
import { useOATs } from '@req/galaxy/getOATs'
import { POAP } from '@req/poap'
import { isValidAddr } from '@utils/helper'
import { useAlchemy } from '@utils/useAlchemy'
import { PrimaryDarkButton } from '@c/buttons/Buttons'
import NftCollectionModal from '@c/modal/NftCollectionModal'
import { NftItem } from '@c/NftItem'
import { OatItem } from '@c/OatItem'
import { PoapItem } from '@c/PoapItem'

export const NftSection = ({
  title,
  address,
  showMore = false,
}: {
  title?: string
  address: string
  showMore?: boolean
}) => {
  const { alchemy } = useAlchemy()
  const [nfts, setNfts] = useState<{ items: Array<Nft>; totalCount?: number }>({ items: [], totalCount: 0 })
  const [openNFTs, setOpenNFTs] = useState<boolean>(false)
  const { data: oats = {}, refetch: fetchOATs } = useOATs({ address })
  const { data: { data: poaps = [] } = {} } = useQuery(['poap', address], () => POAP.getNFTs({ address }))

  useEffect(() => {
    async function fetchNFTs() {
      try {
        const { ownedNfts, totalCount } = await alchemy.getNfts({ owner: address, filters: [NftFilters.SPAM] })
        setNfts({ items: ownedNfts.filter((n) => !n?.error), totalCount: totalCount })
      } catch (_) {}
      try {
        await fetchOATs()
      } catch (_) {}
    }
    if (isValidAddr(address)) {
      fetchNFTs()
    } else {
      setNfts({ items: [], totalCount: 0 })
    }
  }, [address])

  return !nfts?.items?.length && !poaps.length && !oats?.list?.length ? null : (
    <Grid container direction={'column'} border={1} sx={{ borderRadius: 4, padding: 2 }}>
      <Grid item>
        <Typography marginBottom={1} variant="h5">
          {title}
        </Typography>
        {title ? <Divider /> : null}
      </Grid>
      <Grid item>
        {nfts?.items?.length > 0 ? (
          <Stack direction={'column'} marginTop={3}>
            <Typography marginY={1} variant="h6">
              NFTs({nfts.totalCount})
            </Typography>
            <Stack flexDirection={'row'} gap={3}>
              {nfts?.items?.slice(-3).map((n) => (
                <NftItem nft={n} key={n.id.tokenId} />
              ))}
            </Stack>{' '}
          </Stack>
        ) : null}
        {poaps?.length > 0 ? (
          <Stack direction={'column'} marginTop={3}>
            <Typography marginY={1} variant="h6">
              POAPs({poaps.length})
            </Typography>
            <Stack flexDirection={'row'} gap={3}>
              {poaps?.slice(0, 3).map((p: IPoapNft) => (
                <PoapItem poap={p} key={p.tokenId} />
              ))}
            </Stack>{' '}
          </Stack>
        ) : null}
        {oats?.list?.length > 0 ? (
          <Stack direction={'column'} marginTop={3}>
            <Typography marginY={1} variant="h6">
              OATs({oats?.totalCount})
            </Typography>
            <Stack flexDirection={'row'} gap={3}>
              {oats?.list?.slice(0, 3).map((o: IOatNft) => (
                <OatItem oat={o} key={o.id} />
              ))}
            </Stack>
          </Stack>
        ) : null}
      </Grid>
      {showMore && (nfts?.items?.length > 3 || poaps.length > 3 || oats?.list?.length > 3) ? (
        <Grid item marginTop={3}>
          <PrimaryDarkButton textcontent={'View More'} onClick={() => setOpenNFTs(true)} />
        </Grid>
      ) : null}
      <NftCollectionModal
        nfts={nfts}
        poaps={{ items: poaps || [], totalCount: poaps.length }}
        oats={{ items: oats?.list || [], totalCount: oats?.totalCount }}
        open={openNFTs}
        onClose={() => setOpenNFTs(false)}
      />
    </Grid>
  )
}
