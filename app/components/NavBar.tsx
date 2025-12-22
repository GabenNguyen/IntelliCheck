"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggle";
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
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: "linear",
      }}
      className="sticky top-0 z-50 w-full border-b border-gray-200/30 dark:border-gray-800/30 bg-white/60 dark:bg-gray-950/60 backdrop-blur-lg shadow-sm"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid h-20 grid-cols-[minmax(200px,auto)_1fr_minmax(200px,auto)] items-center">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <SidebarTrigger className="cursor-pointer rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800" />

            <Link href="/" className="group flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-gray-700 to-gray-900 shadow-md"
              >
                <Sparkles className="h-5 w-5 text-white" />
              </motion.div>

              <span className="hidden text-2xl font-extrabold tracking-tight bg-linear-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent sm:block">
                IntelliCheck
              </span>
            </Link>
          </div>

          {/* CENTER NAV */}
          <div className="hidden md:flex justify-center min-h-10">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-2">
                {navItems.map(({ label, href }) => {
                  const active = pathname === href;

                  return (
                    <NavigationMenuItem key={label}>
                      <NavigationMenuLink asChild>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2, ease: "easeIn" }}
                          className="relative"
                        >
                          <Link
                            href={href}
                            className={cn(
                              "relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                              active
                                ? "text-gray-900 dark:text-white"
                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            )}
                          >
                            {label}
                          </Link>

                          {active && (
                            <motion.span
                              layoutId="nav-underline"
                              initial={false}
                              className="absolute left-3 right-3 -bottom-1 h-0.5 rounded-full bg-gray-900 dark:bg-white"
                              transition={{
                                type: "tween",
                                stiffness: 260,
                                damping: 32,
                                mass: 0.6,
                              }}
                            />
                          )}
                        </motion.div>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 justify-end min-w-[140px]">
            <ModeToggle />

            <SignedOut>
              <div className="hidden items-center gap-2 sm:flex">
                <SignInButton>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  >
                    Sign In
                  </motion.button>
                </SignInButton>

                <SignUpButton>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="cursor-pointer rounded-lg bg-linear-to-r from-gray-800 to-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:from-gray-900 hover:to-black hover:shadow-md"
                  >
                    Sign Up
                  </motion.button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <UserButton
                  showName
                  appearance={{
                    elements: {
                      userButtonBox: "text-gray-900 dark:text-white",
                    },
                  }}
                />
              </motion.div>
            </SignedIn>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default NavBar;
