import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Autocomplete, Chip, Stack, TextField, Typography } from '@mui/material'
import useWallet from '@utils/useWallet'
import { IUser } from '@app/constants'
import { formatAddress } from '@utils/helper'
import Link from 'next/link'

type SearchBoxProps = {
  recipientWalletAddress?: string
  id?: string
  name?: string
  className?: string
  placeholder?: string
  onSubmit?: (address: string) => Promise<void>
}

const SearchBox = ({ id, name, placeholder, onSubmit, ...props }: SearchBoxProps): JSX.Element => {
  const inputElement = useRef(null)
  const [value, setValue] = useState<string>('')
  const [options, setOptions] = useState<Array<IUser>>([])
  const { resolveName, lookupAddress } = useWallet()

  const handleAutocomplete = async (event: any, newValue: string) => {
    if (newValue.length < 5) {
      setOptions([])
      return
    }

    if (newValue.startsWith('0x') && newValue.length === 42) {
      const name = await lookupAddress(newValue)
      console.log('value', newValue)
      console.log('name', name)
      setOptions([
        {
          domain: name || '',
          address: newValue,
        },
      ])
    } else if (newValue.endsWith('.eth')) {
      const address = await resolveName(newValue)
      console.log('value', newValue)
      console.log('address', address)
      if (address) {
        setOptions([
          {
            domain: newValue,
            address: address,
          },
        ])
      }
    } else {
      setOptions([])
    }
    setValue(newValue)
  }

  return (
    <Stack direction={'column'} width={320} {...props}>
      <Autocomplete
        freeSolo
        filterSelectedOptions
        getOptionLabel={(options) => (typeof options === 'string' ? options : options?.address)}
        fullWidth
        options={options}
        filterOptions={(x) => x}
        renderInput={(params) => (
          <TextField margin="dense" {...params} size="small" label="Search" fullWidth variant="outlined" />
        )}
        open={value.length > 4}
        onInputChange={handleAutocomplete}
        renderOption={(props, option) => {
          return (
            <Link href={`/users/${option.address}`} passHref key={option.address}>
              <a>
                <li {...props}>
                  <Stack direction={'column'}>
                    {option.domain ? <Chip label={option.domain} /> : null}
                    <Typography color={'#fff'}>{formatAddress(option.address)}</Typography>
                  </Stack>
                </li>
              </a>
            </Link>
          )
        }}
      />
    </Stack>
  )
}

export default SearchBox
