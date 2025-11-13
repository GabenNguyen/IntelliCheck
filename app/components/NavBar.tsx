"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { ModeToggle } from "./ModeToggle";

function NavBar() {
    return (
        <nav className="bg-blue-200 dark:bg-black dark:text-white shadow-md">
            <div className="max-w-5xl mx-auto flex items-center justify-between p-4" >
                <Link href="/" className="text-5xl text-blue-600 font-bold mt-3">
                    🧞 QuizGenie
                </Link>

                <NavigationMenu className="flex-1 -m-px flex justify-center">
                    <NavigationMenuList className="flex items-center justify-center space-x-3 mt-4 mb-2">
                        {["Home", "About", "Quiz", "Results"].map((item) => (
                            <NavigationMenuItem key={item}>
                                <NavigationMenuLink asChild>
                                    <Link href={item === "Home" ? `/`: `/${item.toLowerCase()}` } 
                                    className="!text-xl hover:underline"
                                    >
                                        {item}
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

