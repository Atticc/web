
import type { GetServerSideProps, NextPage } from 'next';
import LayoutWithoutFooter from '../../layouts/LayoutWithoutFooter';
import { useState } from 'react';
import { Grid, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { CommunitiesList } from '../../components/CommunitiesList';
import { communities, posts, users } from '../../app/constants';
import Link from 'next/link';
import { PostListItem } from '../../components/PostListItem';
import { UserCard } from '../../components/UserCard';
import { useIdentity } from '../../graphql/cyberconnect/queries/getIdentity';


interface UserDetailProps {
  id: string
}

const tabs = [
  { label: 'Popular', value: 1 },
  { label: 'Latests', value: 2 },
]

const UserDetailPage: NextPage<UserDetailProps> = ({ id }) => {
  const {data : user} = useIdentity({ address: id });
  const colorTheme = useTheme().palette;
  const [tab, setTab] = useState(1)
  console.log(user)

  const handleSetTab = (_: React.ChangeEvent<{}>, value: number) => {
    setTab(value)
  }

  return (
    <LayoutWithoutFooter>
      <Grid container spacing={3} direction={'row'} sx={{ paddingX: 4 }} >
        <Grid item xs>
          <Grid container direction={'column'} alignItems={'center'}>
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
            <UserCard user={user} isDetail />
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
