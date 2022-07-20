import ProfileImage from '@c/users/Avatar'
import { Button, Divider, Grid, Stack, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { formatAddress, formatDate, formatTime } from '@utils/helper'
import { IPost } from '../../app/constants'
import CommentInput from './CommentInput'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { CommentListItem } from './CommentListItem'
import { useState } from 'react'

export const PostListItem = ({ post }: { post: IPost | undefined }) => {
  const colorTheme = useTheme().palette
  const [commentSize, setCommentSize] = useState(1)

  if (!post) {
    return null
  }

  return (
    <Grid container direction={'column'} borderRadius={4} px={4} py={5} bgcolor={colorTheme.white.main}>
      <Grid item>
        <Stack direction={'row'}>
          <Stack direction={'column'}>
            <Box sx={{ borderColor: 'black', borderWidth: 4, borderStyle: 'solid', borderRadius: '50%' }}>
              <ProfileImage sx={{ height: 90, width: 90 }} address={post?.authorAddress || ''} />
            </Box>
            <Divider orientation={'vertical'} flexItem />
          </Stack>
          <Stack direction={'column'} pl={2} flexGrow={1}>
            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
              <Typography variant="h5">{post.author?.domain || formatAddress(post?.authorAddress) || ''}</Typography>
              <Stack direction={'row'}>
                <Typography variant="body2">{formatDate(new Date(post.updatedAt))} at {formatTime(new Date(post.updatedAt))}</Typography>
              </Stack>
            </Stack>
            <Typography
              variant="body1"
              sx={{
                wordWrap: 'break-word',
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                // WebkitLineClamp: 3,
                whiteSpace: 'pre-line',
              }}
            >
              {post.description}
            </Typography>
            <Stack direction={'row'} alignItems="center" pt={2}>
              <Button sx={{ pr: 2 }}>
                <ChatBubbleOutlineIcon fontSize="small" />
                <Typography pl={1}>{post.commentsCount}</Typography>
              </Button>
              <Button sx={{ px: 2 }}>
                <FavoriteBorderIcon fontSize="small" />
                <Typography pl={1}>{post.likesCount}</Typography>
              </Button>
              <Button sx={{ px: 2 }}>
                <ShareIcon fontSize="small" />
                <Typography pl={1}>{post.sharesCount}</Typography>
              </Button>
              <Button sx={{ px: 2 }}>
                <MoreHorizIcon fontSize="small" />
              </Button>
            </Stack>
            <Divider flexItem sx={{ py: 1 }} />
            <CommentInput onSend={async () => {}} key={post?.authorAddress} />
            {post?.comments?.slice(0, commentSize).map((c) => (
              <CommentListItem key={c?.id} comment={c} />
            ))}
          </Stack>
        </Stack>
      </Grid>
      <Grid item>
        {commentSize < (post?.comments?.length || 1) ? (
          <Button
            fullWidth
            variant={'fill'}
            onClick={() => setCommentSize(Math.min(commentSize + 5, post?.comments?.length || Infinity))}
          >
            view more comments
          </Button>
        ) : null}
      </Grid>
    </Grid>
  )
}
