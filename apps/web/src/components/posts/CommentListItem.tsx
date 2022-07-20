import ProfileImage from '@c/users/Avatar'
import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material'
import { formatAddress, formatDate, formatTime } from '@utils/helper'
import { IComment } from '../../app/constants'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

export const CommentListItem = ({ comment }: { comment: IComment | undefined }) => {
  const colorTheme = useTheme().palette

  if (!comment) {
    return null
  }

  return (
    <Grid container direction={'column'} py={3}>
      <Grid item>
        <Stack direction={'row'}>
          <Stack direction={'column'}>
            <Box sx={{ borderColor: 'black', borderWidth: 4, borderStyle: 'solid', borderRadius: '50%' }}>
              <ProfileImage sx={{ height: 70, width: 70 }} address={comment?.authorAddress || ''} />
            </Box>
          </Stack>
          <Stack direction={'column'} pl={2} flexGrow={1}>
            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
              <Typography variant="body1" fontWeight={600}>
                {comment.author?.domain || formatAddress(comment?.authorAddress) || ''}
              </Typography>
              <Stack direction={'row'}>
                <Typography variant="body2">
                  {formatDate(new Date(comment.updatedAt))} at {formatTime(new Date(comment.updatedAt))}
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
              {comment.message}
            </Typography>
            <Stack direction={'row'} alignItems="center" pt={1}>
              <Button sx={{ pr: 2 }}>
                <ChatBubbleOutlineIcon fontSize="small" />
                <Typography pl={1}>{comment.repliesCount}</Typography>
              </Button>
              <Button sx={{ px: 2 }}>
                <FavoriteBorderIcon fontSize="small" />
                <Typography pl={1}>{comment.likesCount}</Typography>
              </Button>
              <Button sx={{ px: 2 }}>
                <MoreHorizIcon fontSize="small" />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}
