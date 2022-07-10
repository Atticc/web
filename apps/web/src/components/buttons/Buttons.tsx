import BaseButton from './BaseButton'
import { IButtonProps } from './buttonInterface'

export const PrimaryDarkButton = (props: IButtonProps) => {
  return (
    <BaseButton
      textcolor="textLight100.main"
      textcontent={props.textcontent}
      backgroundcolor="primary"
      variant="actionMedium"
      onClick={props.onClick}
      href={props.href}
      sx={{
        ...props.sx,
      }}
    />
  )
}

export const PrimaryLightButton = (props: IButtonProps) => {
  return (
    <BaseButton
      textcolor="textDark100.main"
      textcontent={props.textcontent}
      backgroundcolor="backgroundLight300"
      variant="actionMedium"
      onClick={props.onClick}
      sx={{
        ...props.sx,
      }}
    />
  )
}

export const SecondaryDarkButton = (props: IButtonProps) => {
  return (
    <BaseButton
      disabled={props.disabled}
      textcolor="textLight100.main"
      textcontent={props.textcontent}
      backgroundcolor="backgroundDark400"
      onClick={props.onClick}
      variant="actionMedium"
    />
  )
}
export const SecondaryLightButton = (props: IButtonProps) => {
  return (
    <BaseButton
      textcolor="textDark200.main"
      textcontent={props.textcontent}
      backgroundcolor="backgroundLight300"
      variant="actionMedium"
      onClick={props.onClick}
    />
  )
}

export const PrimaryDarkIconButton = (props: IButtonProps) => {
  return (
    <BaseButton
      startIcon={props.startIcon && props.startIcon}
      endIcon={props.endIcon && props.endIcon}
      textcolor="textLight100.main"
      textcontent={props.textcontent}
      backgroundcolor="primary"
      variant="actionMedium"
      onClick={props.onClick}
    />
  )
}

export const PrimaryLightIconButton = (props: IButtonProps) => {
  return (
    <BaseButton
      startIcon={props.startIcon && props.startIcon}
      endIcon={props.endIcon && props.endIcon}
      textcolor="textDark100.main"
      textcontent={props.textcontent}
      backgroundcolor="backgroundLight300"
      variant="actionMedium"
      onClick={props.onClick}
    />
  )
}

export const SecondaryDarkIconButton = (props: IButtonProps) => {
  return (
    <BaseButton
      startIcon={props.startIcon && props.startIcon}
      endIcon={props.endIcon && props.endIcon}
      textcolor="textLight100.main"
      textcontent={props.textcontent}
      backgroundcolor="backgroundDark400"
      variant="actionMedium"
      onClick={props.onClick}
    />
  )
}

export const SecondaryLightIconButton = (props: IButtonProps) => {
  return (
    <BaseButton
      startIcon={props.startIcon && props.startIcon}
      endIcon={props.endIcon && props.endIcon}
      textcolor="textDark200.main"
      textcontent={props.textcontent}
      backgroundcolor="backgroundLight300"
      variant="actionMedium"
      onClick={props.onClick}
    />
  )
}
