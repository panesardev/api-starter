import { JWT_EXPIRY, JWT_SECRET } from '../constants/env';
import { HttpCode } from '../constants/http-codes';
import { UserService } from '../domains/users/user.service';
import { HttpError } from '../interfaces/http';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateAccountRequestBody, ExtendedJwtPayload, LoginRequestBody, Token } from "./auth.interface";

export namespace AuthService {
  export async function login(body: LoginRequestBody): Promise<Token> {
    const exists = await UserService.findByEmail(body.email);

    if (!exists) {
      throw new HttpError(HttpCode.NOT_FOUND, 'user not found');
    }

    const doesPasswordMatch = await bcrypt.compare(body.password, exists.password);
  
    if (!doesPasswordMatch) {
      throw new HttpError(HttpCode.BAD_REQUEST, 'password is incorrect');
    }

    const payload: ExtendedJwtPayload = { userId: exists.id };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY }); 
  }

  export async function createAccount(body: CreateAccountRequestBody): Promise<Token> {
    const exists = await UserService.findByEmail(body.email);
    
    if (exists) {
      throw new HttpError(HttpCode.BAD_REQUEST, 'user already exists');
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