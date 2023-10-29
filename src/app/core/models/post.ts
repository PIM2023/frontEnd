export interface Post {
  id: number;
  text: string;
  image: string;
  likes: number;
  username: string;
  comments?: any;
}

export interface PostCreated {
  text: string;
  image: string;
  user: PostedBy;
  likes: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}
export interface PostedBy {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
