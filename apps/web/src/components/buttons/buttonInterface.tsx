import { SxProps, Theme } from '@mui/material'
import { MouseEventHandler, ReactNode } from 'react'

export interface IButtonProps {
  textcontent: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  sx?: SxProps<Theme> | undefined
  disabled?: boolean
  href?: string
}

export interface IBaseButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  sx?: SxProps<Theme> | undefined
  disabled?: boolean
  href?: string
  textcolor:
    | 'inherit'
    | 'primary.main'
    | 'secondary.main'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'textDark100.main'
    | 'textDark200.main'
    | 'textDark300.main'
    | 'textLight100.main'
    | 'textLight200.main'
    | 'textLight300.main'
  backgroundcolor:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'backgroundLight100'
    | 'backgroundLight200'
    | 'backgroundLight300'
    | 'backgroundLight400'
    | 'backgroundLight500'
    | 'backgroundDark100'
    | 'backgroundDark200'
    | 'backgroundDark300'
    | 'backgroundDark400'
    | 'backgroundDark500'
  startIcon?: ReactNode
  endIcon?: ReactNode
  textcontent: string
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'bodySmall'
    | 'bodyMedium'
    | 'bodyLarge'
    | 'actionSmall'
    | 'actionMedium'
    | 'actionLarge'
    | 'tagSmall'
}
