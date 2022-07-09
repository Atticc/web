import { Grid, Link, Typography, useTheme } from "@mui/material"
import { IUser } from '../app/constants'

export const UserCard = ({user, isDetail = false}: {user: IUser | undefined, isDetail?: boolean}) => {
  const colorTheme = useTheme().palette;

  if(!user) {
    return null
  }

  if(isDetail) {
    return <Link href = {`/users/${user.address}`}>
    <Grid item >
      <Grid container direction={'column'}>
        <Grid item sx={{ borderRadius: 3, border: 0.5, paddingX: 2, paddingY: 3, marginX: 2, marginY: 3, cursor: 'pointer' }}>
            <Typography variant="body1">
            {user.address}
          </Typography>
            <Typography variant="body1">
            {user.name}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Link >
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