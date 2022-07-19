import { ATTICC_API_ENDPOINT } from '@app/config'
import { gql, request } from 'graphql-request'
import { useQuery } from 'react-query'
import { ATTIC_DEFAULT_HEADERS } from './headers'

export enum ActionType {
  BOOKMARK = 'BOOKMARK',
  LIKE = 'LIKE',
  SHARE = 'SHARE',
}

interface GetFavoriteRequest {
  address: string
  commentId?: string
  postId?: string
  type?: ActionType
}

export const GET_FAV = gql`
  query MyQuery($address: String, $commentId: uuid, $postId: uuid, type: ACTION_TYPE = 'LIKE') {
  atticcdev_action(where: {
    user_address: {_eq: $address}, action: {_eq: $type}, post_id: {_eq: $postId}, comment_id: {_eq: $commentId}
  }) {
    user_address
    post_id
    comment_id
    action
  }
}

`

export const getFavorite = async ({ address, commentId, postId, type = ActionType.LIKE }: GetFavoriteRequest) => {
  try {
    const res = await request(ATTICC_API_ENDPOINT, GET_FAV, { address, commentId, postId, type }, ATTIC_DEFAULT_HEADERS)
    return res
  } catch (err) {
    return null
  }
}

export function useOATs({ address, commentId, postId, type, ...props }: GetFavoriteRequest) {
  return useQuery(['oats', address], async () => getFavorite({ address, commentId, postId, type }), {
    enabled: false,
    ...props,
  })
}
