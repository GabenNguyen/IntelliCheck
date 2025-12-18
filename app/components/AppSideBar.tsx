"use client";
import * as React from "react";
import {
  LayoutDashboard,
  Plus,
  BarChart3,
  Star,
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
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Create Quiz",
    url: "/quiz",
    icon: Plus,
    primary: true,
  },
];

const progressItems = [
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: Star,
  },
];

export default function AppSideBar() {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const { user } = useUser();

  const isSignedIn = Boolean(auth?.isSignedIn && auth?.userId);

  return (
    <Sidebar className="border-r border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-950/60 backdrop-blur-xl">
      {/* BRAND */}
      <SidebarHeader className="px-6 py-8 border-b border-gray-200/60 dark:border-gray-800/60">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 shadow-lg">
            <Sparkles className="h-4 w-4 text-white" /> {/* smaller */}
          </div>
          <div className="leading-tight">
            <h2 className="text-lg font-extrabold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
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
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 active:scale-95 transition-all duration-200 ${
                        item.primary
                          ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-600/70 dark:hover:bg-gray-800/60"
                      }`}
                    >
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                          item.primary
                            ? "bg-white/20"
                            : "bg-linear-to-br from-blue-500 to-purple-500"
                        }`}
                      >
                        {React.createElement(item.icon, {
                          className: "h-3 w-3 text-white", // smaller icons
                        })}
                      </div>
                      <span className="font-medium">{item.title}</span>
                      {item.primary && (
                        <Zap className="ml-auto h-3 w-3 animate-pulse" /> // smaller
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* USER */}
      {isSignedIn && (
        <SidebarFooter className="border-t border-gray-200/60 dark:border-gray-800/60 p-3 ">
          <SidebarMenu>
            <SidebarMenuItem>
              <Collapsible open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/60 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <UserAvatar />
                      <span className="font-medium truncate">
                        {user?.firstName || user?.username}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${
                        open ? "rotate-180" : "rotate-0"
                      }`} // smaller
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-2 space-y-1">
                  <Link
                    href="/user-profile"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-gray-800/60"
                  >
                    <Settings className="h-3 w-3" /> {/* smaller */}
                    Settings
                  </Link>

                  <SignOutButton>
                    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-gray-800/60 cursor-pointer">
                      <LogOut className="h-3 w-3" /> {/* smaller */}
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
