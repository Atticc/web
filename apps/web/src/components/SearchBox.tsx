import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Autocomplete, Chip, Stack, TextField, Typography } from '@mui/material'
import useWallet from '@utils/useWallet'
import { IUser } from '@app/constants'

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

  // const handleInputChange = async (e: React.SyntheticEvent) => {
  //   const data = e.target as typeof e.target & {
  //     value: string
  //   }
  //   // if (router.pathname !== '/dm') {
  //   //   router.push('/dm')
  //   // }
  //   if (
  //     data.value.endsWith('.eth') ||
  //     (data.value.startsWith('0x') && data.value.length === 42)
  //   ) {
  //     handleSubmit(e, data.value)
  //   }
  // }

  useEffect(() => {
    const setLookupValue = async () => {
      if (!lookupAddress) return
      if (value.startsWith('0x') && value.length === 42) {
        const name = await lookupAddress(value)
        if (name) {
          setValue(name)
        }
      }
    }
    setLookupValue()
  }, [value, lookupAddress])

  const handleAutocomplete = async (event: any, newValue: string) => {
    if (newValue.startsWith('0x') && newValue.length === 42) {
      const name = await lookupAddress(newValue)
      if (name) {
        setValue(name)
      }
    } else if (newValue.endsWith('.eth') && newValue.length > 5) {
      const address = await resolveName(newValue)
      if (address) {
        setValue(address)
      }
    }
    setOptions(options)
    setValue(newValue)
  }

  return (
    <Stack direction={'column'} width={300} {...props}>
      {/* { value && (
        <Chip label={value} />
      )} */}
      <Autocomplete
        freeSolo
        filterSelectedOptions
        fullWidth
        options={options}
        filterOptions={(x) => x}
        renderInput={(params) => <TextField margin="dense" {...params} label="Search" fullWidth />}
        // onChange={handleAutocomplete}
        open={value.length > 4}
        onInputChange={handleAutocomplete}
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <Stack direction={'column'}>
                <Chip label={option.domain} />
                <Typography>{option.address}</Typography>
              </Stack>
            </li>
          )
        }}
      />
    </Stack>
  )
}

export default SearchBox
