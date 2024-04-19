"use client";
import { DotLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <DotLoader color="black" />
    </div>
  );
}
