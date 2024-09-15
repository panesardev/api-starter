import { Request, Response, Router } from "express";
import { AuthRouter } from "./auth/auth.router";
import { HttpCode } from "./constants/http-codes";
import { UserRouter } from "./domains/users/user.router";

const router = Router();

router.use('/auth', AuthRouter.router);
router.use('/users', UserRouter.router);

router.all('*', (request: Request, response: Response) => {
  response.status(HttpCode.NOT_FOUND).json({ message: 'not found' });
});

export { router };

