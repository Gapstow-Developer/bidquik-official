import { clerkMiddleware } from "@clerk/nextjs" // This should be clerkMiddleware

// Public (unauthenticated) routes – everything else requires sign-in.
export default clerkMiddleware({
  publicRoutes: [
    "/", // landing page
    "/welcome", // first-time DB creation
    "/sign-in(.*)", // Clerk sign-in
    "/sign-up(.*)", // Clerk sign-up
    "/api/webhooks/(.*)", // webhooks stay public
  ],
})

export const config = {
  // Run the middleware for every route except static files and Next.js internals.
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
}
