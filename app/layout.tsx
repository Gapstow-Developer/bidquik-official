import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"

import "./globals.css"

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Turso Per User Starter",
  description: "Database per user starter with Turso, Clerk, and SQLite",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en">
        <body className={`bg-rich-black overscroll-none ${inter.className}`}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
