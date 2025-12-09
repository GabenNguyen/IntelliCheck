"use client"

import { LayoutDashboard, Plus, BarChart3, Star, Sparkles, Zap, LogOut, Settings, ChevronDown } from "lucide-react"

import Link from "next/link"
import { useState } from "react"

import { useAuth, useUser, SignOutButton, UserAvatar } from "@clerk/nextjs"

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
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


const mainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Create Quiz",
    url: "/quiz",
    icon: Plus,
    gradient: "from-purple-500 to-pink-500",
    highlight: true,
  }
]

const progressItems = [
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: Star,
    gradient: "from-pink-500 to-rose-500",
  },
]

function AppSideBar() {
  const [open, setOpen] = useState(false);

  const { isSignedIn, userId} = useAuth(); // check if user is signed in
  const { user } = useUser(); // display user first name

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-800 pb-6 pt-8 px-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              IntelliCheck
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">AI-Powered Learning</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 mb-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="group">
                    <Link 
                      href={item.url}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                        item.highlight 
                          ? 'bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className={`${item.highlight ? '' : `bg-linear-to-br ${item.gradient} p-2 rounded-lg`}`}>
                        <item.icon className={`w-4 h-4 ${item.highlight ? 'text-white' : 'text-white'}`} />
                      </div>
                      <span className="font-medium">{item.title}</span>
                      {item.highlight && (
                        <Zap className="w-4 h-4 ml-auto animate-pulse" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Progress Section */}
        {isSignedIn && userId && (

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 mb-2">
            Your Progress
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {progressItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="group">
                    <Link 
                      href={item.url}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200"
                    >
                      <div className={`bg-linear-to-br ${item.gradient} p-2 rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        )}

      </SidebarContent>
      
      {isSignedIn && userId && (
        <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 p-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <Collapsible open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className=" cursor-pointer w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm transition-colors duration-200">
                    <div className="flex items-center gap-2">
                      <UserAvatar />
                      <span className="font-medium">{user?.firstName || user?.username}</span>
                    </div>
                    <span className={`transition-transform duration-300 ease-in-out ${
                      open ? "rotate-180" : "rotate-0"
                    }`}>
                      <ChevronDown />
                    </span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-1 mt-1 pl-2 transition-all duration-300 ease-in-out 
                      overflow-hidden
                      data-[state=closed]:opacity-0
                      data-[state=open]:opacity-100
                      data-[state=closed]:max-h-0 
                      data-[state=open]:max-h-40"
                  >
                    <ul className="space-y-1" >
                      <SidebarMenuItem>
                        
                          <Link
                            href="/user-profile"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm transition-colors duration-200"
                          >
                          <Settings /> Settings
                          </Link>
                        
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        
                          <SignOutButton>
                            <button 
                              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm transition-colors duration-200 cursor-pointer flex items-center gap-2"
                            >
                              <LogOut /> Log Out 
                            </button>
                          </SignOutButton>
                        
                      </SidebarMenuItem>

                    </ul>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}

      
    </Sidebar>
  )
}

export default AppSideBar