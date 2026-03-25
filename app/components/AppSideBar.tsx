"use client";
import * as React from "react";
import {
  LayoutDashboard,
  Plus,
  Sparkles,
  Zap,
  LogOut,
  Settings,
  ChevronDown,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth, useUser, SignOutButton, UserAvatar } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// MAIN NAV ITEMS
const mainItems = [
  { title: "Create Quiz", url: "/quiz", icon: Plus, primary: true },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Quiz History", url: "/quiz-history", icon: Clock },
];

export default function AppSideBar() {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const { user } = useUser();
  const pathname = usePathname();

  const isSignedIn = Boolean(auth?.isSignedIn && auth?.userId);

  return (
    <Sidebar className="border-r border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* BRAND */}
      <SidebarHeader className="px-6 py-10">
        <Link href="/" className="flex items-center gap-3 group outline-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 shadow-sm transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-zinc-50 dark:text-zinc-900" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              IntelliCheck
            </h2>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-500 dark:text-zinc-400">
              AI Learning
            </p>
          </div>
        </Link>
      </SidebarHeader>

      {/* NAVIGATION */}
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {mainItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 outline-none",
                          item.primary
                            ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-200 mb-4"
                            : isActive
                              ? "bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-50 font-semibold"
                              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                            item.primary
                              ? "bg-white/10 dark:bg-black/10"
                              : isActive
                                ? "bg-zinc-900/5 dark:bg-zinc-100/5"
                                : "bg-zinc-100 dark:bg-zinc-900 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800"
                          )}
                        >
                          {React.createElement(item.icon, {
                            className: cn(
                              "h-4 w-4",
                              item.primary ? "text-current" : isActive ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50"
                            ),
                          })}
                        </div>
                        <span className="text-sm">{item.title}</span>
                        {item.primary && (
                          <Zap className="ml-auto h-3.5 w-3.5 fill-current opacity-80" />
                        )}
                        {isActive && !item.primary && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute left-[-12px] w-1 h-5 rounded-r-full bg-zinc-900 dark:bg-zinc-50"
                          />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* USER FOOTER */}
      {isSignedIn && (
        <SidebarFooter className="border-t border-zinc-200/50 dark:border-zinc-800/50 p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <Collapsible open={open} onOpenChange={setOpen} className="w-full">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer transition-colors outline-none">
                    <div className="flex items-center gap-3">
                      <div className="ring-2 ring-zinc-200 dark:ring-zinc-800 rounded-full overflow-hidden">
                        <UserAvatar />
                      </div>
                      <div className="flex flex-col items-start leading-tight">
                        <span className="font-bold text-zinc-900 dark:text-zinc-50 truncate max-w-[120px]">
                          {user?.firstName || user?.username}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-medium tracking-wide">
                          Personal account
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-zinc-400 transition-transform duration-200",
                        open ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-3 space-y-1">
                  <Link
                    href="/user-profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>

                  <SignOutButton>
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all">
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </SignOutButton>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
