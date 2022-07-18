export interface IMenu {
  title: string
  path: string
}

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
  author?: IUser
  communityId?: string
  community?: ICommunity
  bookmarked: boolean //whether the post is bookmarked by you
  liked: boolean //whether the post is liked by you
  likesCount: number
  sharesCount: number
  commentsCount: number
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
  author?: IUser
  liked: boolean //whether the comment is liked by you
  likesCount: number
  repliesCount: number
  postId?: string // parent post id, only one level
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
    likesCount: 0,
    repliesCount: 0,
    archived: false,
  },
  {
    message: 'Example comment 2',
    id: '2',
    createdAt: Date(),
    updatedAt: Date(),
    authorAddress: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    liked: false,
    likesCount: 0,
    repliesCount: 0,
    archived: false,
  },
  {
    message: 'Example comment 3',
    id: '3',
    createdAt: Date(),
    updatedAt: Date(),
    authorAddress: '0x983110309620d911731ac0932219af06091b6744',
    liked: false,
    likesCount: 0,
    repliesCount: 0,
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
    likesCount: 0,
    commentsCount: 0,
    archived: false,
    bookmarked: false,
    sharesCount: 0,
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
    likesCount: 0,
    commentsCount: 0,
    archived: false,
    bookmarked: false,
    sharesCount: 0,
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
    likesCount: 0,
    commentsCount: 0,
    archived: false,
    bookmarked: false,
    sharesCount: 0,
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

export const LANDING_PROFILES = [
  {
    name: 'vitalik.eth',
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    image:
      'https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128',
  },
  {
    name: 'cyberlab.eth',
    address: '0x148d59faf10b52063071eddf4aaf63a395f2d41c',
    image: 'https://images.cybertino.io/cyberconnect_logo',
  },
  {
    name: 'pisofa.eth',
    address: '0xebed0bf2701e905b4c576b3dc943d797bac226ed',
    image:
      'https://lh3.googleusercontent.com/7ZFeNaod0-q0SuuAbg2I8ZXVNyU2XahVjpLzCXX7D_fNVUFYIKSjWdBHRaLOXUlF4zzM-mS62jQFaCzw1GhwF8jGFwTYV6dm7_1NxoA=s128',
  },
  {
    name: 'wilsonwei.eth',
    address: '0x8891075a34b58a53dddf50b8e200211ff470a580',
    image:
      'https://lh3.googleusercontent.com/ZIKDovUfNyNFYH02_TSJr5WTW6eJj0-aozhJAIWYWU24G16FIyEIplWBjEh1WIHQseMd_yZg1gpIUcgzIR7Y7XMreP0zoO1oQKQgeQ=s128',
  },
  {
    name: 'zhimao.eth',
    address: '0x8ddd03b89116ba89e28ef703fe037ff77451e38e',
    image:
      'https://lh3.googleusercontent.com/qsxnWQWDdIUW67jNYMSmVIbDQri367mRucU7dELJTG0hGBgy11UoaSYLAixy7vnuUqJhg7yhgW5fybts2gmcJd5dQcA7MYgXjRF0Qw=s128',
  },
  {
    name: 'wearehiring.eth',
    address: '0x7c04786f04c522ca664bb8b6804e0d182eec505f',
    image: './assets/0x7c04786f04c522ca664bb8b6804e0d182eec505f.png',
  },
  {
    name: 'wanghanyang.eth',
    address: '0xf8df289f0a0220f557d0b2b64247bc15af91a82b',
    image:
      'https://lh3.googleusercontent.com/L6qMNQ8kf2yX61RlBMHwazZJ9OQOpDowVY3GWV40yn6fWbBApi3rYH0HIwVLAZMLok1Zwygrg6CcY1MNlgFQcwU_Dy2TbTM2zw3eR6Q=w600',
  },
  {
    name: 'nick.eth',
    address: '0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5',
    image:
      'https://lh3.googleusercontent.com/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE=s128',
  },
  {
    name: 'spadequeen7.eth',
    address: '0x5fd9b0b7e15b4d106624ea9cf96602996c9c344d',
    image:
      'https://lh3.googleusercontent.com/IWNUt93gg5kwF3VodiYiy1IoVvjI87gqKaf0BYiqzlVRTzUf8WJksJxsYoeEH4aguzv_o8JjphvDXL1DdnUKqXsbk4y6Whoy9PITag=s128',
  },
  {
    name: 'akasuv.eth',
    address: '0xbd358966445e1089e3add528561719452fb78198',
    image:
      'https://lh3.googleusercontent.com/9mGrAiuaK3qp0E2PHPt0BDARna7iA6svbQEYzMNM6YnuQkYeVJn_tdlMzIYT7QKTDRihgraYgQ_BFRZUPhIjUPnavEXj8ThqYnVu7vQ=s128',
  },
  {
    name: 'ivyli.eth',
    address: '0x1e25653ff9852119360c9f8d796969fafc048929',
    image:
      'https://lh3.googleusercontent.com/MgnHOIOyPhyWkVmFrFXJ3Sb88gvHH-K4CWadkEIQdDNF7K_93-gwiloxcKWSQJ0HuYtW2qSu79als_PRiDr4noq5rnIRoSqcoA4weww=s128',
  },
  {
    name: 'peiwen.eth',
    address: '0xc47aa859fa329496db6d498165da7e0b1fe13430',
    image: 'https://gif-avatars.com/img/200x200/joker-1.gif',
  },
  {
    name: 'chelseaaa.eth',
    address: '0x19af5e0a45c55c0f2edb5f48abbed82360de7dd7',
    image: './assets/0x19aF5e0a45c55c0f2edB5f48Abbed82360De7dD7.png',
  },
  {
    name: 'atticknight.eth',
    address: '0xc81082690edc8cde6d83a7549aa6a74534305372',
    image: './assets/0xC81082690EDC8CDE6D83a7549aa6a74534305372.png',
  },
  {
    name: '0xminion.eth',
    address: '0xe085327c5ad2f77147f10973fed45fb19d734f7e',
    image: './assets/0xe085327c5ad2f77147f10973fed45fb19d734f7e.png',
  },
  {
    name: 'atticcburger.eth',
    address: '0x39b626b217a4e4e52a734826c18eb880fdcbf57c',
    image: './assets/0x39b626b217a4e4e52a734826c18eb880fdcbf57c.png',
  },
  {
    name: 'monify.eth',
    address: '0x4892eC28B9c865BB5b52c0321979E1ec22881f7c',
    image: './assets/0x4892eC28B9c865BB5b52c0321979E1ec22881f7c.png',
  },
]
