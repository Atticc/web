import { ATTICC_API_ENDPOINT } from '@app/config'
import { gql, request } from 'graphql-request'
import { useQuery } from 'react-query'
import { ATTIC_DEFAULT_HEADERS } from './headers'
export interface GetCommentsRequest {
  postId: string
  offset?: number
}

export interface CreateCommentRequest {
  address: string
  postId: string
  message: string
  imageUrl?: string | null
}

// export const GET_COMMENTS = gql`
//   query MyQuery($offset: Int = 0, $postId: uuid! = "") {
//     atticcdev_comment(limit: 100, offset: $offset, where: { archived: { _neq: false }, postId: { _eq: $postId } }, order_by: { updatedAt: desc }) {
//       author {
//         address
//         avatar
//         domain
//       }
//       createdAt
//       updatedAt
//       id
//       imageUrl
//       likesCount
//       message
//       repliesCount
//       replies(limit: 50, where: { archived: { _neq: false } }, offset: 0, order_by: { updatedAt: desc }) {
//         author {
//           address
//           avatar
//           domain
//         }
//         createdAt
//         id
//         imageUrl
//         likesCount
//         message
//         postId
//         updatedAt
//       }
//     }
//   }
// `

// export const getComments = async ({ postId, offset = 0 }: GetCommentsRequest) => {
//   try {
//     const res = await request(ATTICC_API_ENDPOINT, GET_COMMENTS, { postId, offset }, ATTIC_DEFAULT_HEADERS)
//     return res
//   } catch (err) {
//     return null
//   }
// }

// export function useComments({ postId, offset = 0, ...props }: GetCommentsRequest) {
//   return useQuery(['comments', postId], async () => getComments({ postId, offset }), {
//     enabled: false,
//     ...props,
//   })
// }

export const CREATE_COMMENT = gql`
  mutation MyMutation($message: String, $address: String, $imageUrl: String, $postId: uuid) {
    insert_atticcdev_comment_one(
      object: { postId: $postId, authorAddress: $address, imageUrl: $imageUrl, message: $message }
    ) {
      id
    }
  }
`

export const createComment = async ({ address, message, postId, imageUrl }: CreateCommentRequest) => {
  try {
    const res = await request(
      ATTICC_API_ENDPOINT,
      CREATE_COMMENT,
      { address, message, postId, imageUrl },
      ATTIC_DEFAULT_HEADERS
    )
    return res
  } catch (err) {
    return null
  }
}

export function useCreateComment({ address, message, postId, imageUrl, ...props }: CreateCommentRequest) {
  return useQuery(['comment', postId], async () => createComment({ address, message, postId, imageUrl }), {
    enabled: false,
    ...props,
  })
}
