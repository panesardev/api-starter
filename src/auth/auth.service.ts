import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserService } from '../domains/users/user.service';
import { CreateAccountRequestBody, ExtendedJwtPayload, LoginRequestBody, Token } from "./auth.interface";

export namespace AuthService {
  export async function login(body: LoginRequestBody): Promise<Token> {
    const exists = await UserService.findByEmail(body.email);

    if (exists) {
      const doesPasswordMatch = await bcrypt.compare(body.password, exists.password);
  
      if (doesPasswordMatch) {
        const payload: ExtendedJwtPayload = { userId: exists.id };
        const expiresIn = process.env.JWT_EXPIRY;

        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
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
    const expiresIn = process.env.JWT_EXPIRY;

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  }
}