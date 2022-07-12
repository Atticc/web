import { CircularProgress, Grid, Stack, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { IUser } from '@app/constants'
import ProfileImage from '@c/users/Avatar'
import Address from '@c/users/Address'
import { useRouter } from 'next/router'
import useEns from '@utils/useEns'
import { toChecksumAddress } from '@utils/helper'

export const ConversationFriendListItem = ({ user }: { user: IUser | undefined }) => {
  const colorTheme = useTheme().palette
  const router = useRouter()
  const { name, address, loading } = useEns(toChecksumAddress(String(user?.address || '')))
  const isSelected = router.query?.params?.[0] == address || router.query?.params?.[0] == name

  if (!user) {
    return null
  }

  if(loading) {
    return <CircularProgress />
  }

  return (
    <Link href={`/chats/${toChecksumAddress(user.address)}`} passHref>
      <Grid
        item
        sx={{
          filter: isSelected ? 'opacity(0.6)' : '',
          borderRadius: 3,
          border: 0.2,
          borderColor: colorTheme.dark.main,
          margin: 1,
          cursor: 'pointer',
          ':hover': {
            filter: 'opacity(0.8)',
          },
          paddingY: 2,
          paddingX: 1,
        }}
      >
        <Stack direction={'row'} alignItems={'center'}>
          <ProfileImage address={String(address)} />
          <Address address={String(address)} showAddress />
        </Stack>
      </Grid>
    </Link>
  )
}

export default ConversationFriendListItem
