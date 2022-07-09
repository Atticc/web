import type { NextPage } from 'next';
import LayoutWithoutFooter from '../layouts/LayoutWithoutFooter';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import { Grid, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { communities, posts, users } from '../app/constants';
import Link from 'next/link';
import { CommunitiesList } from '../components/CommunitiesList';
import { ContributorsList } from '../components/ContributorsList';
import { PostListItem } from '../components/PostListItem';

const tabs = [
  {label: 'Explore', value: 0},
  { label: 'Popular', value: 1},
  { label: 'Latests', value: 2},
]

const Home: NextPage = () => {
  const colorTheme = useTheme().palette;
  const [tab, setTab] = useState(0)

  const handleSetTab = (_: React.ChangeEvent<{}>, value: number) => {
    setTab(value)
  }

  return (
    <LayoutWithoutFooter>
      <Grid container spacing={3} direction={'row'} sx={{ paddingX: 4 }} >
        <Grid item xs={9}>
          <Grid container direction={'column'} >
            <Tabs value={tab} onChange={handleSetTab} aria-label="Post Tabs">
              {tabs.map(t => <Tab label={t.label} value={t.value} key={t.label} />)}
            </Tabs>
            {posts.map(p => <PostListItem post={p} key={p.id}/> )}
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container direction={'column'}>
            <CommunitiesList title={'Top Communities'} data={communities} />
            <ContributorsList title={'Top Contributors'} data={users} />
          </Grid>
        </Grid>
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
