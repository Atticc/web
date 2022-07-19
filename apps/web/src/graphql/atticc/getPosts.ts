import { ATTICC_API_ENDPOINT } from '@app/config'
import { gql, request } from 'graphql-request'
import { useQuery } from 'react-query'
import { ATTIC_DEFAULT_HEADERS } from './headers'
export interface GetPostsRequest {
  address?: string
}

export const GET_POSTS = gql`
  query MyQuery($address: [String]) {
    atticcdev_post(where: { authorAddress: { _in: $address } }) {
      commentsCount
      createdAt
      description
      id
      imageUrl
      likesCount
      postId
      title
      updatedAt
      sharesCount
      comments(limit: 50) {
        createdAt
        id
        imageUrl
        likesCount
        message
        author {
          address
          avatar
          domain
        }
      }
    }
  }
`

export const getPosts = async ({ address }: GetPostsRequest) => {
  try {
    const res = await request(ATTICC_API_ENDPOINT, GET_POSTS, { address }, ATTIC_DEFAULT_HEADERS)
    return res
  } catch (err) {
    return null
  }
}

export function useOATs({ address, ...props }: GetPostsRequest) {
  return useQuery(['oats', address], async () => getPosts({ address }), {
    enabled: false,
    ...props,
  })
}
