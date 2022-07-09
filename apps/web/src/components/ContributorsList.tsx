
import { Divider, Grid, Typography, useTheme } from "@mui/material"
import Link from "next/link"
import { IUser } from "../app/constants";
import { formatAddress } from "../utils/helper";


export const ContributorsList = ({title, data}: {title: string, data: Array<IUser>}) => {
  const colorTheme = useTheme().palette;

  return <Grid container direction={'column'} sx={{ border: 1, borderRadius: 2, paddingX: 1, paddingY: 1, marginTop: 5 }} spacing={1}>
    <Grid item >
      <Typography sx={{ marginBottom: 1 }} variant='h5'>
        {title}
      </Typography>
      <Divider />
    </Grid>
    {data.map(c => <Link href={`/users/${c.address}`} key={c.address}>
      <Grid item sx={{
        paddingY: 1,
        cursor: 'pointer',
        ':hover': {
          color: colorTheme.secondary.main,
        }
      }}>
        <Typography variant='body1'>
          {formatAddress(c.address)}
        </Typography>
      </Grid>
    </Link>)}
  </Grid>
}