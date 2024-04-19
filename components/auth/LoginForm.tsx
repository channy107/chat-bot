"use client";
import { ChangeEvent, useEffect } from "react";
import { useFormState } from "react-dom";

import { FormCard } from "@/components/auth/FormCard";
import { FormMessage } from "@/components/FormMessage";
import { FormError } from "@components/FormError";
import { Submit } from "@components/Submit";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

import { login } from "@actions/login";
import { useFormValidate } from "@hooks/useFormValidate";
import { LoginSchema } from "@schemas/auth";
import { TLoginFormError } from "@/types/form";

export function LoginForm() {
  const [state, action] = useFormState(login, undefined);
  const { errors, validateField, setErrors } =
    useFormValidate<TLoginFormError>(LoginSchema);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  useEffect(() => {
    setErrors(state?.errors);
  }, [state]);

  return (
    <FormCard
      title="로그인"
      link={{ label: "아직 계정이 없으신가요?", href: "/signup" }}
    >
      <form action={action} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label className="email">이메일</Label>
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
            <Label htmlFor="password">비밀번호</Label>
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
        <FormError message={state?.errorMessage} />
        <Submit className="w-full">로그인</Submit>
      </form>
    </FormCard>
  );
}
