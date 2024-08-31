import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserService } from '../domains/users/user.service';
import { CreateAccountRequestBody, ExtendedJwtPayload, LoginRequestBody, TokenBody } from "./auth.interface";

export namespace AuthService {
  export async function login(body: LoginRequestBody): Promise<TokenBody> {
    const exists = await UserService.findByEmail(body.email);

    if (exists) {
      const doesPasswordMatch = await compare(body.password, exists.password);
  
      if (doesPasswordMatch) {
        const payload: ExtendedJwtPayload = { userId: exists.id };
        const expiresIn = process.env.JWT_EXPIRY;

        const token = sign(payload, process.env.JWT_SECRET, { expiresIn });

        return { token, expiresIn };
      }
      else throw Error('password is incorrect');
    }
    else throw Error('user not found');
  }

  export async function createAccount(body: CreateAccountRequestBody): Promise<TokenBody> {
    const exists = await UserService.findByEmail(body.email);
    
    if (exists) {
      throw Error('user already exists');
    }

    body.password = await hash(body.password, 10);
  
    const user = await UserService.create({
      email: body.email,
      password: body.password,
      displayName: body.displayName,
      verified: false,
      created: new Date(),
    });

    const payload: ExtendedJwtPayload = { userId: user.id };
    const expiresIn = process.env.JWT_EXPIRY;

    const token = sign(payload, process.env.JWT_SECRET, { expiresIn });

    return { token, expiresIn };
  }
}