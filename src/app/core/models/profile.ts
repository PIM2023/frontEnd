export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  pronouns?: string;
  bio?: string;
  isPrivate?: boolean;
  instagram_username?: string;
  twitter_username?: string;
  pinterest_username?: string;
  avatar?: string;
  height: number;
  weight: number;
  bornDate: Date;
  age: number;
  createdAt: string;
  updatedAt: string;
}
