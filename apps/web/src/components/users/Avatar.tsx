import { Avatar } from '@mui/material'
import { toChecksumAddress } from '@utils/helper'
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

function stringAvatar(address: string, props: any) {
  return {
    sx: {
      bgcolor: stringToColor(address),
      fontSize: 14,
      ...(props.sx  || {})
    },
    children: `${address.slice(-4)}`,
  };
}

const ProfileImage = ({ address, src, ...props }: AvatarProps) => {
  const addr = toChecksumAddress(address)
  const { avatarUrl } = useEns(addr)
  return <Avatar
    variant="circular"
    src={src || avatarUrl}
    alt={`Avatar for ${address}`}
    {...props}
    {...stringAvatar(addr, props)}
  />
}

export default ProfileImage
