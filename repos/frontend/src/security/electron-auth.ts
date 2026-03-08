import { NextRequest } from "next/server";

export function electronAuth(request: NextRequest) {
  const secret = process.env.ELECTRON_AUTH_SECRET;

  if (!secret) {
    console.error("INVALID SECRET");

    return false;
  }

  const header = request.headers.get("x-electron-auth-secret");
  if (secret != header) return false;

  return true;
}
