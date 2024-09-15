import { NextFunction, Request, Response } from "express";

export function logger() {
  return (request: Request, response: Response, next: NextFunction) => {
    const date = new Date();

    const timeString = date.toLocaleTimeString();
    const dateString = date.toLocaleDateString();

    const message = {
      time: timeString,
      date: dateString,
      method: request.method,
      path: request.url,
      body: request.body,
    };
  
    console.log(message);
    next();
  }
}
