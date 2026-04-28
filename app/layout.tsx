import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { toast, Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import AppSideBar from "./components/AppSideBar";
import NavBar from "./components/NavBar";
import ThemeProvider from "./components/ThemeProvider";
import AnimatedTransition from "./components/AnimatedTransition";
import prisma from "../lib/db";
import { currentUser } from "@clerk/nextjs/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IntelliCheck - AI-Powered Quiz Generator",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const defaultSideBarOpen = cookieStore.get("sidebar_state")?.value === "true";

  const clerkUser = await currentUser();

  if (!clerkUser) {
    return toast.error("Not signed in");
  }

  const streakData = await prisma.user.findUnique({
    where: { id: clerkUser?.id },
    select: {
      currentStreak: true,
      longestStreak: true,
      achievements: true,
    }
  })

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
          suppressHydrationWarning
        >
          {/* Neon IT vibe backdrop */}
          <div className="neon-bg" aria-hidden="true" />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={defaultSideBarOpen}>
              <AppSideBar streakData={{
                currentStreak: streakData?.currentStreak || 0,
                longestStreak: streakData?.longestStreak || 0,
                achievements: JSON.parse(streakData?.achievements || "[]"),
              }} />
              <main className="w-full">
                <NavBar />
                <Toaster position="top-center" />

                <AnimatedTransition>{children}</AnimatedTransition>
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
