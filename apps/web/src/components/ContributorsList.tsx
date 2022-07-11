import { Divider, Grid, Typography, useTheme } from '@mui/material'
import { IUser } from '../app/constants'
import { ContributorListItem } from './ContributorListItem'

export const ContributorsList = ({
  title,
  data,
  showReason = false,
  hasBorder = true,
}: {
  title?: string
  data: Array<IUser>
  showReason?: boolean
  hasBorder?: boolean
}) => {
  const colorTheme = useTheme().palette

  return (
    <Grid container direction={'column'} border={hasBorder ? 1 : 0} sx={{ borderRadius: 2, paddingX: 1, paddingY: 1 }}>
      <Grid item>
        <Typography marginBottom={1} variant="h5">
          {title}
        </Typography>
        {title ? <Divider /> : null}
      </Grid>
      {data?.map((u) => (
        <ContributorListItem user={u} key={u.address} showReason={showReason} />
      ))}
    </Grid>
  )
}
