import { Dashboard } from "../components/dashboard";
import { fetchDashboardData } from "@/lib/db/dashboard";

export default async function DashBoardPage() {
  const { userName, dashboardData } = await fetchDashboardData();

  return <Dashboard userName={userName} dashboardData={dashboardData} />;
}
