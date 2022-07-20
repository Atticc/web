import { Grid, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { IPost } from '../../app/constants'

export const PostListItem = ({ post }: { post: IPost | undefined }) => {
  const colorTheme = useTheme().palette

  if (!post) {
    return null
  }

  return (
    <Link href={`/communities/${post.communityId}/posts/${post.id}`}>
      <Grid
        container
        direction={'column'}
        sx={{
          borderRadius: 4,
          border: 0.4,
          paddingX: 2,
          paddingY: 3,
          marginY: 1,
          cursor: 'pointer',
        }}
      >
        <Typography variant="h3">{post.title}</Typography>
        <Typography variant="h5">{post.description}</Typography>
        <Typography variant="h5">{`author: ${post.authorAddress}`}</Typography>
      </Grid>
    </Link>
  )
}
