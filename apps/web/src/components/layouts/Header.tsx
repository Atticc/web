import { Container, Grid, Typography, useTheme, Link as A } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useScrollPosition } from '../../utils/useScrollPosition'
import { AtticcIcon } from '@c/icons/AtticcIcon'
import Wallet from '../WalletComponent'
import SearchBox from '@c/SearchBox'

const menu = [
  { title: 'Discover', path: '/users/' },
  { title: 'Chats', path: '/chats/' },
  // { title: 'Communities', path: '/communities/' },
]

function Header() {
  const { t } = useTranslation('common')
  const colorTheme = useTheme().palette
  const scrollPosition = useScrollPosition()

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
        background: '#001325',
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
        }}
        alignItems={'center'}
        direction={'row'}
      >
        <Grid item>
          <Grid container direction={'row'} alignItems={'center'}>
            <Link href={'/'} passHref>
              <A>
                <AtticcIcon
                  borderColor={colorTheme.dark.main}
                  cColor={colorTheme.primary.main}
                  oColor={colorTheme.dark.main}
                  aColor={colorTheme.primary.main}
                  tColor={colorTheme.dark.main}
                  height={40}
                  width={40}
                />
              </A>
            </Link>
            {menu.map((m) => (
              <Link href={m.path} key={m.title} passHref>
                <Typography
                  variant="actionMedium"
                  sx={{
                    color: '#fff',
                    paddingX: 5,
                    cursor: 'pointer',
                    ':hover': {
                      color: colorTheme.secondary.main,
                    },
                  }}
                >
                  {m.title}
                </Typography>
              </Link>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction={'row'} alignItems={'center'}>
            <SearchBox />
            <Wallet />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Header
