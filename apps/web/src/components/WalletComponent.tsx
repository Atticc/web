import { Avatar, Button, Grid, Stack, Typography, Menu, MenuItem, useTheme } from '@mui/material'
import useEns from '@utils/useEns'
import useWallet from '@utils/useWallet'
import { useRouter } from 'next/router'
import { useCallback, useState, MouseEvent } from 'react'
import { formatAddress } from '../utils/helper'
import { PrimaryDarkButton } from './buttons/Buttons'

export function WalletComponent() {
  const router = useRouter()
  const colorTheme = useTheme().palette
  const { connect, disconnect, address, provider } = useWallet()
  const { name, avatarUrl } = useEns(address)
  const [loading, setLoading] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const connectWallet = useCallback(async () => {
    setLoading(true)
    await connect()
    setLoading(false)
  }, [connect])

  const handleDisconnect = useCallback(async () => {
    await disconnect()
    handleClose()
  }, [disconnect])

  const gotoProfile = (e: MouseEvent) => {
    e.preventDefault()
    router.push(`/users/${address}`)
  }

  return (
    <Grid item>
      {!provider ? (
        <PrimaryDarkButton textcontent={loading ? 'Loading...' : 'Connect Wallet'} onClick={connectWallet} />
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
            <Avatar variant="circular" src={avatarUrl || ''} />
            <Stack direction={'column'} paddingLeft={1}>
              <Typography variant="h6">{name || null}</Typography>
              <Typography variant="body1">{formatAddress(address || '')}</Typography>
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

export default WalletComponent
