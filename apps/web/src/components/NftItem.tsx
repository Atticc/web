import { Nft } from '@alch/alchemy-web3'
import { Avatar, CircularProgress, Stack, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { decodeNftTokenUri, replaceIPFS } from '../utils/helper'

export const NftItem = ({ nft, size = 80 }: { nft: Nft | undefined; size?: number }) => {
  const [show, setShow] = useState(true)
  const [loading, setLoading] = useState(true)
  const [item] = useState(() => {
    return {
      ...nft,
      metadata: !nft?.metadata?.name ? decodeNftTokenUri(nft?.tokenUri?.raw) : nft?.metadata,
    }
  })
  const [metadata] = useState(() => {
    if (!nft?.metadata) {
      return decodeNftTokenUri(nft?.tokenUri?.raw)
    }
    return nft?.metadata
  })
  if (!nft) {
    return null
  }

  const handleError = () => {
    setShow(false)
  }

  const handleLoad = () => {
    setLoading(false)
  }

  return show ? (
    <Stack sx={{ position: 'relative', width: size, height: size }} alignItems={'center'} justifyContent={'center'}>
      <Tooltip
        title={
          <Stack direction={'column'}>
            <Typography>
              {item?.title || item?.metadata?.name} - {parseInt(item?.id?.tokenId || '0x0', 16)}
            </Typography>
            <Typography>{item?.metadata?.description}</Typography>
            <Typography>{JSON.stringify(nft?.tokenUri)}</Typography>
          </Stack>
        }
        arrow
      >
        <Avatar
          variant={'rounded'}
          alt={nft.title}
          src={replaceIPFS(item?.metadata?.image || item?.metadata?.image_url)}
          onLoad={handleLoad}
          sx={{ width: size, height: size }}
          onError={handleError}
        />
      </Tooltip>
      {loading ? (
        <CircularProgress
          sx={{
            position: 'absolute',
          }}
        />
      ) : null}
    </Stack>
  ) : null
}
