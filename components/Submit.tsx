import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@components/ui/button";
import { cn } from "@/lib/utils";

type Props = ButtonProps & {
  children: ReactNode;
};

export function Submit({ children, ...others }: Props) {
  const status = useFormStatus();

  return (
    <Button disabled={status.pending} type="submit" {...others}>
      {children}
    </Button>
  );
}
