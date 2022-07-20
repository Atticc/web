import { Nft, NftFilters } from '@alch/alchemy-web3'
import { Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { IOatNft, IPoapNft } from '@app/types'
import { useOATs } from '@req/galaxy/getOATs'
import { POAP } from '@req/poap'
import { isValidAddr } from '@utils/helper'
import { useAlchemy } from '@utils/useAlchemy'
import NftCollectionModal from '@c/modal/NftCollectionModal'
import { NftItem } from '@/components/NFT/NftItem'
import { OatItem } from '@/components/NFT/OatItem'
import { PoapItem } from '@/components/NFT/PoapItem'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { NODE_ENV } from '@app/config'

const TypeSection = ({
  children,
  label,
  height = 360,
}: {
  label: string
  children: Array<JSX.Element>
  height?: number
}) => {
  const [show, setShow] = useState(false)

  return (
    <Grid item sx={{ overflowX: 'hidden' }} pb={3}>
      <Grid container direction={'row'} justifyContent={'space-between'} mb={1.5} alignItems={'center'}>
        <Grid item>
          <Typography variant="h4">{label}</Typography>
        </Grid>
        <Grid item>
          <Button variant={'icon'} color={'primary'} size={'large'} onClick={() => setShow(!show)}>
            {show ? <RemoveCircleIcon fontSize="large" /> : <AddCircleIcon fontSize="large" />}
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        maxWidth={1}
        direction={'row'}
        gap={4}
        wrap={'wrap'}
        maxHeight={show ? undefined : height}
        overflow={'hidden'}
        px={0.1}
        pb={1}
      >
        {children}
      </Grid>
    </Grid>
  )
}

export const NftSection = ({ address }: { address: string }) => {
  const { alchemy } = useAlchemy()
  const [nfts, setNfts] = useState<{ items: Array<Nft>; totalCount?: number }>({ items: [], totalCount: 0 })
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
      NODE_ENV !== 'development' && fetchNFTs() 
    } else {
      setNfts({ items: [], totalCount: 0 })
    }
  }, [address, fetchOATs])

  return !nfts?.items?.length && !poaps.length && !oats?.list?.length ? null : (
    <Grid container direction={'column'} width={1}>
      {nfts?.items?.length > 0 ? (
        <TypeSection label={'NFTS'} height={740}>
          {nfts?.items?.map((n) => (
            <NftItem nft={n} key={n.id.tokenId} />
          ))}
        </TypeSection>
      ) : null}
      {poaps?.length > 0 ? (
        <TypeSection label={'POAPS'}>
          {poaps?.map((p: IPoapNft) => (
            <PoapItem poap={p} key={p.tokenId} />
          ))}
        </TypeSection>
      ) : null}
      {oats?.list?.length > 0 ? (
        <TypeSection label={'OATS'}>
          {oats?.list?.map((o: IOatNft) => (
            <OatItem oat={o} key={o.id} />
          ))}
        </TypeSection>
      ) : null}
    </Grid>
  )
}

export default NftSection
