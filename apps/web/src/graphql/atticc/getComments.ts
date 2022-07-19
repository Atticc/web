import { ATTICC_API_ENDPOINT } from '@app/config'
import { gql, request } from 'graphql-request'
import { useQuery } from 'react-query'
import { ATTIC_DEFAULT_HEADERS } from './headers'
export interface GetCommentsRequest {
  postId: string
  offset?: number
}

export const GET_COMMENTS = gql`
  query MyQuery($offset: Int = 0, $postId: uuid! = "") {
    atticcdev_comment(limit: 50, offset: $offset, where: { archived: { _neq: false }, postId: { _eq: $postId } }) {
      author {
        address
        avatar
        domain
      }
      createdAt
      id
      imageUrl
      likesCount
      message
      updatedAt
      repliesCount
      replies(limit: 50, where: { archived: { _neq: false } }, offset: 0, order_by: { createdAt: desc }) {
        author {
          address
          avatar
          domain
        }
        createdAt
        id
        imageUrl
        likesCount
        message
        postId
        updatedAt
      }
    }
  }
`

export const getPosts = async ({ postId, offset = 0 }: GetCommentsRequest) => {
  try {
    const res = await request(ATTICC_API_ENDPOINT, GET_COMMENTS, { postId, offset }, ATTIC_DEFAULT_HEADERS)
    return res
  } catch (err) {
    return null
  }
}

export function useOATs({ postId, offset = 0, ...props }: GetCommentsRequest) {
  return useQuery(['comments', postId], async () => getPosts({ postId, offset }), {
    enabled: false,
    ...props,
  })
}
