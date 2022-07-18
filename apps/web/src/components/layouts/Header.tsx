import { Container, Grid, Typography, useTheme,  Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useScrollPosition } from '../../utils/useScrollPosition'
import { AtticcIcon, AtticTextIcon } from '@c/icons/AtticcIcon'
import Wallet from '../WalletComponent'
import SearchBox from '@c/SearchBox'
import useWallet from '@utils/useWallet'
import { IMenu } from '@app/constants'

const menu: Array<IMenu> = [
  { title: 'Home', path: '/home/' },
  { title: 'Chats', path: '/chats/' },
  { title: 'Profile', path: '/users/<address>' },
  // { title: 'Communities', path: '/communities/' },
]

function Header({ showSearch = true }: { showSearch?: boolean }) {
  const { t } = useTranslation('common')
  const colorTheme = useTheme().palette
  const scrollPosition = useScrollPosition()
  const { address = '' } = useWallet()

  const renderMenu = (m: IMenu) => {
    if (!address && m.title === 'Profile') {
      return null
    }

    if(!showSearch && m.title === 'Chats') { return null }

    const url = m.path.replace('<address>', address)
    return (
      <Link href={url} key={m.title} passHref>
        <a>
          <Typography variant="action" px={3} color={colorTheme.white.main} textTransform={'uppercase'}>
            {m.title}
          </Typography>
        </a>
      </Link>
    )
  }

  return (
    <Container
      disableGutters
      sx={{
        maxHeight: 68,
        minHeight: 68,
        position: `sticky`,
        top: 0,
        zIndex: scrollPosition ? 1000 : 1,
        maxWidth: 'unset !important',
        background: colorTheme.primary.main,
        boxShadow: scrollPosition ? '0px 4px 21px rgba(0, 23, 46, 0.66)' : 'none',
      }}
    >
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingX: 10,
          height: 68,
          maxHeight: 68,
          minHeight: 68
        }}
        alignItems={'center'}
        direction={'row'}
      >
        <Grid item sx={{
          maxHeight: 68,
          minHeight: 68
        }}>
          <Grid container direction={'row'} alignItems={'center'} sx={{
            maxHeight: 68,
            minHeight: 68
          }}>
            <Link href={'/'} passHref>
              <a>
                <Stack direction={'row'} alignItems={'center'} spacing={1} sx={{
                  maxHeight: 68,
                  minHeight: 68
                }}>
                  <AtticcIcon
                    tColor={'#fff'}
                    oColor={'#fff'}
                    borderColor={'#fff'}
                    aColor={'#000'}
                    cColor={'#000'}
                    height={40}
                    width={40}
                  />
                  <AtticTextIcon />
                </Stack>
              </a>
            </Link>
            {menu.map(renderMenu)}
          </Grid>
        </Grid>
        <Grid item sx={{
          maxHeight: 68,
          minHeight: 68
        }}>
          <Grid container direction={'row'} alignItems={'center'} sx={{
            maxHeight: 68,
            minHeight: 68
          }}>
            {showSearch ? <SearchBox /> : null}
            <Stack pr={2} />
            <Wallet />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Header
