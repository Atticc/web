import { alpha, createTheme, PaletteMode } from '@mui/material'
import { red } from '@mui/material/colors'

export const getDesignTokens = (mode: PaletteMode) => {
  const theme = createTheme()

  return {
    palette: {
      mode,
      tonalOffset: 0.2,
      primary: { main: '#F26E21' },
      secondary: { main: '#0AB2A9' },
      modalbgcolor: { main: '#1c0715cc' },
      radioColor: {
        main: '#79263A',
      },
      radioCheckedColor: {
        main: '#AA4656',
      },
      error: {
        main: red.A400,
      },
      white: { main: '#fff' },
      black: { main: '#17181B' },
      gray: { main: '#B3B4C6' },
      ...(mode === 'light'
        ? {
            dark: { main: '#17181B' },
            light: { main: '#ffffff' },
          }
        : {
            dark: { main: '#ffffff' },
            light: { main: '#17181B' },
          }),
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'outline' },
            style: ({ theme: t }: { theme: any }) => ({
              borderRadius: '10px',
              borderWidth: '2px',
              borderColor: t.palette.white.main,
              color: t.palette.white.main,
              borderStyle: 'solid',
              padding: '10px 22px',
              boxShadow: 'none',
              lineHeight: 'normal',
              fontSize: 16,
              '& #text': {
                textTransform: 'uppercase',
                fontWeight: 600,
              },
              '&:hover': {
                textDecoration: 'none',
                backgroundColor: t.palette.black.main,
                borderColor: t.palette.black.main,
                color: t.palette.primary.main,
                '@media (hover: none)': {
                  color: t.palette.white.main,
                  backgroundColor: 'transparent',
                  borderColor: t.palette.white.main,
                },
              },
            }),
          },
          {
            props: { variant: 'outline', color: 'secondary' },
            style: {
              borderColor: 'white.main',
            },
          },
          {
            props: { variant: 'fill' },
            style: ({ theme: t }: { theme: any }) => ({
              borderRadius: '10px',
              color: t.palette.white.main,
              backgroundColor: t.palette.primary.main,
              padding: '10px 22px',
              boxShadow: 'none',
              lineHeight: 'normal',
              fontSize: 16,
              '& #text': {
                textTransform: 'uppercase',
                fontWeight: 600,
              },
              '&:hover': {
                textDecoration: 'none',
                color: t.palette.primary.main,
                backgroundColor: t.palette.white.main,
                '@media (hover: none)': {
                  color: t.palette.white.main,
                  backgroundColor: t.palette.primary.main,
                },
              },
            }),
          },
        ],
      },
      MuiTypography: {
        variants: [
          {
            props: { variant: 'action' },
            style: ({ theme: t }: { theme: any }) => ({
              fontSize: 16,
              fontWeight: 600,
              lineHeight: '19.35px',
              letterSpacing: 0.1,
              cursor: 'pointer',
              '&:hover': {
                color: t.palette.black.main,
              },
            }),
          },
        ],
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        'Poppins',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h1: {
        fontSize: 36,
        lineHeight: '45px',
        fontWeight: 500,
        fontFamily: 'Poppins',
        [theme.breakpoints.up('md')]: {
          lineHeight: '68px',
          fontSize: 55,
        },
      },
      h2: {
        fontSize: 28,
        fontFamily: 'Poppins',
        fontWeight: 600,
        lineHeight: '35px',
        [theme.breakpoints.up('md')]: {
          lineHeight: '51px',
          fontSize: 36,
        },
      },
      h3: {
        fontSize: 20,
        fontFamily: 'Poppins',
        fontWeight: 600,
        lineHeight: '33px',
        [theme.breakpoints.up('md')]: {
          lineHeight: '46px',
          fontSize: 28,
        },
      },
      h4: {
        fontSize: 18,
        fontFamily: 'Poppins',
        fontWeight: 600,
        lineHeight: '26px',
        [theme.breakpoints.up('md')]: {
          lineHeight: '36px',
          fontSize: 24,
        },
      },
      h5: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: 600,
        lineHeight: '30px',
        [theme.breakpoints.up('md')]: {
          lineHeight: '29px',
          fontSize: 20,
        },
      },
      body1: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: '27px',
      },
      body2: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '22px',
        letterSpacing: 0.16,
      },
      caption1: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: '17px',
        letterSpacing: 0.16,
      },
      caption2: {
        fontSize: 12,
        fontWeight: 400,
        lineHeight: '17px',
      },
      menu1: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '21px',
      },
      footer1: {
        fontSize: 16,
        fontWeight: 500,
        lineHeight: '37px',
      },
    },
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    dark: Palette['primary']
    light: Palette['primary']
    black: Palette['primary']
    white: Palette['primary']
    gray: Palette['primary']
    primary: Palette['primary']
    modalbgcolor: Palette['primary']
    radioColor: Palette['primary']
    radioCheckedColor: Palette['primary']
  }
  interface PaletteOptions {
    dark: PaletteOptions['primary']
    light: PaletteOptions['primary']
    black: PaletteOptions['primary']
    white: PaletteOptions['primary']
    gray: PaletteOptions['primary']
    modalbgcolor: PaletteOptions['primary']
    radioColor: PaletteOptions['primary']
    radioCheckedColor: PaletteOptions['primary']
  }
  interface TypographyVariants {
    menu1: React.CSSProperties
    footer1: React.CSSProperties
    caption1: React.CSSProperties
    caption2: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    menu1?: React.CSSProperties
    footer1?: React.CSSProperties
    caption1?: React.CSSProperties
    caption2?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    action: true
    menu1: true
    footer1: true
    caption1: true
    caption2: true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    outline: true
    fill: true
  }
  interface ButtonPropsColorOverrides {
    dark: true
    light: true
    black: true
    white: true
    gray: true
    primary: true
    modalbgcolor: true
    radioColor: true
    radioCheckedColor: true
  }
}
declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    dark: true
    light: true
    black: true
    white: true
    gray: true
    primary: true
    radioColor: true
    radioCheckedColor: true
  }
}

export default getDesignTokens
