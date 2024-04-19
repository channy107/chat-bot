"use server";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { getUserByEmail } from "@actions/user";
import { createSession } from "@actions/sessions";
import { STATUS_CODE } from "@constants/statusCode";
import { LoginSchema } from "@schemas/auth";
import { TFormState, TLoginFormError } from "@/types/form";
import { isSuccessResponse } from "@/types/guard";

export const login = async (
  state: TFormState<TLoginFormError>,
  formData: FormData
) => {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  const user = await getUserByEmail(email);

  if (user.statusCode === STATUS_CODE.NOT_FOUND) {
    return { errorMessage: "존재하지 않는 사용자입니다. 회원가입을 해주세요." };
  }

  if (isSuccessResponse(user)) {
    const { id, password: userPassword } = user.data;
    const passwordMatch = await bcrypt.compare(password, userPassword);

    if (!passwordMatch) {
      return { errorMessage: "비밀번호가 일치하지 않습니다." };
    }

    await createSession(id);

    redirect("/");
  }

  return { errorMessage: "문제가 발생했습니다. 잠시만 기다려주세요." };
};
