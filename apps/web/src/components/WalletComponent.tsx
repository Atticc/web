import { Avatar, Button, Grid, Stack, Typography, Menu, MenuItem, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState, MouseEvent } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { formatAddress } from '../utils/helper'
import { useWeb3 } from '../utils/Web3Context'
import { PrimaryDarkButton } from './buttons/Buttons'

export function WalletComponent() {
  const router = useRouter()
  const colorTheme = useTheme().palette
  const [connected] = useLocalStorage('WEB3_CONNECT_CACHED_PROVIDER', null)
  const { connectWallet, disconnect, address, domain, avatar } = useWeb3()
  const [loading, setLoading] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const connect = useCallback(async () => {
    setLoading(true)
    await connectWallet()
    setLoading(false)
  }, [connectWallet])

  const handleDisconnect = () => {
    handleClose()
    disconnect()
  }

  const gotoProfile = (e: MouseEvent) => {
    e.preventDefault()
    router.push(`/users/${address}`)
  }

  useEffect(() => {
    if (connected) {
      connect()
    }
  }, [connected])

  return (
    <Grid item>
      {!address ? (
        <PrimaryDarkButton textcontent={loading ? 'Loading...' : 'Connect Wallet'} onClick={connect} />
      ) : (
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          color={'backgroundLight100'}
        >
          <Stack direction={'row'} alignItems={'center'}>
            <Avatar variant="circular" src={avatar || ''} />
            <Stack direction={'column'} paddingLeft={1}>
              <Typography variant="h6">{domain || null}</Typography>
              <Typography variant="body1">{formatAddress(address)}</Typography>
            </Stack>
          </Stack>
        </Button>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={gotoProfile}>Profile</MenuItem>
        <MenuItem onClick={handleDisconnect} style={{ color: colorTheme.error.main }}>
          Logout
        </MenuItem>
      </Menu>
    </Grid>
  )
}
