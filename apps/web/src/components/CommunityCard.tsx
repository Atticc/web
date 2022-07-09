import { Grid, Link, Typography, useTheme } from "@mui/material"
import { ICommunity } from '../app/constants'

export const CommunityCard = ({ community }: {community: ICommunity}) => {
  const colorTheme = useTheme().palette;

  return <Link href={`/communities/${community.id}`}>
    <Grid item sx={{ borderRadius: 3, background: colorTheme.backgroundDark500.main, paddingX: 2, paddingY: 4, marginX: 2, marginY: 1, cursor: 'pointer' }}>
      <Grid container direction={'column'} >
        <Typography variant='h5'>
          {community.title}
        </Typography>
      </Grid>
    </Grid>
  </Link>
}