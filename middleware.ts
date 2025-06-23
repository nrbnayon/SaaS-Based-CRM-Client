import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Define route patterns
const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-otp",
];
const PROTECTED_ROUTES = ["/dashboard", "/profile", "/settings"];
const PUBLIC_ROUTES = ["/", "/about", "/contact", "/success"];

// JWT secret - in production, use environment variable
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ||
    "your-super-secret-jwt-key-change-this-in-production"
);

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

interface JWTPayload {
  userId: string;
  email: string;
  role?: string;
  exp: number;
  iat: number;
}

async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

function isRouteMatch(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    if (route === pathname) return true;
    if (route.endsWith("*")) {
      return pathname.startsWith(route.slice(0, -1));
    }
    return pathname.startsWith(route);
  });
}

function rateLimit(
  ip: string,
  limit: number = 100,
  windowMs: number = 15 * 60 * 1000
): boolean {
  const now = Date.now();
  const key = `${ip}-${Math.floor(now / windowMs)}`;

  const current = rateLimitStore.get(key) || {
    count: 0,
    resetTime: now + windowMs,
  };

  if (now > current.resetTime) {
    current.count = 1;
    current.resetTime = now + windowMs;
  } else {
    current.count++;
  }

  rateLimitStore.set(key, current);

  // Clean up old entries
  for (const [k, v] of rateLimitStore.entries()) {
    if (now > v.resetTime) {
      rateLimitStore.delete(k);
    }
  }

  return current.count <= limit;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Get client IP for rate limiting
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Apply rate limiting
  if (!rateLimit(ip)) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": "900", // 15 minutes
        "X-RateLimit-Limit": "100",
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": new Date(
          Date.now() + 15 * 60 * 1000
        ).toISOString(),
      },
    });
  }

  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self'; object-src 'none'; child-src 'none'; worker-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self';"
  );

  // Skip middleware for static files and API routes that don't need protection
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/public") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return response;
  }

  // Get token from cookies or Authorization header
  const tokenFromCookie = request.cookies.get("auth-token")?.value;
  const authHeader = request.headers.get("authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  const token = tokenFromCookie || tokenFromHeader;
  const user = token ? await verifyToken(token) : null;

  // Handle authentication routes
  if (isRouteMatch(pathname, AUTH_ROUTES)) {
    // If user is already authenticated, redirect to dashboard
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return response;
  }

  // Handle protected routes
  if (isRouteMatch(pathname, PROTECTED_ROUTES)) {
    if (!user) {
      // Store the attempted URL for redirect after login
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Add user info to headers for the app to use
    response.headers.set("X-User-Id", user.userId);
    response.headers.set("X-User-Email", user.email);
    if (user.role) {
      response.headers.set("X-User-Role", user.role);
    }

    return response;
  }

  // Handle public routes - always allow access
  if (isRouteMatch(pathname, PUBLIC_ROUTES)) {
    // Add user context if available (for personalized content)
    if (user) {
      response.headers.set("X-User-Id", user.userId);
      response.headers.set("X-User-Email", user.email);
      if (user.role) {
        response.headers.set("X-User-Role", user.role);
      }
    }
    return response;
  }

  // Handle OTP verification route
  if (pathname === "/otp-verify") {
    // Allow access but could add additional checks here
    return response;
  }

  // For all other routes not explicitly defined, require authentication
  if (!user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Add user context for authenticated users on undefined routes
  response.headers.set("X-User-Id", user.userId);
  response.headers.set("X-User-Email", user.email);
  if (user.role) {
    response.headers.set("X-User-Role", user.role);
  }

  return response;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
