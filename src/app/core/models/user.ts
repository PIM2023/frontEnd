import { Profile } from './profile';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  profile: Profile;
  createdAt: string;
  updatedAt: string;
}
