import { Avatar, Grid, Stack, Typography, useTheme } from "@mui/material"
import Link from "next/link";
import { IUser } from '../app/constants'
import { formatAddress } from "../utils/helper";

export const ContributorListItem = ({ user }: { user: IUser | undefined }) => {
  const colorTheme = useTheme().palette;

  if (!user) {
    return null
  }

  return <Link href={`/users/${user.address}`}>
    <Grid item sx={{ borderRadius: 3, margin: 1, cursor: 'pointer', ':hover': {
      filter: 'opacity(0.8)'
    } }}>
      <Stack direction={'row'} alignItems={'center'}>
        <Avatar variant='circular' src={user?.avatar || ''} />
        <Stack direction={'column'} paddingLeft={1}>
          <Typography variant='h6'>
            {user?.domain || null}
          </Typography>
          <Typography variant='body1'>
            {formatAddress(user?.address)}
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  </Link>
}