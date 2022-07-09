import Head from 'next/head'
import Header from './Header'
import { Box, Container } from '@mui/material'
import { useDimensions } from '../../utils/useDimensions'

function LayoutWithoutFooter({ children }: { children: React.ReactNode }) {
  const { height } = useDimensions()

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Header />
      <Container
        sx={{
          minHeight: { xs: height - 340, md: height - 220 },
          position: 'relative',
          margin: 0,
          padding: {
            xs: 0,
          },
          width: 1,
          maxWidth: {
            sm: 1,
          },
        }}
      >
        {children}
      </Container>
    </Box>
  )
}

export default LayoutWithoutFooter
