import ProfileImage from '@c/users/Avatar'
import { Avatar, Button, Divider, Grid, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { formatAddress, formatDate, formatTime } from '@utils/helper'
import { IPost } from '../../app/constants'
import CommentInput from './CommentInput'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { CommentListItem } from './CommentListItem'
import { useEffect, useState } from 'react'
import { usePosts } from '@req/atticc/posts'
import Link from 'next/link'

export const PostListItem = ({ post }: { post: IPost | undefined }) => {
  const [item, setItem] = useState(post)
  const color = useTheme().palette
  const [commentSize, setCommentSize] = useState(1)
  const { data: postData = [], refetch: refetchPost, isLoading } = usePosts({ postId: post?.id })

  useEffect(() => {
    if (postData?.[0] && post?.id === postData?.[0].id) {
      setItem(postData?.[0])
    }
  }, [postData])

  if (!item) {
    return null
  }

  return (
    <Grid container direction={'column'} borderRadius={4} px={4} py={5} bgcolor={color.white.main}>
      <Grid item>
        <Stack direction={'row'}>
          <Stack direction={'column'}>
            <Link passHref href={`/users/${item?.authorAddress}`}>
              <a>
                <ProfileImage
                  sx={{ height: 90, width: 90 }}
                  address={item?.authorAddress || ''}
                  src={item?.author?.avatar || undefined}
                />
              </a>
            </Link>
            <Divider orientation={'vertical'} flexItem />
          </Stack>
          <Stack direction={'column'} pl={2} flexGrow={1}>
            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
              <Link passHref href={`/users/${item?.authorAddress}`}>
                <Typography variant="h5" component={'a'} sx={{ cursor: 'pointer' }}>
                  {item.author?.domain || formatAddress(item?.authorAddress) || ''}
                </Typography>
              </Link>
              <Stack direction={'row'}>
                <Typography variant="body2">
                  {formatDate(new Date(item.updatedAt))} at {formatTime(new Date(item.updatedAt))}
                </Typography>
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
              {item.description}
            </Typography>
            {item?.imageUrl ? (
              <Avatar src={item?.imageUrl} variant={'rounded'} sx={{ width: '100%', height: 240, pt: 2 }} />
            ) : null}
            <Stack direction={'row'} alignItems="center" pt={2}>
              <Button sx={{ pr: 2 }} disabled>
                <ChatBubbleOutlineIcon fontSize="small" />
                <Typography pl={1} color={color.black.main} fontWeight={600}>
                  {item.comments?.length || item.commentsCount}
                </Typography>
              </Button>
              <Button sx={{ px: 2 }}>
                <FavoriteBorderIcon fontSize="small" />
                <Typography pl={1} color={color.black.main} fontWeight={600}>
                  {item.likesCount}
                </Typography>
              </Button>
              <Tooltip title={'Coming soon'}>
                <Button sx={{ px: 2 }}>
                  <ShareIcon fontSize="small" />
                  <Typography pl={1} color={color.black.main} fontWeight={600}>
                    {item.sharesCount}
                  </Typography>
                </Button>
              </Tooltip>
              <Tooltip title={'Coming soon'}>
                <Button sx={{ px: 2 }}>
                  <MoreHorizIcon fontSize="small" />
                </Button>
              </Tooltip>
            </Stack>
            <Divider flexItem sx={{ py: 1 }} />
            <CommentInput
              onSend={async () => {
                await refetchPost()
              }}
              key={item.id}
              postId={item.id}
            />
            {item?.comments?.slice(0, commentSize).map((c) => (
              <CommentListItem key={c?.id} comment={c} />
            ))}
          </Stack>
        </Stack>
      </Grid>
      <Grid item>
        {commentSize < (item?.comments?.length || 1) ? (
          <Button
            fullWidth
            variant={'fill'}
            onClick={() => setCommentSize(Math.min(commentSize + 5, item?.comments?.length || Infinity))}
          >
            view more comments
          </Button>
        ) : null}
      </Grid>
    </Grid>
  )
}
