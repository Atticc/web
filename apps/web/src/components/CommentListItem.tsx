import { Grid, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { IComment } from '../app/constants'

export const CommentListItem = ({ comment }: { comment: IComment | undefined }) => {
  const colorTheme = useTheme().palette

  if (!comment) {
    return null
  }

  return (
    <Grid
      container
      direction={'column'}
      sx={{
        borderRadius: 4,
        border: 0.2,
        paddingX: 2,
        paddingY: 3,
        marginY: 1,
        width: '90%',
        alignSelf: 'end',
      }}
    >
      <Typography variant="h3">{comment.message}</Typography>

      <Typography variant="h5">author: {comment.owner}</Typography>
    </Grid>
  )
}
