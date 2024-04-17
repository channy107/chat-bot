export type SuccessResponse<T> = {
  statusCode: number;
  data: T;
};

export type ErrorResponse = {
  statusCode: number;
  message: string;
};

export type TResponse<T> = SuccessResponse<T> | ErrorResponse;
