import { Profile } from './profile';

export interface User {
  username: string;
  email: string;
  password: string;
  profile: Profile;
  id: number;
  createdAt: string;
  updatedAt: string;
}
