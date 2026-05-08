"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { cn } from "@/lib/utils";
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Quiz", href: "/quiz" },
];

function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo & Sidebar */}
          <div className="flex items-center gap-3">
            <SidebarTrigger className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-muted text-muted-foreground hover:text-foreground" />

            <Link href="/" className="flex items-center gap-2.5 outline-none">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                IntelliCheck
              </span>
            </Link>
          </div>

          {/* Center Section - Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {label}
                  {isActive && (
                    <span className="absolute inset-x-4 -bottom-px h-0.5 rounded-t-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section - Auth & Theme */}
          <div className="flex items-center gap-2">
            <ModeToggle />

            <Show when={"signed-out"}>
              <div className="hidden sm:flex items-center gap-2">
                <SignInButton>
                  <button className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    Sign in
                  </button>
                </SignInButton>

                <SignUpButton>
                  <button className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                    Sign up
                  </button>
                </SignUpButton>
              </div>
            </Show>

            <Show when={"signed-in"}>
              <UserButton
                showName
                appearance={{
                  elements: {
                    userButtonBox: "text-foreground font-medium",
                    userButtonOuterIdentifier: "text-foreground font-medium",
                  },
                }}
              />
            </Show>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;