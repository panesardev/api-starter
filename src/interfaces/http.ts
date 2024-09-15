import { HttpCode } from "../constants/http-codes";

export class HttpError extends Error {
  constructor(public httpCode: HttpCode, public message: string) {
    super(message);
  }
}

export interface HttpResponse<T> {
  message?: string;
  errored?: boolean;
  payload?: T;
  status?: HttpCode,
}