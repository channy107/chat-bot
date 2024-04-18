import { useState } from "react";
import { ZodObject, ZodRawShape } from "zod";

export function useFormValidate<T>(schema: ZodObject<ZodRawShape>) {
  const [errors, setErrors] = useState<Partial<T>>();

  const validateField = (fieldName: string, value: string) => {
    setErrors({
      ...errors,
      [fieldName]: undefined,
    });
    const parsedValue = schema.pick({ [fieldName]: true }).safeParse({
      [fieldName]: value,
    });

    if (!parsedValue.success) {
      setErrors({
        ...errors,
        ...parsedValue.error.flatten().fieldErrors,
      });
    }
  };

  return { errors, validateField, setErrors };
}
