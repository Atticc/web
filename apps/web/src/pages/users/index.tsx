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
      <Grid container spacing={3} direction={'column'} sx={{ paddingX: 4 }}>
        <Grid item xs>
          <Typography variant={'h2'}>
            Discover Users
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction={'row'} sx={{ marginY: 3 }} >
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
