"use client";

import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

type Props = {
  onDrop: (files: File[]) => void;
  disabled: boolean;
  error: boolean;
};

export function Upload({ onDrop, error, disabled }: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/*": [".jsonl"],
    },
    onDrop,
    disabled,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center w-full p-10 border-2 border-dashed border-gray-300 rounded-md cursor-pointer",
        disabled && "bg-slate-50 cursor-default"
      )}
    >
      <input {...getInputProps()} />
      <p
        className={cn(
          "text-sm",
          error ? "text-red-600" : disabled ? "text-slate-300" : "text-blue-600"
        )}
      >
        파일을 드래그 또는 업로드 해주세요.
      </p>
    </div>
  );
}
