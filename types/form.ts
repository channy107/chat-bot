export type TLoginFormError = {
  email?: string[];
  password?: string[];
};

export type TSignUpFormError = {
  name?: string[];
  email?: string[];
  password?: string[];
};

export type TFormState<TError> =
  | {
      errors?: TError;
      successMessage?: string;
      errorMessage?: string;
    }
  | undefined;
