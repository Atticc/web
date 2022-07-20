import type { GetServerSideProps, NextPage } from 'next'
import LayoutWithoutFooter from '@c/layouts/LayoutWithoutFooter'
import { useEffect, useState } from 'react'
import { Grid, Tab, Tabs, useTheme } from '@mui/material'
import { IUser, posts } from '@app/constants'
import { PostListItem } from '@c/posts/PostListItem'
import { UserCard } from '@c/users/UserCard'
import { getIdentity, useIdentity } from '@req/cyberconnect/queries/getIdentity'
import { formatAddress, isValidAddr } from '@utils/helper'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { APP_NAME } from '@/app/config'
import { useRouter } from 'next/router'
import { TabPanel } from '@c/tabs/TabPanel'
import PostInput from '@c/posts/Input'
import useWallet from '@utils/useWallet'

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
  { label: 'Posts', value: 1 },
  { label: 'Collections', value: 2 },
]

const UserDetailPage: NextPage = () => {
  const router = useRouter()
  const { address } = router.query
  const { address: authedAddress } = useWallet()
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

      <Grid container direction={'column'} px={10} mt={2} display={'flex'}>
        <Grid item width={1}>
          <UserCard user={user} isDetail key={`user-${address}`} />
        </Grid>
        <Grid item width={1}>
          <Tabs value={tab} onChange={handleSetTab} aria-label="Post Tabs" sx={{ py: 4 }}>
            {tabs.map((t) => (
              <Tab label={t.label} value={t.value} key={t.label} sx={{ mr: 3 }} />
            ))}
          </Tabs>
          <TabPanel value={tab} index={1}>
            <Grid container direction={'column'} alignItems={'center'}>
              {authedAddress === address ? (
                <PostInput onSend={async () => {}} authedAddress={String(authedAddress)} key={authedAddress} />
              ) : null}
              {posts.map((p) => (
                <PostListItem key={p.id} post={p} />
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <NftSection address={String(address)} key={`nft-${address}`} />
          </TabPanel>
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
