import Header from './Header'
import { Box, Container } from '@mui/material'

function LayoutWithoutFooter({ children }: { children: React.ReactNode }) {
  return (
    <Box maxHeight={'100vh'}>
      <Header />
      <Container
        maxWidth={false}
        sx={{
          margin: 0,
          padding: {
            xs: 0,
          },
          width: 1,
          maxWidth: 1,
          overflowX: 'hidden'
        }}
      >
        {children}
      </Container>
    </Box>
  )
}

export default LayoutWithoutFooter
