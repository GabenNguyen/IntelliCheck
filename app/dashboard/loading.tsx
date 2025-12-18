export default function DashboardReloading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* spinner */}
        <div className="h-12 w-12 animate-spin animate-fade-in duration-300 rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-gray-600 font-medium">Loading dashboard data...</p>
      </div>
    </div>
  );
}
