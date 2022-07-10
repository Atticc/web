import { Nft } from '@alch/alchemy-web3'
import { Divider, Grid, Stack, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { IOatNft, IPoapNft } from '../app/types'
import { useOATs } from '../graphql/galaxy/getOATs'
import { POAP } from '../graphql/poap'
import { isValidAddr } from '../utils/helper'
import { useAlchemy } from '../utils/useAlchemy'
import { PrimaryDarkButton } from './buttons/Buttons'
import NftCollectionModal from './modal/NftCollectionModal'
import { NftItem } from './NftItem'
import { PoapItem } from './PoapItem'

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
  const [nfts, setNfts] = useState<Array<Nft>>([])
  const [openNFTs, setOpenNFTs] = useState<boolean>(false)
  const { data: { data: oats = {} } = {}, refetch: fetchOATs } = useOATs({ address })
  const { data: { data: poaps = [] } = {} } = useQuery(['poap', address], () => POAP.getNFTs({ address }))
  const colorTheme = useTheme().palette

  useEffect(() => {
    async function fetchNFTs() {
      try {
        const { ownedNfts } = await alchemy.getNfts({ owner: address })
        setNfts(ownedNfts)
      } catch (_) {}
      try {
        await fetchOATs()
      } catch (_) {}
    }
    if (isValidAddr(address)) {
      fetchNFTs()
    } else {
      setNfts([])
    }
  }, [address])

  return !nfts.length && !poaps.length && !oats?.list?.length ? null : (
    <Grid container direction={'column'} border={1} sx={{ borderRadius: 2, paddingX: 1, paddingY: 1 }} spacing={1}>
      <Grid item>
        <Typography marginBottom={1} variant="h5">
          {title}
        </Typography>
        {title ? <Divider /> : null}
      </Grid>
      <Grid item>
        {nfts.length > 0 ? (
          <Stack direction={'column'}>
            <Typography marginY={1} variant="h6">
              NFTs({nfts.length})
            </Typography>
            <Stack flexDirection={'row'} gap={3}>
              {nfts.slice(0, 3).map((n) => (
                <NftItem nft={n} key={n.id.tokenId} />
              ))}
            </Stack>{' '}
          </Stack>
        ) : null}
        {poaps?.length > 0 ? (
          <Stack direction={'column'}>
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
          <Stack direction={'column'}>
            <Typography marginY={1} variant="h6">
              OATs({oats.totalCount})
            </Typography>
            <Stack flexDirection={'row'} gap={3}>
              {oats?.list?.slice(0, 3).map((n: IOatNft) => (
                <Stack direction={'column'} key={n.id}>
                  <Typography>{n.name}</Typography>
                </Stack>
              ))}
            </Stack>{' '}
          </Stack>
        ) : null}
      </Grid>
      {showMore && (nfts.length > 3 || poaps.length > 3 || oats?.list?.length > 3) ? (
        <Grid item>
          <PrimaryDarkButton textcontent={'View More'} onClick={() => setOpenNFTs(true)} />
        </Grid>
      ) : null}
      <NftCollectionModal
        nfts={nfts}
        poaps={poaps}
        oats={oats?.list || []}
        open={openNFTs}
        onClose={() => setOpenNFTs(false)}
      />
    </Grid>
  )
}
