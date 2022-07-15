export interface ICommunity {
  title: string
  description: string
  id: number
  createdAt: string
  updatedAt: string
  owner: string
}

export interface IUser {
  address: string
  domain?: string
  avatar?: string
  followerCount?: number
  followingCount?: number
  twitter?: {
    handle: string
    avatar: string
  }
  isFollowing?: boolean
  recommendationReason?: string
}

export interface IPost {
  id: string
  title?: string
  description: string
  image_url?: string
  createdAt: string
  updatedAt: string
  authorAddress: string
  owner?: IUser
  communityId?: string
  community?: ICommunity
  bookmarked: boolean //whether the post is bookmarked by you
  liked: boolean //whether the post is liked by you
  likeCount: number
  shareCount: number
  commentCount: number
  comments?: Array<IComment>
  pinned: boolean
  postId?: string // quoted retweet
  archived: boolean
}
export interface IComment {
  id: string
  message: string
  image_url?: string
  createdAt: string
  updatedAt: string
  authorAddress: string
  owner?: IUser
  liked: boolean //whether the comment is liked by you
  likeCount: number
  commentCount: number
  replyCount: number
  replyId?: string // parent comment id, only one level
  replies?: [IComment]
  archived: boolean
}
export interface ILike {
  id: string
  userAddress: string
  commentId?: string
  postId?: string
}

export const comments: Array<IComment> = [
  {
    message: 'Example comment 1',
    id: '1',
    createdAt: Date(),
    updatedAt: Date(),
    authorAddress: '0xbF9B4a79a3d9e6AA3cea0fc0134A923FBB111309',
    liked: false,
    likeCount: 0,
    commentCount: 0,
    replyCount: 0,
    archived: false,
  },
  {
    message: 'Example comment 2',
    id: '2',
    createdAt: Date(),
    updatedAt: Date(),
    authorAddress: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    liked: false,
    likeCount: 0,
    commentCount: 0,
    replyCount: 0,
    archived: false,
  },
  {
    message: 'Example comment 3',
    id: '3',
    createdAt: Date(),
    updatedAt: Date(),
    authorAddress: '0x983110309620d911731ac0932219af06091b6744',
    liked: false,
    likeCount: 0,
    commentCount: 0,
    replyCount: 0,
    archived: false,
  },
]

export const posts: Array<IPost> = [
  {
    title: 'Example Post 1',
    description: 'Example Post description 1',
    id: '1',
    createdAt: Date(),
    updatedAt: Date(),
    authorAddress: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    communityId: undefined,
    comments: comments,
    liked: false,
    likeCount: 0,
    commentCount: 0,
    archived: false,
    bookmarked: false,
    shareCount: 0,
    pinned: false,
  },
  {
    title: 'Example Post 2',
    description: 'Example Post description 2',
    id: '2',
    createdAt: Date(),
    updatedAt: Date(),
    authorAddress: '0x983110309620d911731ac0932219af06091b6744',
    communityId: '1',
    liked: false,
    likeCount: 0,
    commentCount: 0,
    archived: false,
    bookmarked: false,
    shareCount: 0,
    pinned: false,
  },
  {
    title: 'Example Post 3',
    description: 'Example Post description 3',
    id: '3',
    createdAt: Date(),
    updatedAt: Date(),
    authorAddress: '0x0000...0003',
    communityId: '1',
    liked: false,
    likeCount: 0,
    commentCount: 0,
    archived: false,
    bookmarked: false,
    shareCount: 0,
    pinned: false,
  },
]

export const communities: Array<ICommunity> = [
  {
    title: 'Example Community 1',
    description: 'Example Community description 1',
    id: 1,
    createdAt: Date(),
    updatedAt: Date(),
    owner: '0xbF9B4a79a3d9e6AA3cea0fc0134A923FBB111309',
  },
  {
    title: 'Example Community 2',
    description: 'Example Community description 2',
    id: 2,
    createdAt: Date(),
    updatedAt: Date(),
    owner: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  },
  {
    title: 'Example Community 3',
    description: 'Example Community description 3',
    id: 3,
    createdAt: Date(),
    updatedAt: Date(),
    owner: '0x983110309620d911731ac0932219af06091b6744',
  },
]

export const users: Array<IUser> = [
  {
    domain: '',
    avatar: '',
    address: '0xbF9B4a79a3d9e6AA3cea0fc0134A923FBB111309',
  },
  {
    domain: 'Vitalik.eth',
    avatar: '',
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  },
  {
    domain: '',
    avatar: '',
    address: '0x983110309620d911731ac0932219af06091b6744',
  },
]
