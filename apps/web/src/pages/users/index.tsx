import type { NextPage } from 'next';
import LayoutWithoutFooter from '../../layouts/LayoutWithoutFooter';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import { users } from '../../app/constants';
import Link from 'next/link';
import { UserCard } from '../../components/UserCard';

const Home: NextPage = () => {
  
  const colorTheme = useTheme().palette;
  return (
    <LayoutWithoutFooter>
      <Grid container maxWidth="lg" spacing={2} direction={'column'} >
        <Grid item  xs>
          <Typography variant={'h2'}>
            Discover Users
          </Typography>
        </Grid>
      </Grid>
        <Grid container direction={'row'} sx={{margin: 3}} >
        {users.map(u => <UserCard user={u} key={u.address} />)}
        </Grid>
    </LayoutWithoutFooter>
  );
};

export default Home;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
