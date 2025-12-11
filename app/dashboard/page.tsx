import Dashboard from "../components/DashBoard";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";


export default async function DashBoardPage() {
    try {
        const clerkUser = await currentUser();

        if(!clerkUser) {
            redirect("/sign-in")
        }

        const user = await prisma.user.upsert({
            where: {id: clerkUser.id},
            update: {},
            create: {
                id: clerkUser.id,
                email: clerkUser.emailAddresses[0]?.emailAddress || "",
                name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User"
            },
        })


        return (
            <Dashboard userName={user.name} />
        )
    } catch (error) {
        console.error("Error loading dashboard page!", error)
    }
    

}