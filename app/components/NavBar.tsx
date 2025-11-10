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
            <div className="max-w-5xl mx-auto flex flex-col items-center" >
                <Link href="/" className="text-5xl font-bold mt-3">
                    Quizzify
                </Link>

                <NavigationMenu>
                    <NavigationMenuList className="flex justify-center space-x-6 mt-4 mb-2">
                        {["Home", "Quiz", "Results"].map((item) => (
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

