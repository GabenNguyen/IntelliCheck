"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Sparkle } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const navItems = [
    {label: "Home", href: '/' },
    {label: "About", href: '/about' },
    {label: "Quiz", href: '/quiz' },
    {label: "Results", href: '/results' },
];

function NavBar() {
    const pathname = usePathname();
    return (
        <nav className="bg-linear-to-r from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 border-b border-blue-100 dark:border-gray-800 backdrop-blur-sm shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <SidebarTrigger className="cursor-pointer"/>
                    <Link href="/" className="flex items-center space-x-2 group">
                        <span className="text-4xl transition-transform group-hover:scale-110 duration-300"><Sparkle /></span>
                        <span className="text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            IntelliCheck
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList className="flex items-center space-x-1">
                            {navItems.map(({label, href}) => (
                                <NavigationMenuItem key={label}>
                                    <NavigationMenuLink asChild>
                                        <Link 
                                            href={href} 
                                            className={cn(
                                                "relative px-4 py-2 text-lg! font-medium rounded-lg transition-all duration-200",
                                                "text-gray-700 dark:text-gray-300",
                                                "hover:bg-blue-100 dark:hover:bg-gray-800",
                                                pathname === href && "bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-bold shadow-sm"
                                            )}
                                        >
                                            {label}
                                            {pathname === href && (
                                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full" />
                                            )}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Right Section: Mode Toggle + Auth Buttons */}
                    <div className="flex items-center gap-3">
                        <ModeToggle />
                        
                        <SignedOut>
                            <div className="hidden sm:flex items-center gap-2">
                                <SignInButton>
                                    <button className="cursor-pointer px-5 py-2.5 rounded-lg font-medium text-sm
                                        bg-white dark:bg-gray-800 
                                        text-gray-700 dark:text-gray-300
                                        border border-gray-200 dark:border-gray-700
                                        hover:border-blue-400 dark:hover:border-blue-500
                                        hover:shadow-md hover:scale-105
                                        transition-all duration-200">
                                        Sign In
                                    </button>
                                </SignInButton>

                                <SignUpButton>
                                    <button className="cursor-pointer px-5 py-2.5 rounded-lg font-semibold text-sm
                                        bg-linear-to-r from-blue-600 to-purple-600 
                                        hover:from-blue-700 hover:to-purple-700
                                        text-white shadow-md 
                                        hover:shadow-lg hover:scale-105
                                        transition-all duration-200">
                                        Sign Up
                                    </button>
                                </SignUpButton>
                            </div>
                        </SignedOut>

                        <SignedIn>
                            <div className="flex items-center">
                                <UserButton 
                                    showName
                                    appearance={{
                                        elements: {
                                            userButtonBox: "text-black dark:text-white"
                                        }
                                    }} 
                                />
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar