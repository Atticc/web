import { ATTICC_API_ENDPOINT } from '@app/config'
import { gql, request } from 'graphql-request'
import { useQuery } from 'react-query'
import { ATTIC_DEFAULT_HEADERS } from './headers'
export interface GetPostsRequest {
  addresses?: Array<string>
}
export interface CreatePostsRequest {
  address: string
  description: string
  imageUrl?: string | null
  title?: string | null
}

export const GET_POSTS = gql`
  query MyQuery($addresses: [String]) {
    atticcdev_post(where: { authorAddress: { _in: $addresses } }, order_by: { updatedAt: desc }) {
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
      authorAddress
      author {
        address
        avatar
        domain
      }
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

export const getPosts = async ({ addresses }: GetPostsRequest) => {
  try {
    const { atticcdev_post } = await request(ATTICC_API_ENDPOINT, GET_POSTS, { addresses }, ATTIC_DEFAULT_HEADERS)
    return atticcdev_post
  } catch (err) {
    return null
  }
}

export function usePosts({ addresses, ...props }: GetPostsRequest) {
  return useQuery(['posts', String(addresses)], async () => getPosts({ addresses }), {
    enabled: false,
    ...props,
  })
}

export const CREATE_POSTS = gql`
  mutation MyMutation($description: String, $address: String, $imageUrl: String) {
    insert_atticcdev_post_one(object: { authorAddress: $address, description: $description, imageUrl: $imageUrl }) {
      id
    }
  }
`

export const createPost = async ({ address, description, imageUrl }: CreatePostsRequest) => {
  try {
    const res = await request(
      ATTICC_API_ENDPOINT,
      CREATE_POSTS,
      { address, description, imageUrl },
      ATTIC_DEFAULT_HEADERS
    )
    return res
  } catch (err) {
    return null
  }
}

export function useCreatePost({ address, description, imageUrl, ...props }: CreatePostsRequest) {
  return useQuery(['posts', address], async () => createPost({ address, description, imageUrl }), {
    enabled: false,
    ...props,
  })
}
