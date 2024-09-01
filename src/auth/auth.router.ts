import { Request, Response, Router } from "express";
import { CreateAccountRequestBody, LoginRequestBody, Token } from "./auth.interface";
import { AuthService } from "./auth.service";
import { HttpResponse } from "../shared/interfaces/http.interface";

export namespace AuthRouter {
  export const router = Router();

  router.post('/login', async (request: Request, response: Response) => {
    const body = request.body as LoginRequestBody;

    const tokenResponse: HttpResponse<Token> = await AuthService.login(body)
      .then(body => ({ payload: body, errored: false }) as HttpResponse<Token>)
      .catch(e => ({ errored: true, message: e.message }));

    response.json(tokenResponse);
  });

  router.post('/create-account', async (request: Request, response: Response) => {
    const body = request.body as CreateAccountRequestBody;

    const tokenResponse: HttpResponse<Token> = await AuthService.createAccount(body)
      .then(body => ({ payload: body, errored: false }) as HttpResponse<Token>)
      .catch(e => ({ errored: true, message: e.message }));

    response.json(tokenResponse);
  });
}
