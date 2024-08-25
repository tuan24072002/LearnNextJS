export { auth as middleware } from "@/auth";

//Don't protect page auth or verify
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth|verify|$).*)"],
};
