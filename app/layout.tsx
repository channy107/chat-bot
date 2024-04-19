import type { Metadata } from "next";
import { ReactQueryProvider } from "@components/providers/ReactQueryProvider";
import { ToastProvider } from "@components/providers/ToastProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen">
        <ReactQueryProvider>
          <ToastProvider />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
