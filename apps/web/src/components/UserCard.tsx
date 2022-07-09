import { Avatar, Grid, Stack, Typography, useTheme } from "@mui/material"
import Link from "next/link";
import { IUser } from '../app/constants'
import { formatAddress } from "../utils/helper";

export const UserCard = ({ user, isDetail = false }: { user: IUser | undefined, isDetail?: boolean }) => {
  const colorTheme = useTheme().palette;

  if (!user) {
    return null
  }

  if (isDetail) {
    return <Grid container direction={'column'} spacing={1}>
      <Grid item sx={{ borderRadius: 3, border: 0.5, paddingX: 2, paddingY: 3, marginTop: 5 }}>
        <Stack direction={'column'} alignItems={'center'}>
          <Stack direction={'row'} alignItems={'center'} paddingBottom={2}>
            <Avatar variant='circular' src={user?.avatar || ''} />
            <Stack direction={'column'} paddingLeft={1}>
              <Typography variant='h5'>
                {user?.ens || null}
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
            {user.name}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Link>
}