
import type { GetServerSideProps, NextPage } from 'next';
import LayoutWithoutFooter from '../../../../layouts/LayoutWithoutFooter';
import { useState } from 'react';
import { Grid, Typography } from '@mui/material';


interface UserDetailProps {
  pageId: string
  id: string
}

const Home: NextPage<UserDetailProps> = ({ pageId, id }) => {
  
  return (
    <LayoutWithoutFooter>
      <Grid container maxWidth="lg" spacing={2} direction={'row'} >
        <Grid item direction={'column'} xs>
          <Typography variant={'h2'}>
            Community {id}, Post {pageId}
          </Typography>
        </Grid>
      </Grid>
    </LayoutWithoutFooter>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pageId, id } = context.query

  return {
    props: { pageId, id },
  }
}