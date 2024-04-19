import OpenAI from "openai";
import { STATUS_CODE } from "@constants/statusCode";
import { SuccessResponse, TResponse } from "@/types/response";

export const isSuccessResponse = <T>(
  response: TResponse<T>
): response is SuccessResponse<T> => {
  return response.statusCode === STATUS_CODE.OK;
};

export function isFileObject(obj: any): obj is OpenAI.FileObject {
  return obj && typeof obj.id === "string";
}
