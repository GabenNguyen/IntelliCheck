export default function DashboardReloading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* spinner */}
        <div className="h-12 w-12 animate-spin animate-fade-in duration-300 rounded-full border-4 border-black dark:border-white border-t-transparent" />
        <p className="dark:text-white text-black font-medium">
          Loading dashboard data...
        </p>
      </div>
    </div>
  );
}
