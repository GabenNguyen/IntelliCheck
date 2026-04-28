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
  Cpu,
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
import { Flame, Trophy, Lock } from "lucide-react";
import { ACHIEVEMENTS } from "@/utils/achievements";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const mainItems = [
  { title: "Create Quiz", url: "/quiz", icon: Plus, primary: true },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Quiz History", url: "/quiz-history", icon: Clock },
];

interface Props {
  streakData?: {
    currentStreak: number,
    longestStreak: number,
    achievements: string[]
  }
}

export default function AppSideBar({ streakData }: Props) {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const { user } = useUser();
  const pathname = usePathname();

  const isSignedIn = Boolean(auth?.isSignedIn && auth?.userId);

  return (
    <Sidebar className="border-r border-violet-500/20 dark:border-violet-500/20 bg-linear-to-b from-white via-white to-violet-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/20 font-sans">
      <SidebarHeader className="px-6 py-10">
        <Link href="/" className="flex items-center gap-3 group outline-none">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30 transition-transform group-hover:scale-105 group-hover:rotate-3">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              IntelliCheck
            </h2>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-500 dark:text-violet-400 flex items-center gap-1">
              <Cpu className="w-2.5 h-2.5" />
              AI Learning
            </p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 outline-none",
                          item.primary
                            ? "bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:translate-x-1 mb-4"
                            : isActive
                              ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-semibold ring-2 ring-violet-500 ring-offset-2 dark:ring-offset-slate-900"
                              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                            item.primary
                              ? "bg-white/20 dark:bg-white/10"
                              : isActive
                                ? "bg-violet-500/10 dark:bg-violet-500/20"
                                : "bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                          )}
                        >
                          {React.createElement(item.icon, {
                            className: cn(
                              "h-4 w-4",
                              item.primary
                                ? "text-white"
                                : isActive
                                  ? "text-violet-600 dark:text-violet-400"
                                  : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                            ),
                          })}
                        </div>
                        <span className="text-sm font-medium">{item.title}</span>
                        {item.primary && (
                          <Zap className="ml-auto h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse" />
                        )}
                        {isActive && !item.primary && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute left-0 w-1 h-6 rounded-r-full bg-violet-600 dark:bg-violet-400"
                          />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
          {/* Streak Display - Always Visible */}
          <div className="px-3 mt-6">
            <div className="relative bg-linear-to-r from-orange-500 to-red-500 rounded-2xl p-4 text-white overflow-hidden">
              {/* Fire glow effect */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-400/30 rounded-full blur-2xl" />

              <div className="relative flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs opacity-80">Current Streak</p>
                  <p className="text-xl font-bold">{streakData?.currentStreak || 0} days</p>
                </div>
              </div>

              <p className="relative text-xs mt-2 opacity-70">
                Best: {streakData?.longestStreak || 0} days
              </p>
            </div>
          </div>
          {/* Achievements Preview - Always Visible */}
          <div className="px-3 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Achievements
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {ACHIEVEMENTS.map((achievement) => {
                const isUnlocked = streakData?.achievements?.includes(achievement.id);

                return (
                  <div
                    key={achievement.id}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${isUnlocked
                      ? "bg-linear-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
                      : "bg-slate-100 dark:bg-slate-800/50 opacity-50"
                      }`}
                    title={achievement.description}
                  >
                    {isUnlocked ? (
                      <span className="text-lg">{achievement.icon}</span>
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                    <span className="text-[10px] font-medium mt-1 text-slate-600 dark:text-slate-400 line-clamp-1">
                      {achievement.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>

      {isSignedIn && (
        <SidebarFooter className="border-t border-violet-500/20 dark:border-violet-500/20 p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <Collapsible open={open} onOpenChange={setOpen} className="w-full">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 cursor-pointer transition-colors outline-none border border-transparent hover:border-violet-200 dark:hover:border-violet-800">
                    <div className="flex items-center gap-3">
                      <div className="ring-2 ring-violet-500/30 dark:ring-violet-500/50 rounded-full overflow-hidden">
                        <UserAvatar />
                      </div>
                      <div className="flex flex-col items-start leading-tight">
                        <span className="font-bold text-slate-900 dark:text-slate-100 truncate max-w-30">
                          {user?.firstName || user?.username}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                          Personal account
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-slate-400 transition-transform duration-200",
                        open ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-3 space-y-1.5 pl-2">
                  <Link
                    href="/user-profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-violet-700 dark:hover:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>

                  <SignOutButton>
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all">
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