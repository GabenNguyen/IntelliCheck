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
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth, useUser, SignOutButton, UserAvatar } from "@clerk/nextjs";

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

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Create Quiz", url: "/quiz", icon: Plus, primary: true },
];

export default function AppSideBar() {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const { user } = useUser();

  const isSignedIn = Boolean(auth?.isSignedIn && auth?.userId);

  return (
    <Sidebar className="border-r border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-950/70 backdrop-blur-lg">
      {/* BRAND */}
      <SidebarHeader className="px-6 py-8 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-gray-700 to-gray-900 shadow-md transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-white" />
          </div>

          <div className="leading-tight">
            <h2 className="text-lg font-extrabold text-black dark:text-white">
              IntelliCheck
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              AI-powered learning
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* NAVIGATION */}
      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 active:scale-95 ${
                        item.primary
                          ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/60"
                      }`}
                    >
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                          item.primary
                            ? "bg-white/20"
                            : "bg-gray-500/50 dark:bg-gray-700/50"
                        }`}
                      >
                        {React.createElement(item.icon, {
                          className: "h-3 w-3 text-white",
                        })}
                      </div>
                      <span className="font-medium">{item.title}</span>
                      {item.primary && (
                        <Zap className="ml-auto h-3 w-3 animate-pulse" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* USER FOOTER */}
      {isSignedIn && (
        <SidebarFooter className="border-t border-gray-200/50 dark:border-gray-800/50 p-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <Collapsible open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/60 cursor-pointer transition">
                    <div className="flex items-center gap-2">
                      <UserAvatar />
                      <span className="font-medium truncate">
                        {user?.firstName || user?.username}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-2 space-y-1">
                  <Link
                    href="/user-profile"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-gray-800/60 transition"
                  >
                    <Settings className="h-3 w-3" />
                    Settings
                  </Link>

                  <SignOutButton>
                    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-gray-800/60 transition">
                      <LogOut className="h-3 w-3" />
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
