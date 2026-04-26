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
  Show,
  UserButton,
} from "@clerk/nextjs";
import { Sparkles, Cpu, Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Quiz", href: "/quiz" },
  { label: "Results", href: "/results" },
];

function NavBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-violet-500/20 dark:border-violet-500/20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-xs font-sans"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid h-16 md:h-20 grid-cols-[minmax(200px,auto)_1fr_minmax(200px,auto)] items-center">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="cursor-pointer rounded-xl p-2.5 transition-colors hover:bg-violet-100 dark:hover:bg-violet-900/30 text-slate-600 dark:text-slate-400" />

            <Link href="/" className="group flex items-center gap-3 outline-none">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30 transition-colors"
              >
                <Sparkles className="h-5 w-5 text-white" />
              </motion.div>

              <span className="hidden text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:block">
                IntelliCheck
              </span>
            </Link>
          </div>

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
                                ? "text-violet-700 dark:text-violet-300"
                                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                            )}
                          >
                            {label}
                            {active && (
                              <motion.span
                                layoutId="nav-underline"
                                className="absolute left-4 right-4 -bottom-px h-0.5 rounded-t-full bg-violet-600 dark:bg-violet-400"
                                transition={{
                                  type: "spring",
                                  stiffness: 350,
                                  damping: 30,
                                }}
                              />
                            )}
                          </Link>
                        </div>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center justify-end gap-3 min-w-35">
            <ModeToggle />

            <Show when={"signed-out"}>
              <div className="hidden items-center gap-3 sm:flex ml-1">
                <SignInButton>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
                  >
                    Sign In
                  </motion.button>
                </SignInButton>

                <SignUpButton>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
                  >
                    Sign Up
                  </motion.button>
                </SignUpButton>
              </div>
            </Show>

            <Show when={"signed-in"}>
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
                      userButtonBox: "text-slate-900 dark:text-slate-50 font-medium",
                      userButtonOuterIdentifier: "text-slate-900 dark:text-slate-50 font-medium",
                    },
                  }}
                />
              </motion.div>
            </Show>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default NavBar;