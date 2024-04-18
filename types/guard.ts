import { STATUS_CODE } from "@/constants/statusCode";
import { SuccessResponse, TResponse } from "@/types/response";

export const isSuccessResponse = <T>(
  response: TResponse<T>
): response is SuccessResponse<T> => {
  return response.statusCode === STATUS_CODE.OK;
};
