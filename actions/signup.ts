"use sever";
import * as z from "zod";
import bcrypt from "bcryptjs";

import db from "@db/drizzle";
import { user } from "@db/schema";
import { getUserByEmail } from "@actions/user";
import { RegisterSchema } from "@schemas/auth";
import { TResponse } from "@/types/response";

export const signup = async (
  values: z.infer<typeof RegisterSchema>
): Promise<TResponse<string>> => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { statusCode: 400, message: "잘못된 입력 값이 존재합니다." };
  }

  const { email, password, name } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser.statusCode === 200) {
    return { statusCode: 409, message: "이미 존재하는 사용자입니다." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(user).values({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return { statusCode: 200, data: "가입 완료되었습니다!" };
  } catch (error) {
    if (error instanceof CustomError) {
      return { statusCode: error.code, message: error.message };
    }

    return {
      statusCode: 500,
      message: "문제가 발생했습니다. 잠시만 기다려주세요.",
    };
  }
};
