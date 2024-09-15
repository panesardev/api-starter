import { JwtPayload } from 'jsonwebtoken';
import { z } from 'zod';
import { createAccountSchema, loginSchema } from './auth.validation';

export type LoginRequestBody = Required<z.infer<typeof loginSchema>>;

export type CreateAccountRequestBody = Required<z.infer<typeof createAccountSchema>>;

export type Token = string; 

export interface ExtendedJwtPayload extends JwtPayload {
  userId: number;
}
