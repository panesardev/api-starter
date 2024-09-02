import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserService } from '../domains/users/user.service';
import { CreateAccountRequestBody, ExtendedJwtPayload, LoginRequestBody, Token } from "./auth.interface";
import { JWT_EXPIRY, JWT_SECRET } from '../constants/env';

export namespace AuthService {
  export async function login(body: LoginRequestBody): Promise<Token> {
    const exists = await UserService.findByEmail(body.email);

    if (exists) {
      const doesPasswordMatch = await bcrypt.compare(body.password, exists.password);
  
      if (doesPasswordMatch) {
        const payload: ExtendedJwtPayload = { userId: exists.id };

        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
      }
      else throw Error('password is incorrect');
    }
    else throw Error('user not found');
  }

  export async function createAccount(body: CreateAccountRequestBody): Promise<Token> {
    const exists = await UserService.findByEmail(body.email);
    
    if (exists) {
      throw Error('user already exists');
    }

    body.password = await bcrypt.hash(body.password, 10);
  
    const user = await UserService.create({
      email: body.email,
      password: body.password,
      displayName: body.displayName,
      verified: false,
      created: new Date(),
    });

    const payload: ExtendedJwtPayload = { userId: user.id };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  }
}