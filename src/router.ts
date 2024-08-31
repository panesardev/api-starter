import { Router } from "express";
import { Request, Response } from "express";
import { AuthRouter } from "./auth/auth.router";
import { UserRouter } from "./domains/users/user.router";

const router = Router();

router.use('/auth', AuthRouter.router);
router.use('/users', UserRouter.router);

router.get('/', (request: Request, response: Response) => {
  response.json({ message: 'hello world' });
});

router.all('*', (request: Request, response: Response) => {
  response.status(404).json({ message: 'not found' });
});

export { router };
