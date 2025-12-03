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
                <Link href="/" className="text-5xl text-blue-600 font-bold mt-3">
                    🧞 QuizGenie
                </Link>

                <NavigationMenu className="flex-1 -m-px flex justify-center">
                    <NavigationMenuList className="flex items-center justify-center space-x-3 mt-4 mb-2">
                        {navItems.map(({label, href}) => (
                            <NavigationMenuItem key={label}>
                                <NavigationMenuLink asChild>
                                    <Link href={href} 
                                    className={cn(pathname === href && 'text-lg! font-semibold underline bg-white ')}
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

