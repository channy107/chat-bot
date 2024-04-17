"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormContainer } from "@components/auth/FormContainer";
import { FormSuccess } from "@components/auth/FormSuccess";
import { FormError } from "@components/auth/FormError";
import { Input } from "@components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Button } from "@components/ui/button";

import { signup } from "@actions/signup";
import { RegisterSchema } from "@schemas/auth";
import { isSuccessResponse } from "@/types/guard";

export function SignUpForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const {
    watch,
    formState: { errors },
  } = form;

  const [name, email, password] = watch(["name", "email", "password"]);

  const isValidateError = Object.keys(errors).length !== 0;
  const isEmptyField = name === "" || email === "" || password === "";

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setSuccess("");
    setError("");
    setLoading(true);
    const response = await signup(values);

    setLoading(false);

    if (isSuccessResponse(response)) {
      setSuccess(response.data);
    } else {
      setError(response.message);
    }
  };

  const isSubmitButtonDisabled = loading || isValidateError || isEmptyField;

  return (
    <FormContainer
      title="회원가입"
      link={{ label: "이미 계정이 있으신가요?", href: "/login" }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="이름을 입력해주세요." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="example@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button
            disabled={isSubmitButtonDisabled}
            type="submit"
            className="w-full"
          >
            가입하기
          </Button>
        </form>
      </Form>
    </FormContainer>
  );
}
