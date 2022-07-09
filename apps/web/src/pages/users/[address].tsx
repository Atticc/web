import type { GetServerSideProps, NextPage } from 'next'
import LayoutWithoutFooter from '../../components/layouts/LayoutWithoutFooter'
import { useEffect, useState } from 'react'
import { Grid, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { CommunitiesList } from '../../components/CommunitiesList'
import { communities, IUser, posts } from '../../app/constants'
import { PostListItem } from '../../components/PostListItem'
import { UserCard } from '../../components/UserCard'
import { getIdentity, useIdentity } from '../../graphql/cyberconnect/queries/getIdentity'
import { isValidAddr } from '../../utils/helper'
import Head from 'next/head'

interface UserDetailProps {
  address: string
  userData: IUser
}

const tabs = [
  { label: 'Popular', value: 1 },
  { label: 'Latests', value: 2 },
]

const UserDetailPage: NextPage<UserDetailProps> = ({ address, userData }) => {
  const [tab, setTab] = useState(1)
  const colorTheme = useTheme().palette
  const { data: user, refetch } = useIdentity({ address, data: userData })
  const title = `${user?.domain}(${address}) - CryptoCorner Profile`

  useEffect(() => {
    refetch()
  }, [address])

  const handleSetTab = (_: React.ChangeEvent<{}>, value: number) => {
    setTab(value)
  }

  return (
    <LayoutWithoutFooter>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
      <Grid container direction={'row'} columnGap={3} paddingX={5} marginTop={2}>
        <Grid item xs>
          <Grid container direction={'column'} alignItems={'center'}>
            <CommunitiesList title={'Joined Communities'} data={communities} />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Tabs value={tab} onChange={handleSetTab} aria-label="Post Tabs" variant="fullWidth">
            {tabs.map((t) => (
              <Tab label={t.label} value={t.value} key={t.label} />
            ))}
          </Tabs>
          <Grid container direction={'column'} alignItems={'center'}>
            {posts.map((p) => (
              <PostListItem key={p.id} post={p} />
            ))}
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container direction={'column'} alignItems={'center'} gap={3}>
            <UserCard user={user} isDetail key={address} />
            <CommunitiesList title={'NFT Issued'} data={[]} />
            <CommunitiesList title={'Collections'} data={[]} />
          </Grid>
        </Grid>
      </Grid>
    </LayoutWithoutFooter>
  )
}

export default UserDetailPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { address } = context.query
  let userData = {}

  try {
    if (isValidAddr(String(address))) {
      userData = await getIdentity(String(address))
    } else {
      throw new Error('ERR_WALLET_ADDRESS_PATH_INCORRECT')
    }
  } catch (err: any) {
    console.warn(err.message)
  }

  return {
    props: { address, userData },
  }
}