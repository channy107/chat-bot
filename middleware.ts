import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@actions/sessions";
import { BASE_URL, PROTECTED_ROUTES, PUBLIC_ROUTES } from "@constants/routes";

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.id) {
    let callbackUrl = pathname;
    if (search) {
      callbackUrl += search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, req.nextUrl)
    );
  }

  if (isPublicRoute && session?.id) {
    const param = new URLSearchParams(search);
    const callbackUrl = param.get("callbackUrl");

    return NextResponse.redirect(new URL(callbackUrl || BASE_URL, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
