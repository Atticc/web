export interface ICommunity {
  title: string;
  description: string;
  id: number;
  createdAt: string;
  owner: string;
}

export interface IUser {
  address: string;
  domain?: string;
  avatar?: string;
  followerCount?: number;
  followingCount?: number;
  social?:{
    twitter?: string;
  }
  isFollowing?: boolean;
  recommendationReason?: string;
}

export interface IPost {
  title: string;
  description: string;
  id: number;
  updatedAt: string;
  owner: string;
  communityId: number;
}
export interface IComment {
  message: string;
  id: number;
  createdAt: string;
  owner: string;
}

export const posts = [
  {title: 'Example Post 1', description: 'Example Post description 1', id: 1, updatedAt: Date(), owner: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', communityId: 1},
  {title: 'Example Post 2', description: 'Example Post description 2', id: 2, updatedAt: Date(), owner: '0x983110309620d911731ac0932219af06091b6744', communityId: 1},
  {title: 'Example Post 3', description: 'Example Post description 3', id: 3, updatedAt: Date(), owner: '0x0000...0003', communityId: 1},
]

export const communities: Array<ICommunity> = [
  {title: 'Example Community 1', description: 'Example Community description 1', id: 1, createdAt: Date(), owner: '0xbF9B4a79a3d9e6AA3cea0fc0134A923FBB111309'},
  {title: 'Example Community 2', description: 'Example Community description 2', id: 2, createdAt: Date(), owner: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'},
  {title: 'Example Community 3', description: 'Example Community description 3', id: 3, createdAt: Date(), owner: '0x983110309620d911731ac0932219af06091b6744'},
]

export const comments = [
  {message: 'Example comment 1', id: 1, createdAt: Date(), owner: '0xbF9B4a79a3d9e6AA3cea0fc0134A923FBB111309'},
  {message: 'Example comment 2', id: 2, createdAt: Date(), owner: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'},
  {message: 'Example comment 3', id: 3, createdAt: Date(), owner: '0x983110309620d911731ac0932219af06091b6744'},
]

export const users: Array<IUser> = [
  {domain: '', avatar: '', address: '0xbF9B4a79a3d9e6AA3cea0fc0134A923FBB111309'},
  {domain: 'Vitalik.eth', avatar: '', address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'},
  {domain: '', avatar: '', address: '0x983110309620d911731ac0932219af06091b6744'},
]