import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { ExtendedJwtPayload } from "../auth/auth.interface";
import { FORBIDDEN, UNAUTHORIZED } from "../constants/http-codes";

export function isAuthenticated() {
  return (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return response.status(UNAUTHORIZED).json({ message: 'unauthorized' });
    }
    
    const token = authHeader.split(' ')[1];
  
    try {
      request.body.decoded = jwt.verify(token, process.env.JWT_SECRET) as ExtendedJwtPayload;

      next();
    } 
    catch (e) {
      console.log('[ERROR] auth.middleware.ts: ', e.message);
      response.status(UNAUTHORIZED).json({ message: 'unauthorized' });
    }
  }
}

export function isOwner() {
  return (request: Request, response: Response, next: NextFunction) => {
    const decoded = request.body.decoded as ExtendedJwtPayload;
    
    if (decoded && decoded.userId === Number(request.params.id)) {
      next();
    }
    else {
      response.status(FORBIDDEN).json({ message: 'forbidden' });
    }
  } 
}
