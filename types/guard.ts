import { SuccessResponse, TResponse } from "./response";

export const isSuccessResponse = <T>(
  response: TResponse<T>
): response is SuccessResponse<T> => {
  return response.statusCode === 200;
};
