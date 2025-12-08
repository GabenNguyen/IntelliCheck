import Dashboard from "../components/DashBoard";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashBoardPage() {
    const user = await currentUser();
    
    const userName = user?.username || user?.firstName || "";

    return (
        <Dashboard userName={userName} />
    )

}