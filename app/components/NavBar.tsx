"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Quiz", href: "/quiz" },
  { label: "Results", href: "/results" },
];

function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/30 dark:border-gray-800/30 bg-white/60 dark:bg-gray-950/60 backdrop-blur-lg shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <SidebarTrigger className="cursor-pointer rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800" />

            <Link href="/" className="group flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-gray-700 to-gray-900 shadow-md transition-transform group-hover:scale-105">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="hidden text-2xl font-extrabold tracking-tight bg-linear-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent sm:block">
                IntelliCheck
              </span>
            </Link>
          </div>

          {/* CENTER NAV */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex items-center gap-2">
              {navItems.map(({ label, href }) => {
                const active = pathname === href;
                return (
                  <NavigationMenuItem key={label}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={href}
                        className={cn(
                          "relative rounded-lg px-4 py-2 text-sm font-semibold transition-all",
                          active
                            ? "text-gray-900 dark:text-white underline decoration-2 decoration-gray-900 dark:decoration-white"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        )}
                      >
                        {label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <ModeToggle />

            <SignedOut>
              <div className="hidden items-center gap-2 sm:flex">
                <SignInButton>
                  <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton>
                  <button className="rounded-lg bg-linear-to-r from-gray-800 to-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:from-gray-900 hover:to-black hover:shadow-md">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton
                showName
                appearance={{
                  elements: {
                    userButtonBox: "text-gray-900 dark:text-white",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
