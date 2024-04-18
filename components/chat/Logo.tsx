import Image from "next/image";
import Link from "next/link";

import { BASE_URL } from "@constants/routes";
export function Logo() {
  return (
    <Link href={BASE_URL} className="flex items-center gap-2">
      <Image width={40} height={40} alt="Logo" src="/logo.png" />
      <h1 className="text-2xl font-bold">Chat GPT</h1>
    </Link>
  );
}
