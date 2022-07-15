import { alpha, PaletteMode } from '@mui/material'
import { red } from '@mui/material/colors'

export const getDesignTokens = (mode: PaletteMode) => ({
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
    ...(mode === 'light'
      ? {
          dark: { main: '#000000' },
          light: { main: '#ffffff' },
          backgroundDark100: { main: '#320D1E' },
          backgroundDark200: { main: '#3B1325' },
          backgroundDark300: { main: '#3D1426', dark: '#4e2537' },
          backgroundDark400: { main: '#5E2A49', dark: '#6f3b50' },
          backgroundDark500: { main: '#7C4466' },
          backgroundLight100: { main: '#FDFAF8' },
          backgroundLight200: { main: '#FAF5F2' },
          backgroundLight300: { main: '#F6EFEA', dark: '#e5DED9' },
          backgroundLight400: { main: '#D0C3BA' },
          backgroundLight500: { main: '#D0C3BA' },
          textDark100: { main: '#43000B' },
          textDark200: { main: '#63475E' },
          textDark300: { main: '#B78EA7' },
          textLight100: { main: '#FDFAF8' },
          textLight200: { main: '#FAF5F2' },
          textLight300: { main: '#F6EFEA' },
        }
      : {
          dark: { main: '#ffffff' },
          light: { main: '#000000' },
          backgroundDark100: { main: '#320D1E' },
          backgroundDark200: { main: '#3B1325' },
          backgroundDark300: { main: '#3D1426', dark: '#4e2537' },
          backgroundDark400: { main: '#5E2A49', dark: '#6f3b50' },
          backgroundDark500: { main: '#7C4466' },
          backgroundLight100: { main: '#FDFAF8' },
          backgroundLight200: { main: '#FAF5F2' },
          backgroundLight300: { main: '#F6EFEA', dark: '#e5DED9' },
          backgroundLight400: { main: '#D0C3BA' },
          backgroundLight500: { main: '#D0C3BA' },
          textDark100: { main: '#43000B' },
          textDark200: { main: '#63475E' },
          textDark300: { main: '#B78EA7' },
          textLight100: { main: '#FDFAF8' },
          textLight200: { main: '#FAF5F2' },
          textLight300: { main: '#F6EFEA' },
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
            borderColor: t.palette.dark.main,
            color: t.palette.dark.main,
            borderStyle: 'solid',
            padding: '10px 22px',
            boxShadow: 'none',
            lineHeight: 'normal',
            fontSize: 16,
            '& #text': {
              textTransform: 'capitalize',
              fontWeight: 500,
            },
            '&:hover': {
              textDecoration: 'none',
              backgroundColor: t.palette.light.main,
              borderColor: t.palette.light.main,
              color: t.palette.primary.main,
              '@media (hover: none)': {
                color: t.palette.dark.main,
                backgroundColor: 'transparent',
                borderColor: t.palette.dark.main,
              },
            },
          }),
        },
        {
          props: { variant: 'outline', color: 'secondary' },
          style: {
            borderColor: 'light.main',
          },
        },
      ],
    },
    // MuiCssBaseline: {
    // styleOverrides: `
    //   @font-face {
    //     font-family: 'RightGroteskSpatialBold';
    //     font-display: swap;
    //     src: local('RightGrotesk'), local('RightGrotesk-SpatialBold'), url('/fonts/RightGrotesk-SpatialBold.woff2') format('woff2');
    //     unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
    //   }
    // },
  },
  typography: {
    fontFamily: [
      'Inter',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    title: {
      fontSize: 55,
      fontWeight: 400,
      lineHeight: '64px',
    },
    h1: {
      fontSize: 48,
      // fontFamily: 'RightGroteskSpatialDark',
      fontWeight: 400,
      lineHeight: '64px',
    },
    h2: {
      fontSize: 32,
      // fontFamily: 'RightGroteskSpatialBold',
      fontWeight: 400,
      lineHeight: '48px',
    },
    h3: {
      fontSize: 24,
      // fontFamily: 'RightGroteskWideBold',
      fontWeight: 400,
      lineHeight: '28.8px',
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '16.41px',
    },
    bodyMedium: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '18.75px',
    },
    bodyLarge: {
      fontSize: 20,
      fontWeight: 400,
      lineHeight: '32px',
    },
    actionSmall: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '16.41px',
    },
    actionMedium: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: '18.75px',
    },
    actionLarge: {
      fontSize: 20,
      fontWeight: 500,
      lineHeight: '32px',
    },
    tagSmall: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '16.41px',
    },
  },
})

