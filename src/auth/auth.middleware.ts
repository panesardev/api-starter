import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { HttpCode } from "../constants/http-codes";
import { HttpError } from "../interfaces/http";
import { ExtendedJwtPayload } from "./auth.interface";

export function isAuthenticated() {
  return (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new HttpError(HttpCode.UNAUTHORIZED, 'unauthorized');
    }
    
    const token = authHeader.split(' ')[1];
  
    try {
      request.body.decoded = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } 
    catch (e) {
      throw new HttpError(HttpCode.UNAUTHORIZED, e.message);
    }
  }
}

export function isOwner() {
  return (request: Request, response: Response, next: NextFunction) => {
    const decoded = request.body.decoded as ExtendedJwtPayload;
    
    if (decoded && decoded.userId === Number(request.params.id)) {
      return next();
    }

    throw new HttpError(HttpCode.FORBIDDEN, 'forbidden');
  } 
}
