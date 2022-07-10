import { Container, Grid, Typography, useTheme, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { SwitchBox } from './SwitchBox'
import { useRouter } from 'next/router'
import { useScrollPosition } from '../../utils/useScrollPosition'
import { WalletComponent } from '../WalletComponent'
import { APP_NAME } from '../../app/config'

const NavContainer = styled(Container)(() => ({
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  minHeight: '60px',
  color: 'white',
}))

const menu = [
  { title: 'Discover', path: '/users/' },
  { title: 'Communities', path: '/communities/' },
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
      <NavContainer maxWidth="lg">
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Grid item sx={{ alignSelf: 'center' }}>
            <Link href={'/'}>
              <Typography
                variant="actionMedium"
                sx={{
                  padding: 5,
                  cursor: 'pointer',
                  ':hover': {
                    color: colorTheme.secondary.main,
                  },
                }}
              >
                {APP_NAME}
              </Typography>
            </Link>
            {menu.map((m) => (
              <Link href={m.path} key={m.title}>
                <Typography
                  variant="actionMedium"
                  sx={{
                    padding: 5,
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
          <Grid item>
            <Grid container direction={'row'}>
              <SwitchBox />
              <WalletComponent />
            </Grid>
          </Grid>
        </Grid>
      </NavContainer>
    </Container>
  )
}

export default Header
