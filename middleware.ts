import { authMiddleware } from "@clerk/nextjs/server" // This is the correct import for current Clerk versions

// Public (unauthenticated) routes – everything else requires sign-in.
export default authMiddleware({
  publicRoutes: [
    "/", // Home
    "/welcome", // Onboarding
    "/sign-in(.*)", // All sign-in routes
    "/sign-up(.*)", // All sign-up routes
    "/api/webhooks/(.*)", // Webhooks should remain unauthenticated
  ],
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"], // Exclude static files & Next internals
}
