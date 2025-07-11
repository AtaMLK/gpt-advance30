import { NextRequest, NextResponse } from "next/server";
import { ADMIN_EMAIL } from "./constants/appConfig";

export default function MiddlewareNotFoundError(request: NextRequest) {
  const adminEmail = ADMIN_EMAIL;

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    const userEmail = request.cookies.get("user-email")?.value;

    if (!userEmail || userEmail !== adminEmail) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path"],
};
