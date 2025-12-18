import Dashboard from "../components/DashBoard";
import { fetchDashboardData } from "@/lib/db/dashboard_data";

export default async function DashBoardPage() {
  const { userName, dashboardData } = await fetchDashboardData();

  return <Dashboard userName={userName} dashboardData={dashboardData} />;
}
