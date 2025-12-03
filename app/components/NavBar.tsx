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

const navItems = [
    {label: "Home", href: '/' },
    {label: "About", href: '/about' },
    {label: "Quiz", href: '/quiz' },
    {label: "Results", href: '/results' },
];

function NavBar() {
    const pathname = usePathname();
    return (
        <nav className="bg-blue-200 dark:bg-black dark:text-white shadow-md">
            <div className="max-w-5xl mx-auto flex items-center justify-between p-4" >
                <Link href="/" className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400">
                   🧐 IntelliCheck
                </Link>

                <NavigationMenu className="flex-1 -m-px flex justify-center">
                    <NavigationMenuList className="flex items-center justify-center space-x-3 mt-4 mb-2">
                        {navItems.map(({label, href}) => (
                            <NavigationMenuItem key={label}>
                                <NavigationMenuLink asChild>
                                    <Link href={href} 
                                    className={cn("relative text-lg md:text-xl px-2 py-1 rounded-md transition-colors hover:bg-blue-100 dark:hover:bg-blue-800 dark:hover:text-blue-200", pathname === href && 'font-bold underline dark:text-blue-300')}
                                    >
                                        {label}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                     <ModeToggle />
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    );
}

export default NavBar

