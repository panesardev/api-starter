import { NextFunction, Request, Response } from "express";

export function logger() {
  return (request: Request, response: Response, next: NextFunction) => {
    const message = {
      method: request.method,
      path: request.url,
      body: request.body,
    };
  
    console.log(message);
    next();
  }
}
