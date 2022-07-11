import Header from './Header'
import { Box, Container } from '@mui/material'

function LayoutWithoutFooter({ children }: { children: React.ReactNode }) {
  return (
    <Box maxHeight={'100vh'}>
      <Header />
      <Container
        sx={{
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
