import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import Sidebar from "./components/sidebar"

export const metadata: Metadata = {
  title: "Mangable - HR Analytics Hub",
  description: "HR Analytics and Workspace Management Platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-background p-6">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
