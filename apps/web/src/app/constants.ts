export interface ICommunity {
  title: string;
  description: string;
  id: number;
  createdAt: string;
  owner: string;
}

export interface IUser {
   name: string;
  image: string;
  address: string;
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
  {title: 'Example Post 1', description: 'Example Post description 1', id: 1, updatedAt: Date(), owner: '0x0000...0001', communityId: 1},
  {title: 'Example Post 2', description: 'Example Post description 2', id: 2, updatedAt: Date(), owner: '0x0000...0002', communityId: 1},
  {title: 'Example Post 3', description: 'Example Post description 3', id: 3, updatedAt: Date(), owner: '0x0000...0003', communityId: 1},
]

export const communities: Array<ICommunity> = [
  {title: 'Example Community 1', description: 'Example Community description 1', id: 1, createdAt: Date(), owner: '0x0000...0000'},
  {title: 'Example Community 2', description: 'Example Community description 2', id: 2, createdAt: Date(), owner: '0x0000...0001'},
  {title: 'Example Community 3', description: 'Example Community description 3', id: 3, createdAt: Date(), owner: '0x0000...0002'},
]

export const comments = [
  {message: 'Example comment 1', id: 1, createdAt: Date(), owner: '0x0000...0000'},
  {message: 'Example comment 2', id: 2, createdAt: Date(), owner: '0x0000...0001'},
  {message: 'Example comment 3', id: 3, createdAt: Date(), owner: '0x0000...0002'},
]

export const users: Array<IUser> = [
  {name: 'User 1', image: '', address: '0x0000...0000'},
  {name: 'User 2', image: '', address: '0x0000...0001'},
  {name: 'User 3', image: '', address: '0x0000...0002'},
]