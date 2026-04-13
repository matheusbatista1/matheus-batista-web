import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: import("next/server").NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas admin e API nao passam pelo i18n middleware
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api")
  ) {
    return;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next|api/auth|favicon.ico|fonts|images|.*\\..*).*)",
  ],
};
