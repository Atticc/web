import { Nft, NftFilters } from '@alch/alchemy-web3'
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { IOatNft, IPoapNft } from '@app/types'
import { useOATs } from '@req/galaxy/getOATs'
import { POAP } from '@req/poap'
import { isValidAddr } from '@utils/helper'
import { useAlchemy } from '@utils/useAlchemy'
import { NftItem } from '@/components/NFT/NftItem'
import { OatItem } from '@/components/NFT/OatItem'
import { PoapItem } from '@/components/NFT/PoapItem'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { NODE_ENV } from '@app/config'
import TOKENS, { IToken } from '@app/token'

const TypeSection = ({
  children,
  label,
  height = 360,
}: {
  label: string
  children: Array<JSX.Element> | JSX.Element
  height?: number | string
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
  const color = useTheme().palette
  const { alchemy } = useAlchemy()
  const [loading, setLoading] = useState(false)
  const [tokens, setTokens] = useState<Array<IToken>>([])
  const [nfts, setNfts] = useState<{ items: Array<Nft>; totalCount?: number }>({ items: [], totalCount: 0 })
  const { data: oats = {}, refetch: fetchOATs, isLoading: oatLoading, isFetching: oatFetching } = useOATs({ address })
  const {
    data: { data: poaps = [] } = {},
    isLoading: poapLoading,
    isFetching: poapFetching,
  } = useQuery(['poap', address], () => POAP.getNFTs({ address }))

  useEffect(() => {
    async function fetchNFTs() {
      try {
        setLoading(true)
        try {
          const { ownedNfts, totalCount } = await alchemy.getNfts({ owner: address, filters: [NftFilters.SPAM] })
          setNfts({ items: ownedNfts.filter((n) => !n?.error), totalCount: totalCount })
        } catch (_) { }
        try {
          await fetchOATs()
        } catch (_) { }
        try {
          console.log('fetching balances')
          // @ts-ignore
          const { tokenBalances = [] } = await alchemy.getTokenBalances(address, 'DEFAULT_TOKENS')
          const availablesTokens = tokenBalances.filter((token) => token.tokenBalance !== '0') || []

          const balances: Array<IToken> = availablesTokens?.map((aval) => {
            let balance: number = Number(aval.tokenBalance)
            const contract: IToken = TOKENS?.[(aval.contractAddress as string) || ''] || {}
            balance = balance / Math.pow(10, contract?.decimals || 18)
            return { ...contract, balance: balance }
          })

          setTokens(balances || [])
        } catch (_) {}
      } catch (_) {
      } finally {
        setLoading(false)
      }
    }
    if (isValidAddr(address)) {
      fetchNFTs()
      // NODE_ENV !== 'development' && fetchNFTs()
    } else {
      setNfts({ items: [], totalCount: 0 })
    }
  }, [address, fetchOATs])

  return (
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
      {loading || poapLoading || poapFetching || oatLoading || oatFetching ? (
        <CircularProgress size={100} color="primary" />
      ) : null}
      {oats?.list?.length > 0 ? (
        <TypeSection label={'OATS'}>
          {oats?.list?.map((o: IOatNft) => (
            <OatItem oat={o} key={o.id} />
          ))}
        </TypeSection>
      ) : null}
      {tokens?.length > 0 ? (
        <TypeSection label={'TOKENS'} height={undefined}>
          <TableContainer component={Paper}>
            <Table aria-label="owned token table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5" color={color.lightGray.main}>
                      Token
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h5" color={color.lightGray.main}>
                      Balance
                    </Typography>
                  </TableCell>
                  {/* <TableCell align="right"><Typography variant="h5" color={color.lightGray.main}>Amount</Typography></TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {tokens.map((row: IToken) => (
                  <TableRow key={row?.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Stack direction={'row'} alignItems={'center'}>
                        <Avatar src={row.logo} sx={{ height: 32, width: 32 }} />
                        <Typography variant="bodyBold1" pl={1}>
                          {row.name}{' '}
                          <Typography variant="body1" component={'span'}>
                            ({row.symbol})
                          </Typography>
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="bodyBold1">
                        {Number(row.balance).toFixed(6)} {row.symbol}
                      </Typography>
                    </TableCell>
                    {/* <TableCell align="right"><Typography variant='bodyBold1'>0</Typography></TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TypeSection>
      ) : null}
      {!oats?.list?.length &&
      !poaps?.length &&
      !nfts?.items?.length &&
      !oatLoading &&
      !poapLoading &&
      !loading &&
      !oatFetching &&
      !poapFetching ? (
        <Stack direction="column" alignItems={'center'}>
          <Typography variant="h4">No Collection Found.</Typography>
        </Stack>
      ) : null}
    </Grid>
  )
}

export default NftSection
