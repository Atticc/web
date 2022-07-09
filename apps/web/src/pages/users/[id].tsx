
import type { GetServerSideProps, NextPage } from 'next';
import LayoutWithoutFooter from '../../layouts/LayoutWithoutFooter';
import { useState } from 'react';
import { Grid, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { CommunitiesList } from '../../components/CommunitiesList';
import { communities, posts, users } from '../../app/constants';
import Link from 'next/link';
import { PostListItem } from '../../components/PostListItem';
import { UserCard } from '../../components/UserCard';


interface UserDetailProps {
  id: string
}

const tabs = [
  { label: 'Popular', value: 1 },
  { label: 'Latests', value: 2 },
]

const UserDetailPage: NextPage<UserDetailProps> = ({ id }) => {
  
  const colorTheme = useTheme().palette;
  const [tab, setTab] = useState(1)

  const handleSetTab = (_: React.ChangeEvent<{}>, value: number) => {
    setTab(value)
  }

  return (
    <LayoutWithoutFooter>
      <Grid container maxWidth="lg" spacing={3} direction={'row'} >
        <Grid item xs>
          <Grid container direction={'column'} sx={{ paddingX: 2 }} alignItems={'center'}>
            <CommunitiesList title={'Joined Communities'} data={communities} />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Tabs value={tab} onChange={handleSetTab} aria-label="Post Tabs">
            {tabs.map(t => <Tab label={t.label} value={t.value} key={t.label} />)}
          </Tabs>
          <Grid container direction={'column'} alignItems={'center'}>
            {posts.map(p => <PostListItem key={p.id} post={p} /> )}
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container direction={'column'}  alignItems={'center'}>
            <UserCard user={users.find(u => u.address === id)} isDetail />
            <CommunitiesList title={'NFT Issued'} data={[]} />
            <CommunitiesList title={'Collections'} data={[]} />
          </Grid>
        </Grid>
      </Grid>
    </LayoutWithoutFooter>
  );
};

export default UserDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query

  return {
    props: { id },
  }
}
