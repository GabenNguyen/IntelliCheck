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
import { SidebarTrigger } from "@/components/ui/sidebar";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Quiz", href: "/quiz" },
];

function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Show when="signed-in">
            <SidebarTrigger className="-ml-2 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" />
          </Show>

          <Link href="/" className="flex items-center gap-2.5 outline-none">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-xs font-semibold tracking-tight text-primary-foreground">
              IC
            </span>
            <span className="text-base font-semibold tracking-tight text-foreground">
              IntelliCheck
            </span>
          </Link>
        </div>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {navItems.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ModeToggle />

          <Show when="signed-out">
            <SignInButton>
              <button className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                Sign in
              </button>
            </SignInButton>

            <SignUpButton>
              <button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Sign up
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
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
    </nav>
  );
}

export default NavBar;
