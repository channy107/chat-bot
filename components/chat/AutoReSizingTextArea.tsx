"use client";

import { useRef, useEffect, TextareaHTMLAttributes } from "react";
import { Textarea } from "@components/ui/textarea";
import { cn } from "@lib/utils";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function AutoResizingTextarea({ value, className, ...others }: Props) {
  const innerRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.style.height = "inherit";
      innerRef.current.style.height = `${innerRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <Textarea
      ref={innerRef}
      value={value}
      className={cn(
        "resize-none overflow-auto min-h-[20px] max-h-[200px]",
        className
      )}
      {...others}
    />
  );
}

AutoResizingTextarea.displayName = "AutoResizingTextarea";

export default AutoResizingTextarea;
