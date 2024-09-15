import { HttpCode } from "../constants/http-codes";
import { HttpError, HttpResponse } from "../interfaces/http";
import { ErrorRequestHandler, Response } from "express";
import { ZodError } from 'zod';

export function errorHandler(): ErrorRequestHandler {
  return (error, request, response, next) => {
    if (error instanceof ZodError) {
      return handleZodError(response, error);
    }
  
    if (error instanceof HttpError) {
      return handleHttpError(response, error);
    }

    const errorResponse: HttpResponse<null> = {
      status: HttpCode.INTERNAL_SERVER_ERROR,
      message: 'internal server error',
      errored: true,
      payload: null,
    };

    return response.status(HttpCode.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

function handleZodError(response: Response, error: ZodError) {
  const errors = error.issues.map(e => ({
    path: e.path.join("."),
    message: e.message,
  }));

  const errorResponse: HttpResponse<typeof errors> = {
    status: HttpCode.BAD_REQUEST,
    message: 'data validation error',
    errored: true,
    payload: errors,
  };

  return response.status(HttpCode.BAD_REQUEST).json(errorResponse);
}

function handleHttpError(response: Response, error: HttpError) {
  const errorResponse: HttpResponse<null> = {
    message: error.message,
    status: error.httpCode,
    errored: true,
    payload: null,
  };

  return response.status(error.httpCode).json(errorResponse);
}
