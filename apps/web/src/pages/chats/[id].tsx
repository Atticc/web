import type { GetServerSideProps, NextPage } from 'next'
import LayoutWithoutFooter from '../../layouts/LayoutWithoutFooter'
import { useState } from 'react'
import { Grid, Tab, Tabs, Typography } from '@mui/material'
import { PrimaryDarkButton } from '../../components/buttons/Buttons'
import { CommunitiesList } from '../../components/CommunitiesList'
import { PostListItem } from '../../components/PostListItem'
import { comments, posts, users } from '../../app/constants'
import { ContributorsList } from '../../components/ContributorsList'
import CommunityCreateModal from '../../components/modal/CommunityCreateModal'
import { CommentListItem } from '../../components/CommentListItem'

interface UserDetailProps {
  postId: string
  id: string
}

const Home: NextPage<UserDetailProps> = ({ postId, id }) => {
  const [tab, setTab] = useState(1)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const handleCloseCreateModal = () => setShowCreateModal(false)

  const handleSetTab = (_: React.ChangeEvent<{}>, value: number) => {
    setTab(value)
  }

  return (
    <LayoutWithoutFooter>
      <Grid container spacing={3} direction={'row'} sx={{ paddingX: 4 }}>
        <Grid item xs>
          <Grid container direction={'column'} sx={{ paddingX: 2 }} alignItems={'center'}>
            <Grid item xs>
              <PrimaryDarkButton textcontent={'Create Community'} onClick={() => setShowCreateModal(true)} />
            </Grid>
            <Grid item xs>
              <PrimaryDarkButton textcontent={'Create Post'} onClick={() => setShowCreateModal(true)} />
            </Grid>
            <CommunitiesList title={'Channels'} data={[]} />
            <CommunitiesList title={'Toolkits'} data={[]} />
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container direction={'column'} alignItems={'center'}>
            <PostListItem post={posts.find((p) => String(p.id) === postId)} />
            {comments.map((c) => (
              <CommentListItem comment={c} key={c.id} />
            ))}
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container direction={'column'}>
            <Grid item sx={{ paddingTop: 2 }}>
              <Typography variant={'h3'}>Community {id}</Typography>
            </Grid>
            <CommunitiesList title={'Utility NFTs'} data={[]} />
            <ContributorsList title={'Top Contributors'} data={users} />
          </Grid>
        </Grid>
      </Grid>

      <CommunityCreateModal open={showCreateModal} onClose={handleCloseCreateModal} />
    </LayoutWithoutFooter>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { postId, id } = context.query

  return {
    props: { postId, id },
  }
}
