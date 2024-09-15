import { Request, Response, Router } from "express";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { HttpCode } from "../../constants/http-codes";
import { isAuthenticated, isOwner } from "../../auth/auth.middleware";
import { HttpResponse } from "../../interfaces/http";
import { defineAsyncHandler } from "../../utilities/async-handler";

export namespace UserRouter {
  export const router = Router();

  router.get('/:id', isAuthenticated(), isOwner(), defineAsyncHandler(
    async (request: Request, response: Response) => {
      const id: number = Number(request.params.id);
  
      const userResponse: HttpResponse<User> = { 
        payload: await UserService.findById(id),
      };

      response.status(HttpCode.OK).json(userResponse);
    },
  ));
  
  router.patch('/:id', isAuthenticated(), isOwner(), defineAsyncHandler(
    async (request: Request, response: Response) => {
      const user: User = request.body as User;
  
      const userResponse: HttpResponse<User> = {
        payload: await UserService.update(user),
      }
  
      response.json(userResponse);
    },
  ));
  
  router.delete('/:id', isAuthenticated(), isOwner(), defineAsyncHandler(
    async (request: Request, response: Response) => {
      const id: number = Number(request.params.id);
  
      const userResponse: HttpResponse<User> = { 
        payload: await UserService.findById(id),
      };

      response.status(HttpCode.OK).json(userResponse);
    },
  ));
}
