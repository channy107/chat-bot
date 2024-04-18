"use client";
import { ChangeEvent, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { FormContainer } from "@components/auth/FormContainer";
import { FormMessage } from "@components/auth/FormMessage";
import { FormSuccess } from "@components/auth/FormSuccess";
import { FormError } from "@components/auth/FormError";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

import { signUp } from "@actions/signUp";
import { useFormValidate } from "@/hooks/useFormValidate";
import { signUpSchema } from "@schemas/auth";
import { TSignUpFormError } from "@/types/form";
import { Submit } from "../Submit";

export function SignUpForm() {
  const [state, action] = useFormState(signUp, undefined);
  const { errors, validateField, setErrors } =
    useFormValidate<TSignUpFormError>(signUpSchema);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  useEffect(() => {
    setErrors(state?.errors);
  }, [state]);

  return (
    <FormContainer
      title="회원가입"
      link={{ label: "이미 계정이 있으신가요?", href: "/login" }}
    >
      <form action={action} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>이름</Label>
            <Input
              id="name"
              name="name"
              placeholder="이름을 입력해주세요."
              error={!!errors?.name}
              onChange={handleChange}
            />
            {errors?.name && <FormMessage message={errors.name[0]} />}
          </div>
          <div className="space-y-1">
            <Label>이메일</Label>
            <Input
              id="email"
              name="email"
              placeholder="example@example.com"
              type="email"
              error={!!errors?.email}
              onChange={handleChange}
            />
            {errors?.email && <FormMessage message={errors.email[0]} />}
          </div>
          <div className="space-y-1">
            <Label>비밀번호</Label>
            <Input
              id="password"
              name="password"
              placeholder="******"
              type="password"
              error={!!errors?.password}
              onChange={handleChange}
            />
            {errors?.password && <FormMessage message={errors.password[0]} />}
          </div>
        </div>
        <FormSuccess message={state?.successMessage} />
        <FormError message={state?.errorMessage} />
        <Submit text="가입하기" />
      </form>
    </FormContainer>
  );
}
