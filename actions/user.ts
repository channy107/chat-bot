"use server";

import { STATUS_CODE } from "@constants/statusCode";
import db from "@db/drizzle";
import { TUser } from "@/types/db";
import { TResponse } from "@/types/response";

export const getUserByEmail = async (
  email: string
): Promise<TResponse<TUser>> => {
  try {
    const user = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (!user) {
      return {
        statusCode: STATUS_CODE.NOT_FOUND,
        message: "존재하지 않는 유저 입니다.",
      };
    }

    return { statusCode: STATUS_CODE.OK, data: user };
  } catch (error) {
    if (error instanceof CustomError) {
      return { statusCode: error.code, message: error.message };
    }

    return {
      statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: "문제가 발생했습니다. 잠시만 기다려주세요.",
    };
  }
};
