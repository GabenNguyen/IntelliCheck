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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-xs font-sans"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid h-16 md:h-20 grid-cols-[minmax(200px,auto)_1fr_minmax(200px,auto)] items-center">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <SidebarTrigger className="cursor-pointer rounded-xl p-2.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400" />

            <Link href="/" className="group flex items-center gap-3 outline-none rounded-xl">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 shadow-sm transition-colors"
              >
                <Sparkles className="h-5 w-5 text-zinc-50 dark:text-zinc-900" />
              </motion.div>

              <span className="hidden text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:block">
                IntelliCheck
              </span>
            </Link>
          </div>

          {/* CENTER NAV */}
          <div className="hidden md:flex justify-center flex-1">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-1">
                {navItems.map(({ label, href }) => {
                  const active = pathname === href;

                  return (
                    <NavigationMenuItem key={label}>
                      <NavigationMenuLink asChild>
                        <div className="relative group">
                          <Link
                            href={href}
                            className={cn(
                              "relative flex items-center rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 outline-none",
                              active
                                ? "text-zinc-900 dark:text-zinc-50"
                                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
                            )}
                          >
                            {label}
                          </Link>

                          {active && (
                            <motion.span
                              layoutId="nav-underline"
                              className="absolute left-4 right-4 -bottom-[1px] h-[2px] rounded-t-full bg-zinc-900 dark:bg-zinc-100"
                              transition={{
                                type: "spring",
                                stiffness: 350,
                                damping: 30,
                              }}
                            />
                          )}
                        </div>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-end gap-3 min-w-[140px]">
            <ModeToggle />

            <SignedOut>
              <div className="hidden items-center gap-3 sm:flex ml-1">
                <SignInButton>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Sign In
                  </motion.button>
                </SignInButton>

                <SignUpButton>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer rounded-xl bg-zinc-900 dark:bg-zinc-100 px-5 py-2 text-sm font-semibold text-white dark:text-zinc-900 shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                  >
                    Sign Up
                  </motion.button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                <UserButton
                  showName
                  appearance={{
                    elements: {
                      userButtonBox: "text-zinc-900 dark:text-zinc-50 font-medium",
                      userButtonOuterIdentifier: "text-zinc-900 dark:text-zinc-50 font-medium",
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
