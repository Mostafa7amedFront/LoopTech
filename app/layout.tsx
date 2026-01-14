import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "LoopTech - نحوّل أفكارك الرقمية إلى واقع",
  description: "شركة متخصصة في تطوير مواقع الويب وتطبيقات الموبايل والحلول البرمجية المخصصة",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.cdnfonts.com/css/neo-sans-arabic" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
