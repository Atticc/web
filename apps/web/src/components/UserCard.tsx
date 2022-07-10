import { ConnectionType } from "@cyberlab/cyberconnect";
import { Avatar, Grid, Stack, Typography, useTheme } from "@mui/material"
import Link from "next/link";
import { useEffect, useState } from "react";
import { IUser } from '../app/constants'
import { useFollowStatus } from "../graphql/cyberconnect/queries/getFollowStatus";
import { formatAddress } from "../utils/helper";
import { useWeb3 } from "../utils/Web3Context";
import { PrimaryDarkButton } from "./buttons/Buttons";

export const UserCard = ({ user, isDetail = false }: { user: IUser, isDetail?: boolean }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const {address, cyberConnect} = useWeb3()

  const handleFetchFollowStatusResult = (data: any) => {
    setIsFollowing(data?.isFollowing)
  }

  const { data: followStatus, refetch: refetchFollowStatus } = useFollowStatus({
    fromAddr: address, toAddr: user.address, onSuccess: handleFetchFollowStatusResult
  })
  const colorTheme = useTheme().palette;

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
    } catch(err: any) {
      console.warn(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(address && user.address) {
      refetchFollowStatus()
    }
  }, [user.address, address])

  if (isDetail) {
    return <Grid container direction={'column'} spacing={1}>
      <Grid item sx={{ borderRadius: 3, border: 0.5, paddingX: 2, paddingY: 3, marginTop: 5 }}>
        <Stack direction={'column'} alignItems={'center'}>
          <Stack direction={'row'} alignItems={'center'} paddingBottom={2}>
            <Avatar variant='circular' src={user?.avatar || ''} />
            <Stack direction={'column'} paddingLeft={1}>
              <Typography variant='h5'>
                {user?.domain || null}
              </Typography>
              <Typography variant='body1'>
                {formatAddress(user?.address)}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={'row'} spacing={3}>
            <Stack direction={'column'} alignItems={'center'}>
              <Typography variant='body1'>
                Follower
              </Typography>
              <Typography variant='h6'>
               {user?.followerCount}
              </Typography>
            </Stack>
            <Stack direction={'column'} alignItems={'center'}>
              <Typography variant='body1'>
                Following
              </Typography>
              <Typography variant='h6'>
               {user?.followingCount}
              </Typography>
            </Stack>
          </Stack>
          {address && address !== user?.address ? <PrimaryDarkButton
            textcontent={loading ? 'loading...' : isFollowing ? 'Followed' : 'Follow'}
            onClick={onFollow}
          /> : null }
         
        </Stack>
      </Grid>
    </Grid>
  }

  return <Link href={`/users/${user.address}`}>
    <Grid item>
      <Grid container direction={'column'}>
        <Grid item sx={{ borderRadius: 3, background: colorTheme.backgroundDark500.main, paddingX: 2, paddingY: 3, marginX: 2, marginY: 3, cursor: 'pointer' }}>
          <Typography variant="body1">
            {user.address}
          </Typography>
          <Typography variant="body1">
            {user.domain}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Link>
}