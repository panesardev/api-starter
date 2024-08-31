import { Request, Response, Router } from "express";
import { isAuthenticated, isOwner } from "../../auth/auth.middleware";
import { HttpResponse } from "../../interfaces/http.interface";
import { User } from "./user.entity";
import { UserService } from "./user.service";

export namespace UserRouter {
  export const router = Router();

  router.get('/:id', isAuthenticated(), isOwner(), async (request: Request, response: Response) => {
    const id: User['id'] = Number(request.params.id);

    const userResponse: HttpResponse<User> = await UserService.findById(id)
      .then(user => ({ payload: user, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(userResponse);
  });
  
  router.patch('/:id', isAuthenticated(), isOwner(), async (request: Request, response: Response) => {
    const user: User = request.body as User;

    const userResponse: HttpResponse<User> = await UserService.update(user)
      .then(user => ({ payload: user, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(userResponse);
  });
  
  router.delete('/:id', isAuthenticated, isOwner, async (request: Request, response: Response) => {
    const id: number = Number(request.params.id);

    const deleteResponse: HttpResponse<boolean> = await UserService.remove(id)
      .then(() => ({ payload: true, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(deleteResponse);
  });
}