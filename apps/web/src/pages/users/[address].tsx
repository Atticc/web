import type { GetServerSideProps, NextPage } from 'next'
import LayoutWithoutFooter from '@c/layouts/LayoutWithoutFooter'
import { useEffect, useState } from 'react'
import { Grid, Tab, Tabs, useTheme } from '@mui/material'
import { IUser, posts } from '@app/constants'
import { PostListItem } from '@c/PostListItem'
import { UserCard } from '@c/UserCard'
import { getIdentity, useIdentity } from '@req/cyberconnect/queries/getIdentity'
import { formatAddress, isValidAddr } from '@utils/helper'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { APP_NAME } from '@/app/config'
import { CommunitiesList } from '@c/CommunitiesList'
import { useRouter } from 'next/router'

const NftSection = dynamic(() => import('@c/NFT/NftSection'), {
  suspense: false,
  ssr: false,
})

interface UserDetailProps {
  address: string
  userData: IUser
  title: string
}

const tabs = [
  { label: 'Popular', value: 1 },
  { label: 'Latests', value: 2 },
]

const UserDetailPage: NextPage = () => {
  const router = useRouter()
  const { address } = router.query
  const userData: IUser = { address: String(address) }
  const [tab, setTab] = useState(1)
  const colorTheme = useTheme().palette
  const { data: user, refetch } = useIdentity({ address: String(address), data: userData })
  const title = `${userData?.domain || formatAddress(String(address))} - ${APP_NAME} Profile`

  useEffect(() => {
    if (isValidAddr(String(address))) {
      refetch()
    }
  }, [address, refetch])

  const handleSetTab = (_: React.ChangeEvent<{}>, value: number) => {
    setTab(value)
  }

  return (
    <LayoutWithoutFooter>
      <Head>
        <title key="title">{title}</title>
        <meta property="og:title" content={title} key="og-title" />
        <meta name="twitter:title" content={title} key="tw-title" />
      </Head>
      <Grid container direction={'row'} columnGap={3} paddingX={5} marginTop={2}>
        <Grid item xs={12} md={8}>
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
        <Grid item xs md={3}>
          <Grid container direction={'column'} alignItems={'center'} gap={3} maxWidth={320}>
            <UserCard user={user} isDetail key={`user-${address}`} />
            <CommunitiesList title={'NFT Issued'} data={[]} />
            <NftSection title={'Collections'} address={String(address)} key={`nft-${address}`} showMore />
          </Grid>
        </Grid>
      </Grid>
    </LayoutWithoutFooter>
  )
}

export default UserDetailPage

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { address } = context.query
//   let userData: any = {}

//   try {
//     if (isValidAddr(String(address))) {
//       userData = await getIdentity(String(address))
//     } else {
//       throw new Error('ERR_WALLET_ADDRESS_PATH_INCORRECT')
//     }
//   } catch (err: any) {
//     console.warn(err.message)
//     return {
//       notFound: true,
//     }
//   }

//   if (!userData?.address) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: { address, userData, title: `${userData?.domain || formatAddress(String(address))} - ${APP_NAME} Profile` },
//   }
// }
