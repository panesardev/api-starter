import { z } from 'zod';
import { CreateAccountRequestBody, LoginRequestBody } from "./auth.interface";

export const loginSchema = z.object({
  email: z.string().email().min(5),
  password: z.string().min(6).max(30),
});

export const createAccountSchema = z.object({
  displayName: z.string(),
  email: z.string().email().min(5),
  password: z.string().min(6).max(30),
  confirmPassword: z.string().min(6).max(30),
}).refine(data => data.password === data.confirmPassword, {
  message: "passwords do not match",
  path: ["confirmPassword"],
});

export function validateLogin(body: LoginRequestBody): LoginRequestBody {
  return loginSchema.parse(body) as LoginRequestBody;
}

export function validateCreateAccount(body: CreateAccountRequestBody): CreateAccountRequestBody {
  return createAccountSchema.parse(body) as CreateAccountRequestBody;
}
