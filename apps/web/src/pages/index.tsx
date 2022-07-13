import type { NextPage } from 'next'
import { useEffect, useRef } from 'react'
import { Avatar, Stack, Tooltip, Typography, Grid, Button, colors, useTheme } from '@mui/material'
import { World, Item } from 'react-dom-box2d';
import Link from 'next/link';
import LandingHeader from '@c/layouts/LandingHeader';
import { LandingAtticIcon } from '@c/icons/AtticcIcon';

const items = [
  {
    name: 'vitalik.eth',
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: 'cyberlab.eth',
    address: '0x148d59faf10b52063071eddf4aaf63a395f2d41c',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: 'pisofa.eth',
    address: '0xebed0bf2701e905b4c576b3dc943d797bac226ed',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: 'wilsonwei.eth',
    address: '0x8891075a34b58a53dddf50b8e200211ff470a580',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: 'zhimao.eth',
    address: '0x8ddd03b89116ba89e28ef703fe037ff77451e38e',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: 'wearehiring.eth',
    address: '0x7c04786f04c522ca664bb8b6804e0d182eec505f',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: 'wanghanyang.eth',
    address: '0xf8df289f0a0220f557d0b2b64247bc15af91a82b',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: 'nick.eth',
    address: '0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: 'spadequeen7.eth',
    address: '0x5fd9b0b7e15b4d106624ea9cf96602996c9c344d',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: 'akasuv.eth',
    address: '0xbd358966445e1089e3add528561719452fb78198',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: 'ivyli.eth',
    address: '0x1e25653ff9852119360c9f8d796969fafc048929',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: 'peiwen.eth',
    address: '0xc47aa859fa329496db6d498165da7e0b1fe13430',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: 'chelseaaa.eth',
    address: '0x19af5e0a45c55c0f2edb5f48abbed82360de7dd7',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: 'atticknight.eth',
    address: '0xc81082690edc8cde6d83a7549aa6a74534305372',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: '0xminion.eth',
    address: '0xe085327c5ad2f77147f10973fed45fb19d734f7e',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: 'atticcburger.eth',
    address: '0x39b626b217a4e4e52a734826c18eb880fdcbf57c',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
  {
    name: 'cy',
    address: '0x4892eC28B9c865BB5b52c0321979E1ec22881f7c',
    image: 'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128'
  },
]

const TestPage: NextPage = () => {
  const color = useTheme().palette

  const renderItem = (i: any) => {
    const top = Math.max(0, Math.floor(Math.random() * 240))
    const left = Math.max(0, Math.floor(Math.random() * (window.innerWidth - 120)))

    return <Item left={left} top={top} restitution={0.3} key={i.address} height={120}
      width={120} shape={'circle'}>
      <div style={{ height: 120, width: 120 }} >
        <Link href={`/users/${i.address}`} passHref>
          <a>
            <Tooltip followCursor
              title={
                <Stack direction={'column'}>
                  <Typography variant="body1">
                    {i?.name || i?.address}
                  </Typography>
                </Stack>
              }
              arrow>
              <Avatar src={i.image} alt={`${i.name} profile image`} sx={{
                width: 120, height: 120, ':hover': {
                  filter: 'opacity(0.9)',
                  transform: 'scale(1.1)',
                  zIndex: 1000,
                },
              }} />
            </Tooltip>
          </a>
        </Link>
      </div>
    </Item>
  }


  return (
    <Stack
      height={'100vh'}
      width={'100vw'}
      maxHeight={'100vh'}
      maxWidth={'100vw'}
      sx={{
        overflow: 'none',
        backgroundColor: '#F26E21'
      }}
    >
      <World width={window.innerWidth} height={window.innerHeight} gravity={[0, 9.8]} className="world" style={{ backgroundColor: 'transparent', padding: 0, position: 'absolute' }}>
        {items.map(renderItem)}
      </World>
      <LandingHeader />
      <Grid container direction="row" justifyContent={'space-around'} height={'50vh'} alignItems={'center'}>
        <Grid item md={6}>
        <Grid container direction="column">
          <Grid item>
            <Typography variant='h1'>
              The social community for all crypto owners.
            </Typography>
            <Typography variant='body1' pt={2}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa nascetur mus ipsum dolor sit amet.
            </Typography>
          </Grid>
          <Grid item pt={2}>
              <Button variant='outline' color='primary' href={'/discover'} sx={{backgroundColor: color.primary.main}}>See More</Button>
          </Grid>
          {/* <PrimaryButton /> */}
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
