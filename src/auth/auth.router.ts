import { Request, Response, Router } from "express";
import { HttpCode } from "../constants/http-codes";
import { HttpResponse } from "../interfaces/http";
import { Token } from "./auth.interface";
import { AuthService } from "./auth.service";
import { validateCreateAccount, validateLogin } from "./auth.validation";
import { defineAsyncHandler } from "../utilities/async-handler";

export namespace AuthRouter {
  export const router = Router();

  router.post('/login', defineAsyncHandler(
    async (request: Request, response: Response) => {
      const body = validateLogin(request.body);
  
      const tokenResponse: HttpResponse<Token> = {
        payload: await AuthService.login(body),
      }

      response.status(HttpCode.OK).json(tokenResponse);
    },
  ));

  router.post('/create-account', defineAsyncHandler(
    async (request: Request, response: Response) => {
      const body = validateCreateAccount(request.body);
  
      const tokenResponse: HttpResponse<Token> = {
        payload: await AuthService.createAccount(body),
      }
      
      response.status(HttpCode.OK).json(tokenResponse);
    },
  ));
}
