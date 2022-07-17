import type { NextPage } from 'next'
import { Avatar, Stack, Tooltip, Typography, Grid, Button, colors, useTheme } from '@mui/material'
import { World, Item } from 'react-dom-box2d'
import Link from 'next/link'
import LandingHeader from '@c/layouts/LandingHeader'
import { AtticcIcon, LandingAtticIcon } from '@c/icons/AtticcIcon'

const items = [
  {
    name: 'vitalik.eth',
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    image:
      'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128',
  },
  {
    name: 'cyberlab.eth',
    address: '0x148d59faf10b52063071eddf4aaf63a395f2d41c',
    image: 'https://images.cybertino.io/cyberconnect_logo',
  },
  {
    name: 'pisofa.eth',
    address: '0xebed0bf2701e905b4c576b3dc943d797bac226ed',
    image:
      'https://lh3.googleusercontent.com/7ZFeNaod0-q0SuuAbg2I8ZXVNyU2XahVjpLzCXX7D_fNVUFYIKSjWdBHRaLOXUlF4zzM-mS62jQFaCzw1GhwF8jGFwTYV6dm7_1NxoA=s128',
  },
  {
    name: 'wilsonwei.eth',
    address: '0x8891075a34b58a53dddf50b8e200211ff470a580',
    image:
      'https://lh3.googleusercontent.com/ZIKDovUfNyNFYH02_TSJr5WTW6eJj0-aozhJAIWYWU24G16FIyEIplWBjEh1WIHQseMd_yZg1gpIUcgzIR7Y7XMreP0zoO1oQKQgeQ=s128',
  },
  {
    name: 'zhimao.eth',
    address: '0x8ddd03b89116ba89e28ef703fe037ff77451e38e',
    image:
      'https://lh3.googleusercontent.com/qsxnWQWDdIUW67jNYMSmVIbDQri367mRucU7dELJTG0hGBgy11UoaSYLAixy7vnuUqJhg7yhgW5fybts2gmcJd5dQcA7MYgXjRF0Qw=s128',
  },
  {
    name: 'wearehiring.eth',
    address: '0x7c04786f04c522ca664bb8b6804e0d182eec505f',
    image: './assets/0x7c04786f04c522ca664bb8b6804e0d182eec505f.png',
  },
  {
    name: 'wanghanyang.eth',
    address: '0xf8df289f0a0220f557d0b2b64247bc15af91a82b',
    image:
      'https://lh3.googleusercontent.com/L6qMNQ8kf2yX61RlBMHwazZJ9OQOpDowVY3GWV40yn6fWbBApi3rYH0HIwVLAZMLok1Zwygrg6CcY1MNlgFQcwU_Dy2TbTM2zw3eR6Q=w600',
  },
  {
    name: 'nick.eth',
    address: '0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5',
    image:
      'https://lh3.googleusercontent.com/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE=s128',
  },
  {
    name: 'spadequeen7.eth',
    address: '0x5fd9b0b7e15b4d106624ea9cf96602996c9c344d',
    image:
      'https://lh3.googleusercontent.com/IWNUt93gg5kwF3VodiYiy1IoVvjI87gqKaf0BYiqzlVRTzUf8WJksJxsYoeEH4aguzv_o8JjphvDXL1DdnUKqXsbk4y6Whoy9PITag=s128',
  },
  {
    name: 'akasuv.eth',
    address: '0xbd358966445e1089e3add528561719452fb78198',
    image:
      'https://lh3.googleusercontent.com/9mGrAiuaK3qp0E2PHPt0BDARna7iA6svbQEYzMNM6YnuQkYeVJn_tdlMzIYT7QKTDRihgraYgQ_BFRZUPhIjUPnavEXj8ThqYnVu7vQ=s128',
  },
  {
    name: 'ivyli.eth',
    address: '0x1e25653ff9852119360c9f8d796969fafc048929',
    image:
      'https://lh3.googleusercontent.com/MgnHOIOyPhyWkVmFrFXJ3Sb88gvHH-K4CWadkEIQdDNF7K_93-gwiloxcKWSQJ0HuYtW2qSu79als_PRiDr4noq5rnIRoSqcoA4weww=s128',
  },
  {
    name: 'peiwen.eth',
    address: '0xc47aa859fa329496db6d498165da7e0b1fe13430',
    image: 'https://gif-avatars.com/img/200x200/joker-1.gif',
  },
  {
    name: 'chelseaaa.eth',
    address: '0x19af5e0a45c55c0f2edb5f48abbed82360de7dd7',
    image: './assets/0x19aF5e0a45c55c0f2edB5f48Abbed82360De7dD7.png',
  },
  {
    name: 'atticknight.eth',
    address: '0xc81082690edc8cde6d83a7549aa6a74534305372',
    image: './assets/0xC81082690EDC8CDE6D83a7549aa6a74534305372.png',
  },
  {
    name: '0xminion.eth',
    address: '0xe085327c5ad2f77147f10973fed45fb19d734f7e',
    image: './assets/0xe085327c5ad2f77147f10973fed45fb19d734f7e.png',
  },
  {
    name: 'atticcburger.eth',
    address: '0x39b626b217a4e4e52a734826c18eb880fdcbf57c',
    image: './assets/0x39b626b217a4e4e52a734826c18eb880fdcbf57c.png',
  },
  {
    name: 'monify.eth',
    address: '0x4892eC28B9c865BB5b52c0321979E1ec22881f7c',
    image: './assets/0x4892eC28B9c865BB5b52c0321979E1ec22881f7c.png',
  },
]

