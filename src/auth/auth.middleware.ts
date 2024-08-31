import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { ExtendedJwtPayload } from "../auth/auth.interface";

export function isAuthenticated() {
  return (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return response.status(401).json({ message: 'unauthorized' });
    }
    
    const token = authHeader.split(' ')[1];
  
    try {
      const payload = verify(token, process.env.JWT_SECRET) as ExtendedJwtPayload;
      request.body.payload = payload;
      next();
    } 
    catch (e) {
      console.log('[ERROR] auth.middleware.ts: ', e.message);
      response.status(403).json({ message: 'forbidden' });
    }
  }
}

export function isOwner() {
  return (request: Request, response: Response, next: NextFunction) => {
    const payload = request.body.payload as ExtendedJwtPayload;
    
    if (payload && payload.userId === Number(request.params.id)) {
      next();
    }
    else {
      response.status(403).json({ message: 'forbidden' });
    }
  } 
}
