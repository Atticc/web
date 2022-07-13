import { Container, Grid, Typography, useTheme, Link as A, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AtticcIcon, AtticTextIcon } from '@c/icons/AtticcIcon'
import Wallet from '../WalletComponent'

function LandingHeader() {
  const { t } = useTranslation('common')
  const colorTheme = useTheme().palette

  return (
    <Container
      disableGutters
      sx={{
        maxHeight: 68,
        minHeight: 68,
        position: `sticky`,
        top: 0,
      }}
    >
      <Grid container sx={{
        display: 'flex', justifyContent: 'space-between', paddingX: 10, height: 68
      }} alignItems={'center'} direction={'row'}>
        <Grid item>
          <Grid container direction={'row'} alignItems={'center'}>
            <Link href={'/'} passHref>
              <A>
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                  <AtticcIcon tColor={'#fff'} oColor={'#fff'} borderColor={'#fff'} aColor={'#000'} cColor={'#000'} height={40} width={40} />
                <AtticTextIcon />
                </Stack>
              </A>
            </Link>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction={'row'} alignItems={'center'}>
            <Wallet />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default LandingHeader
