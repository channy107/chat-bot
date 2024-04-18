import { useFormStatus } from "react-dom";
import { Button } from "@components/ui/button";

type Props = {
  text: string;
};

export function Submit({ text }: Props) {
  const status = useFormStatus();

  return (
    <Button disabled={status.pending} type="submit" className="w-full">
      {text}
    </Button>
  );
}
