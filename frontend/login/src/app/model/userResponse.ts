import { Roles } from './role';

export interface UserResponse {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Roles[];
}
