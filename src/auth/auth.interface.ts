import { JwtPayload } from 'jsonwebtoken';
import { User } from "../domains/users/user.entity";

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface CreateAccountRequestBody {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TokenBody {
  token: string;
  expiresIn: string;
}

export interface ExtendedJwtPayload extends JwtPayload {
  userId: User['id'];
}
