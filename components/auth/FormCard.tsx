import { ReactNode } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@components/ui/card";

type Props = {
  title: string;
  link: { label: string; href: string };
  children: ReactNode;
};

export function FormCard({ title, link, children }: Props) {
  return (
    <Card className="w-[500px] flex flex-col items-center border-none shadow-none sm:border sm:shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="w-[90%]">{children}</CardContent>

      <CardFooter>
        <Link className="text-sm text-sky-700" href={link.href}>
          {link.label}
        </Link>
      </CardFooter>
    </Card>
  );
}
