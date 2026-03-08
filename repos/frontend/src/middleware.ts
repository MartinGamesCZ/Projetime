import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { electronAuth } from "./security/electron-auth";

export function middleware(request: NextRequest) {
  const auth = electronAuth(request);
  if (!auth)
    return new NextResponse("Forbidden", {
      status: 403,
    });

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
