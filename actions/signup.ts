"use sever";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import db from "@db/drizzle";
import { user } from "@db/schema";
import { getUserByEmail } from "@actions/user";
import { STATUS_CODE } from "@constants/statusCode";
import { SignUpSchema } from "@schemas/auth";
import { TFormState, TSignUpFormError } from "@/types/form";

export const signUp = async (
  state: TFormState<TSignUpFormError>,
  formData: FormData
) => {
  const validatedFields = SignUpSchema.safeParse({
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

  if (existingUser.statusCode === STATUS_CODE.OK) {
    return { errorMessage: "이미 존재하는 사용자입니다." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db
    .insert(user)
    .values({
      name: name,
      email: email,
      password: hashedPassword,
    })
    .returning();

  if (newUser) {
    redirect("/login");
  } else {
    return { errorMessage: "문제가 발생하였습니다." };
  }
};