const TestPage: NextPage = () => {
  const color = useTheme().palette

  const renderItem = (i: any) => {
    const top = Math.max(0, Math.floor(Math.random() * 240))
    const left = Math.max(0, Math.floor(Math.random() * (window.innerWidth - 120)))
    const size = Math.min(120, window.innerWidth / 6)

    return (
      <Item left={left} top={top} restitution={0.3} key={i.address} height={size} width={size} shape={'circle'}>
        <div style={{ height: size, width: size}}>
          <Link href={`/users/${i.address}`} passHref>
            <a>
              <Tooltip
                followCursor
                title={
                  <Stack direction={'column'}>
                    <Typography variant="body1">{i?.name || i?.address}</Typography>
                  </Stack>
                }
                arrow
                placement={'top'}
              >
                <Avatar
                  src={i?.image}
                  alt={`${i.name} profile image`}
                  sx={{
                    bgcolor: 'transparent',
                    width: size,
                    height: size,
                    ':hover': {
                      filter: 'opacity(0.9)',
                      transform: 'scale(1.2)',
                      zIndex: 1000,
                    },
                  }}
                >
                  {' '}
                  <AtticcIcon
                    tColor={'#fff'}
                    oColor={'#fff'}
                    borderColor={'#fff'}
                    aColor={'#000'}
                    cColor={'#000'}
                    height={120}
                    width={120}
                  />
                </Avatar>
              </Tooltip>
            </a>
          </Link>
        </div>
      </Item>
    )
  }

  return (
    <Stack
      height={'100vh'}
      width={'100vw'}
      sx={{
        overflow: 'hidden',
        backgroundColor: '#F26E21',
      }}
    >
      <World
        width={Math.floor(window.innerWidth)}
        height={Math.floor(window.innerHeight)}
        gravity={[0, 9.8]}
        className="world"
        style={{ backgroundColor: 'transparent', position: 'absolute', bottom: 0, right: 0, overflowX: 'hidden', overflowY: 'hidden' }}
      >
        {items.map(renderItem)}
      </World>
      <LandingHeader />
      <Grid container direction="row" justifyContent={'space-around'} height={'50vh'} alignItems={'center'} pt={10}>
        <Grid item md={6}>
          <Grid container direction="column" px={3}>
            <Grid item>
              <Typography variant="title">
                Heyy,
                <br />
                atticc today!
              </Typography>
              <Typography variant="body1" pt={2}>
                This is a crypto native social media for crypto native communities.
                <br />
                Own your data, chill with frens, experience web3. LFG!
              </Typography>
            </Grid>
            <Grid item pt={2}>
              <Button variant="outline" color="primary" href={'/discover'}>
                See More
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4}>
          <LandingAtticIcon />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default TestPage
