"use client";
import * as React from "react";
import {
  LayoutDashboard,
  Plus,
  LogOut,
  Settings,
  ChevronDown,
  Clock,
  Flame,
  Trophy,
  Lock,
  Check,
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
import { ACHIEVEMENTS } from "@/utils/achievements";
import { cn } from "@/lib/utils";

const mainItems = [
  { title: "Create Quiz", url: "/quiz", icon: Plus, primary: true },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Quiz History", url: "/quiz-history", icon: Clock },
];

interface Props {
  streakData?: {
    currentStreak: number;
    longestStreak: number;
    achievements: string[];
  };
}

export default function AppSideBar({ streakData }: Props) {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const { user } = useUser();
  const pathname = usePathname();

  const isSignedIn = Boolean(auth?.isSignedIn && auth?.userId);

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="px-4 py-6">
        <Link href="/" className="flex items-center gap-2.5 outline-none">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground">
            IC
          </span>
          <span className="text-base font-semibold tracking-tight text-sidebar-foreground">
            IntelliCheck
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 pb-2 text-xs font-medium text-muted-foreground">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors outline-none",
                          item.primary
                            ? "bg-sidebar-primary font-medium text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                            : isActive
                              ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                              : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {isActive && !item.primary && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sidebar-primary" aria-hidden="true" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>

          <div className="mt-8 space-y-2 px-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Flame className="h-4 w-4" />
              <span className="text-xs font-medium">Study streak</span>
            </div>
            <p className="tabular-nums text-2xl font-semibold text-sidebar-foreground">
              {streakData?.currentStreak || 0} <span className="text-sm font-normal text-muted-foreground">days</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Longest streak: {streakData?.longestStreak || 0} days
            </p>
          </div>

          <div className="mt-8 space-y-3 px-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Trophy className="h-4 w-4" />
              <span className="text-xs font-medium">Achievements</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {ACHIEVEMENTS.map((achievement) => {
                const isUnlocked = streakData?.achievements?.includes(achievement.id);

                return (
                  <div
                    key={achievement.id}
                    title={`${achievement.name} — ${achievement.description}`}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-md border px-1 py-2 text-center",
                      isUnlocked
                        ? "border-border bg-card text-foreground"
                        : "border-transparent bg-muted/50 text-muted-foreground opacity-60"
                    )}
                  >
                    {isUnlocked ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                    <span className="w-full truncate text-[10px]">{achievement.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>

      {isSignedIn && (
        <SidebarFooter className="border-t border-sidebar-border p-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <Collapsible open={open} onOpenChange={setOpen} className="w-full">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent">
                    <div className="flex items-center gap-2.5">
                      <UserAvatar />
                      <div className="flex flex-col items-start leading-tight">
                        <span className="max-w-28 truncate font-medium">
                          {user?.firstName || user?.username}
                        </span>
                        <span className="text-xs text-muted-foreground">Personal account</span>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform duration-150",
                        open ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-2 space-y-1 pl-2">
                  <Link
                    href="/user-profile"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>

                  <SignOutButton>
                    <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
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
