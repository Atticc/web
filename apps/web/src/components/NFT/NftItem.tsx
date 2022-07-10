import { Nft } from '@alch/alchemy-web3'
import { Avatar, CircularProgress, Stack, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { decodeNftTokenUri, replaceIPFS } from '@utils/helper'
import { useEffect } from 'react'

export const NftItem = ({ nft, size = 80 }: { nft: Nft | undefined; size?: number }) => {
  const [show, setShow] = useState(true)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState<number | undefined>(undefined)
  const [item] = useState(() => {
    return {
      ...nft,
      metadata: !nft?.metadata?.name ? decodeNftTokenUri(nft?.tokenUri?.raw) : nft?.metadata,
    }
  })

  useEffect(() => {
    setId(parseInt(item?.id?.tokenId || '0x0', 16))
  }, [item])

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      if (loading === true) {
        setShow(false)
      }
    }, 10_000)

    return () => {
      clearTimeout(loaderTimer)
    }
  }, [loading])

  const handleError = () => {
    setShow(false)
  }

  const handleLoad = () => {
    setLoading(false)
  }

  if (!nft) {
    return null
  }

  return show ? (
    <Stack sx={{ position: 'relative', width: size, height: size }} alignItems={'center'} justifyContent={'center'}>
      <Tooltip
        followCursor
        title={
          <Stack direction={'column'}>
            <Typography variant="h6">
              {item?.title || item?.metadata?.name}
              {id && id < 999_999_999_999 ? ` - ${id}` : ''}
            </Typography>
            <Typography variant="body1">{item?.metadata?.description}</Typography>
            {loading ? <Typography>{JSON.stringify(nft?.tokenUri)}</Typography> : null}
          </Stack>
        }
        arrow
      >
        <Avatar
          variant={'rounded'}
          alt={nft.title}
          src={replaceIPFS(item?.media?.[0]?.gateway || item?.metadata?.image || item?.metadata?.image_url)}
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
