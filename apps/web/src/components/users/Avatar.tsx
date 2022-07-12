import { Avatar } from '@mui/material'
import useEns from '@utils/useEns'

type AvatarProps = {
  address: string
  src?: string | undefined
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(address: string) {
  return {
    sx: {
      bgcolor: stringToColor(address),
      fontSize: 14
    },
    children: `${address.slice(-4)}`,
  };
}

const ProfileImage = ({ address, src }: AvatarProps) => {
  const { avatarUrl } = useEns(address)
  return <Avatar
    variant="circular"
    src={src || avatarUrl}
    alt={`Avatar for ${address}`}
    {...stringAvatar(address)}
  />
}

export default ProfileImage
