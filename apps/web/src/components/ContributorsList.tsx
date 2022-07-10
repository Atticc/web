
import { Divider, Grid, Typography, useTheme } from "@mui/material"
import { unlink } from "fs";
import Link from "next/link"
import { IUser } from "../app/constants";
import { formatAddress } from "../utils/helper";
import { ContributorListItem } from "./ContributorListItem";


export const ContributorsList = ({ title, data, showReason = false }: { title: string, data: Array<IUser>, showReason?: boolean}) => {
  const colorTheme = useTheme().palette;

  return <Grid container direction={'column'} sx={{ border: 1, borderRadius: 2, paddingX: 1, paddingY: 1, marginTop: 5 }} spacing={1}>
    <Grid item>
      <Typography marginBottom={1} variant='h5'>
        {title}
      </Typography>
      <Divider />
    </Grid>
    {data?.map(u => <ContributorListItem user={u} key={u.address} showReason />)}
  </Grid>
}