declare module '@mui/material/styles' {
  interface Palette {
    dark: Palette['primary']
    light: Palette['primary']
    primary: Palette['primary']
    backgroundDark100: Palette['primary']
    backgroundDark200: Palette['primary']
    backgroundDark300: Palette['primary']
    backgroundDark400: Palette['primary']
    backgroundDark500: Palette['primary']
    backgroundLight100: Palette['primary']
    backgroundLight200: Palette['primary']
    backgroundLight300: Palette['primary']
    backgroundLight400: Palette['primary']
    backgroundLight500: Palette['primary']
    textLight100: Palette['primary']
    textLight200: Palette['primary']
    textLight300: Palette['primary']
    textDark100: Palette['primary']
    textDark200: Palette['primary']
    textDark300: Palette['primary']
    modalbgcolor: Palette['primary']
    radioColor: Palette['primary']
    radioCheckedColor: Palette['primary']
  }
  interface PaletteOptions {
    dark: PaletteOptions['primary']
    light: PaletteOptions['primary']
    backgroundDark100: PaletteOptions['primary']
    backgroundDark200: PaletteOptions['primary']
    backgroundDark300: PaletteOptions['primary']
    backgroundDark400: PaletteOptions['primary']
    backgroundDark500: PaletteOptions['primary']
    backgroundLight100: PaletteOptions['primary']
    backgroundLight200: PaletteOptions['primary']
    backgroundLight300: PaletteOptions['primary']
    backgroundLight400: PaletteOptions['primary']
    backgroundLight500: PaletteOptions['primary']
    textLight100: PaletteOptions['primary']
    textLight200: PaletteOptions['primary']
    textLight300: PaletteOptions['primary']
    textDark100: PaletteOptions['primary']
    textDark200: PaletteOptions['primary']
    textDark300: PaletteOptions['primary']
    modalbgcolor: PaletteOptions['primary']
    radioColor: PaletteOptions['primary']
    radioCheckedColor: PaletteOptions['primary']
  }
  interface TypographyVariants {
    title: React.CSSProperties
    bodySmall: React.CSSProperties
    bodyMedium: React.CSSProperties
    bodyLarge: React.CSSProperties
    actionSmall: React.CSSProperties
    actionMedium: React.CSSProperties
    actionLarge: React.CSSProperties
    tagSmall: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    title?: React.CSSProperties
    bodySmall?: React.CSSProperties
    bodyMedium?: React.CSSProperties
    bodyLarge?: React.CSSProperties
    actionSmall?: React.CSSProperties
    actionMedium?: React.CSSProperties
    actionLarge?: React.CSSProperties
    tagSmall?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true
    bodySmall: true
    bodyMedium: true
    bodyLarge: true
    actionSmall: true
    actionMedium: true
    actionLarge: true
    tagSmall: true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    dark: true
    light: true
    primary: true
    backgroundDark100: true
    backgroundDark200: true
    backgroundDark300: true
    backgroundDark400: true
    backgroundDark500: true
    backgroundLight100: true
    backgroundLight200: true
    backgroundLight300: true
    backgroundLight400: true
    backgroundLight500: true
    textLight100: true
    textLight200: true
    textLight300: true
    textDark100: true
    textDark200: true
    textDark300: true
    modalbgcolor: true
    radioColor: true
    radioCheckedColor: true
  }
}
declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    dark: true
    light: true
    backgroundDark100: true
    backgroundDark200: true
    backgroundDark300: true
    backgroundDark400: true
    backgroundDark500: true
    backgroundLight100: true
    backgroundLight200: true
    backgroundLight300: true
    backgroundLight400: true
    backgroundLight500: true
    textLight100: true
    textLight200: true
    textLight300: true
    textDark100: true
    textDark200: true
    textDark300: true
    radioColor: true
    radioCheckedColor: true
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    outline: true
  }
}

export default getDesignTokens
