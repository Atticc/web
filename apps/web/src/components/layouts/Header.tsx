import { Container, Grid, Typography, useTheme, Link as A } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { SwitchBox } from './SwitchBox'
import { useRouter } from 'next/router'
import { useScrollPosition } from '../../utils/useScrollPosition'
import { WalletComponent } from '../WalletComponent'
import { AtticcIcon } from '@c/icons/AtticcIcon'

const menu = [
  { title: 'Discover', path: '/users/' },
  // { title: 'Communities', path: '/communities/' },
]

function Header() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const colorTheme = useTheme().palette
  const scrollPosition = useScrollPosition()

  return (
    <Container
      disableGutters
      sx={{
        position: `sticky`,
        top: 0,
        zIndex: scrollPosition ? 1000 : 1,
        maxWidth: 'unset !important',
        background: '#001325',
        boxShadow: scrollPosition ? '0px 4px 21px rgba(0, 23, 46, 0.66)' : 'none',
      }}
    >
      <Grid container sx={{
        display: 'flex', justifyContent: 'space-between', paddingX: 10, minHeight: 68
      }} alignItems={'center'} direction={'row'}>
        <Grid item>
          <Grid container direction={'row'} alignItems={'center'}>
            <Link href={'/'} passHref>
              <A>
                <AtticcIcon color={colorTheme.dark} height={40} width={40} />
              </A>
            </Link>
            {menu.map((m) => (
              <Link href={m.path} key={m.title} passHref>
                <Typography
                  variant="actionMedium"
                  sx={{
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
            <Link href={'/chats'}>
              <Typography
                variant="actionMedium"
                sx={{
                  cursor: 'pointer',
                  ':hover': {
                    color: colorTheme.secondary.main,
                  },
                }}
              >
                Chats
              </Typography>
            </Link>
            <SwitchBox />
            <WalletComponent />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Header
