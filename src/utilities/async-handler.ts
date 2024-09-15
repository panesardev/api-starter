import { NextFunction, Request, Response } from "express";

type AsyncController = (request: Request, response: Response, next: NextFunction) => Promise<any>;

/**
 * utility function to catch promise rejection errors during runtime.
 * wrap this function in any route controller function.
 * for example, see in auth/auth.router.ts
 */
export function defineAsyncHandler(controller: AsyncController): AsyncController {
  return async (request, response, next) => {
    try {
      await controller(request, response, next);
    }
    catch (error) {
      next(error);
    }
  }
}
