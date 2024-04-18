"use sever";
import bcrypt from "bcryptjs";

import db from "@db/drizzle";
import { user } from "@db/schema";
import { getUserByEmail } from "@actions/user";
import { signUpSchema } from "@schemas/auth";

import { TFormState, TSignUpFormError } from "@/types/form";

export const signUp = async (
  state: TFormState<TSignUpFormError>,
  formData: FormData
) => {
  const validatedFields = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, name } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser.statusCode === 200) {
    return { errorMessage: "이미 존재하는 사용자입니다." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(user).values({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return { successMessage: "가입 완료되었습니다!" };
  } catch (error) {
    return {
      errorMessage: "문제가 발생했습니다. 잠시만 기다려주세요.",
    };
  }
};
