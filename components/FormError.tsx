import { TriangleAlert } from "lucide-react";

interface Props {
  message?: string;
}

export function FormError({ message }: Props) {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <TriangleAlert size={16} />
      <p className="whitespace-pre-wrap">{message}</p>
    </div>
  );
}
