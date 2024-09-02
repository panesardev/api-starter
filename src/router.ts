import { Router } from "express";
import { Request, Response } from "express";
import { AuthRouter } from "./auth/auth.router";
import { UserRouter } from "./domains/users/user.router";
import { NOT_FOUND, OK } from "./constants/http-codes";

const router = Router();

router.use('/auth', AuthRouter.router);
router.use('/users', UserRouter.router);

router.get('/', (request: Request, response: Response) => {
  response.status(OK).json({ message: 'hello world' });
});

router.all('*', (request: Request, response: Response) => {
  response.status(NOT_FOUND).json({ message: 'not found' });
});

export { router };
