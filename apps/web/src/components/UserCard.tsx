import { ConnectionType } from '@cyberlab/cyberconnect'
import { Avatar, Grid, Stack, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IUser } from '../app/constants'
import { useFollowStatus } from '../graphql/cyberconnect/queries/getFollowStatus'
import { formatAddress, isSameAddr } from '../utils/helper'
import { useWeb3 } from '../utils/Web3Context'
import { PrimaryDarkButton } from './buttons/Buttons'
import UserConnectionModal from './modal/UserConnectionModal'

export const UserCard = ({ user, isDetail = false }: { user: IUser; isDetail?: boolean }) => {
  const [showConnection, setShowConnection] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(false)
  const { address, cyberConnect } = useWeb3()

  const handleFetchFollowStatusResult = (data: any) => {
    setIsFollowing(data?.isFollowing)
  }

  const { data: followStatus, refetch: refetchFollowStatus } = useFollowStatus({
    fromAddr: address,
    toAddr: user.address,
    onSuccess: handleFetchFollowStatusResult,
  })
  const colorTheme = useTheme().palette

  if (!user) {
    return null
  }

  const onFollow = async () => {
    try {
      setLoading(true)
      isFollowing
        ? await cyberConnect?.disconnect(user?.address, '')
        : await cyberConnect?.connect(user?.address, '', ConnectionType.FOLLOW)
      await refetchFollowStatus()
    } catch (err: any) {
      console.warn(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (address && user.address) {
      refetchFollowStatus()
    }
  }, [user.address, address])

  if (isDetail) {
    return (
      <Grid container direction={'column'}>
        <Grid item sx={{ borderRadius: 3, border: 0.5, paddingX: 2, paddingY: 3 }}>
          <Stack direction={'column'} alignItems={'center'}>
            <Stack direction={'row'} alignItems={'center'} paddingBottom={2}>
              <Avatar variant="circular" src={user?.avatar || user?.twitter?.avatar || ''} />
              <Stack direction={'column'} paddingLeft={1}>
                <Typography variant="h5">{user?.domain || null}</Typography>
                <Typography variant="body1">{formatAddress(user?.address)}</Typography>
              </Stack>
            </Stack>
            {user?.twitter?.handle ? <Stack alignItems={'center'} paddingBottom={2}> 
                <Typography variant="body1" >
                  Twitter
                </Typography>
              <a href={`https://twitter.com/${user?.twitter?.handle}`} target="_blank">
                <Typography variant="body1" >
                  {user.twitter.handle}
                </Typography>
              </a>
            </Stack>: null }
            <Stack
              direction={'row'}
              spacing={3}
              onClick={() => setShowConnection(true)}
              sx={{
                cursor: 'pointer',
                ':hover': {
                  filter: 'opacity(0.8)',
                },
              }}
            >
              <Stack direction={'column'} alignItems={'center'}>
                <Typography variant="body1">Follower</Typography>
                <Typography variant="h6">{user?.followerCount || 0}</Typography>
              </Stack>
              <Stack direction={'column'} alignItems={'center'}>
                <Typography variant="body1">Following</Typography>
                <Typography variant="h6">{user?.followingCount || 0}</Typography>
              </Stack>
            </Stack>
            {address && !isSameAddr(address, user.address) ? (
              <PrimaryDarkButton
                textcontent={loading ? 'loading...' : isFollowing ? 'Followed' : 'Follow'}
                onClick={onFollow}
              />
            ) : null}
          </Stack>
        </Grid>
        <UserConnectionModal address={user.address} open={showConnection} onClose={() => setShowConnection(false)} />
      </Grid>
    )
  }

  return (
    <Grid
      item
      sx={{
        borderRadius: 3,
        border: 0.5,
        paddingX: 2,
        paddingY: 3,
        cursor: 'pointer',
        height: 200,
        width: 320,
      }}
    >
      <Link href={`/users/${user.address}`}>
        <Stack direction={'column'} alignItems={'center'}>
          <Stack direction={'row'} alignItems={'center'} paddingBottom={2}>
            <Avatar variant="circular" src={user?.avatar || user?.twitter?.avatar || ''} />
            <Stack direction={'column'} paddingLeft={1}>
              <Typography variant="h5">{user?.domain || null}</Typography>
              <Typography variant="body1">{formatAddress(user?.address)}</Typography>
            </Stack>
          </Stack>
          <Stack
            direction={'row'}
            spacing={3}
            onClick={() => setShowConnection(true)}
            sx={{
              cursor: 'pointer',
              ':hover': {
                filter: 'opacity(0.8)',
              },
            }}
          >
            <Stack direction={'column'} alignItems={'center'}>
              <Typography variant="body1">Follower</Typography>
              <Typography variant="h6">{user?.followerCount || 0}</Typography>
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="body2">{user?.recommendationReason}</Typography>
          </Stack>
        </Stack>
      </Link>
    </Grid>
  )
}
