import { Avatar } from '@mui/material'
import useEns from '@utils/useEns'

type AvatarProps = {
  address: string
}

const ProfileImage = ({ address }: AvatarProps) => {
  const { avatarUrl } = useEns(address)
  return <Avatar variant="circular" src={avatarUrl} alt={`Avatar for ${address}`} />
}

export default ProfileImage
