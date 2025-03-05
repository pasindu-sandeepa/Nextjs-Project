import { betterFetch } from "@better-fetch/fetch";
import { NextResponse } from "next/server";

export default async function authMiddleware(request) {
  // Fetch session using betterFetch
  const { data: session } = await betterFetch("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  // Redirect if no session is found
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Continue to the next middleware or route
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};