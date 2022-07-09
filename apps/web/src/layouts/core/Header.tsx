import { Box, Container, Grid, Typography, useTheme, styled, Stack, Avatar } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import {
  PrimaryDarkButton,
  SecondaryDarkButton,
} from '../../components/buttons/Buttons';
import { SwitchBox } from './mode_switch/Mode_switch';
import { useRouter } from 'next/router';

import Web3 from "web3";
import Web3Modal from "web3modal";
import { useScrollPosition } from '../../utils/useScrollPosition';
import { useCallback, useState } from 'react';
import { useWeb3 } from '../../utils/Web3Context';
import { formatAddress } from '../../utils/helper';

const NavContainer = styled(Container)(() => ({
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  minHeight: '60px',
  color: 'white',
}));

const menu = [
  { title: 'Discover', path: '/users/' },
  { title: 'Communities', path: '/communities/' },
]


function Header() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const colorTheme = useTheme().palette;
  const scrollPosition = useScrollPosition()
  const { connectWallet, address, ens, avatar } = useWeb3();
  const [loading, setLoading] = useState(false);

  const connect = useCallback(async () => {
    setLoading(true);
    await connectWallet();
    setLoading(false);
  }, [connectWallet]);


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
            <Link href={'/'} >
              <Typography variant="actionMedium"
                sx={{
                  padding: 5,
                  cursor: 'pointer',
                  ':hover': {
                    color: colorTheme.secondary.main,
                  },
                }}>
                Crypto Corner
              </Typography>
            </Link>
            {menu.map(m =>
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
              </Link>)}
          </Grid>
          <Grid item>
            <Grid container direction={'row'}>
              <SwitchBox />
              <Grid item >
                {!address ? (
                  <PrimaryDarkButton
                    textcontent={loading ? 'Loading...' : 'Connect Wallet'}
                    onClick={connect}
                  />) : <Stack direction={'row'} alignItems={'center'}>
                    <Avatar variant='circular' src={avatar || ''} />
                  <Stack direction={'column'} paddingLeft={1}>
                    <Typography variant='h6'>
                      {ens || null}
                    </Typography>
                    <Typography variant='body1'>
                      {formatAddress(address)}
                    </Typography>
                  </Stack>
                </Stack>}
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </NavContainer>
    </Container>


  );
}

export default Header;
