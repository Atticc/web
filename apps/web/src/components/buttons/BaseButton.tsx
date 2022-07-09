import { Button, Typography, useTheme } from '@mui/material';
import { IBaseButtonProps } from './buttonInterface';

const BaseButton = (props: IBaseButtonProps) => {
  const colorTheme = useTheme().palette;
  return (
    <Button
      {...props}
      variant="contained"
      onClick={props.onClick}
      startIcon={props.startIcon && props.startIcon}
      endIcon={props.endIcon && props.endIcon}
      color={props.backgroundcolor}
      href={props.href}
      sx={{
        color: props.textcolor,
        borderRadius: '15px',
        margin: '10px 0',
        padding: '0 20px',
        minWidth: '110px',
        minHeight: '40px',
        boxShadow: 'none',
        textTransform: 'none',
        ...props.sx,
        '&.Mui-disabled': {
          color: colorTheme.textDark200.main,
          backgroundColor: colorTheme.backgroundDark100.main,
        },
      }}
    >
      <Typography
        variant={props.variant}
        sx={{
          lineHeight: 'normal',
        }}
      >
        {props.textcontent}
      </Typography>
    </Button>
  );
};

export default BaseButton;
