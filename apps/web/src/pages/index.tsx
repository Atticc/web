import type { NextPage } from 'next'
import LayoutWithoutFooter from '../components/layouts/LayoutWithoutFooter'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import { Grid, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { communities, IUser, posts, users } from '../app/constants'
import Link from 'next/link'
import { CommunitiesList } from '../components/CommunitiesList'
import { ContributorsList } from '../components/ContributorsList'
import { PostListItem } from '../components/PostListItem'
import { useRecommendation } from '../graphql/cyberconnect/queries/getRecommendation'
import { useWeb3 } from '../utils/Web3Context'
import { usePopular } from '../graphql/cyberconnect/queries/getPopular'
import { isValidAddr } from '../utils/helper'

const tabs = [
  { label: 'Explore', value: 0 },
  { label: 'Popular', value: 1 },
  { label: 'Latests', value: 2 },
]

const Home: NextPage = () => {
  const { address } = useWeb3()
  const handleSuccess = (data: [IUser]) => {
    setUsers(data)
  }
  const { refetch: fetchRecommendations } = useRecommendation({
    address,
    onSuccess: handleSuccess,
  })
  const { refetch: fetchPopular } = usePopular({
    first: 5,
    onSuccess: handleSuccess,
  })
  const colorTheme = useTheme().palette
  const [tab, setTab] = useState(0)
  const [users, setUsers] = useState<[IUser] | []>([])

  useEffect(() => {
    if (isValidAddr(address)) {
      fetchRecommendations()
    } else {
      fetchPopular()
    }
  }, [address])

  const handleSetTab = (_: React.ChangeEvent<{}>, value: number) => {
    setTab(value)
  }

  return (
    <LayoutWithoutFooter>
      <Grid container gap={3} direction={'row'} sx={{ paddingX: 10 }} marginTop={2}>
        <Grid item xs={9}>
          <Grid container direction={'column'}>
            <Tabs value={tab} onChange={handleSetTab} aria-label="Post Tabs" variant="fullWidth">
              {tabs.map((t) => (
                <Tab label={t.label} value={t.value} key={t.label} />
              ))}
            </Tabs>
            {posts.map((p) => (
              <PostListItem post={p} key={p.id} />
            ))}
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container direction={'column'} gap={3}>
            <CommunitiesList title={'Top Communities'} data={communities} />
            <ContributorsList title={'Popular / Recommends'} data={users} showReason />
          </Grid>
        </Grid>
      </Grid>
    </LayoutWithoutFooter>
  )
}

export default Home

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
