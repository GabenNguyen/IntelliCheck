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
  title: {
    default: "IntelliCheck - AI-Powered Quiz Generator",
    template: "%s | IntelliCheck",
  },
  description: "Generate personalized quizzes on any topic with AI. Track your progress, get instant explanations, and master any subject faster. Start learning for free today.",
  keywords: ["AI quiz", "quiz generator", "online learning", "education", "study tool", "quiz platform", "AI-powered education", "smart quizzes"],
  authors: [{ name: "Ba Hoa (Gaben) Nguyen" }],
  creator: "IntelliCheck",
  publisher: "IntelliCheck",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://intellichkeck.com",
    siteName: "IntelliCheck",
    title: "IntelliCheck - Learn Smarter with AI Quizzes",
    description: "Generate personalized quizzes on any topic with AI. Track your progress, get instant explanations, and master any subject faster.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IntelliCheck - AI-Powered Quiz Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IntelliCheck - AI-Powered Quiz Generator",
    description: "Generate personalized quizzes on any topic with AI. Start learning for free today.",
    creator: "@bahoanguyen",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultSideBarOpen = cookieStore.get("sidebar_state")?.value === "true";

  const clerkUser = await currentUser();

  // Fetch streakData ONLY if clerkUser exists
  const streakData = clerkUser
    ? await prisma.user.findUnique({
      where: { id: clerkUser.id },
      select: {
        currentStreak: true,
        longestStreak: true,
        achievements: true,
      }
    })
    : null;

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          <div className="neon-bg" aria-hidden="true" />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={defaultSideBarOpen}>
              {/* Only show/pass data to Sidebar if user is logged in, 
                  otherwise pass default/empty values */}
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