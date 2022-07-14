import type { NextPage } from 'next'
import LayoutWithoutFooter from '../components/layouts/LayoutWithoutFooter'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import { Grid, Tab, Tabs, useTheme } from '@mui/material'
import { IUser, posts } from '../app/constants'
import { ContributorsList } from '../components/ContributorsList'
import { PostListItem } from '../components/PostListItem'
import { useRecommendation } from '../graphql/cyberconnect/queries/getRecommendation'
import { usePopular } from '../graphql/cyberconnect/queries/getPopular'
import { isValidAddr } from '../utils/helper'
import useWallet from '@utils/useWallet'

const tabs = [
  { label: 'Explore', value: 0 },
  { label: 'Popular', value: 1 },
  { label: 'Latests', value: 2 },
]

const Home: NextPage = () => {
  const { address } = useWallet()
  const handleSuccess = (data: [IUser]) => {
    setUsers(data)
  }
  const { refetch: fetchRecommendations } = useRecommendation({
    address: address || '',
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
    if (isValidAddr(String(address))) {
      fetchRecommendations()
    } else {
      fetchPopular()
    }
  }, [address, fetchPopular, fetchRecommendations])

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
