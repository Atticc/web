import { Grid, Stack, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { IUser } from '@app/constants'
import ProfileImage from '@c/users/Avatar'
import Address from '@c/users/Address'
import { useRouter } from 'next/router'

export const ConversationFriendListItem = ({ user }: { user: IUser | undefined }) => {
  const colorTheme = useTheme().palette
  const router = useRouter()
  const isSelected = router.query?.params?.[0] == user?.address

  if (!user) {
    return null
  }

  return (
    <Link href={`/chats/${user.address}`} passHref>
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
          <ProfileImage address={user.address} />
          <Address address={user.address} showAddress />
        </Stack>
      </Grid>
    </Link>
  )
}

export default ConversationFriendListItem
