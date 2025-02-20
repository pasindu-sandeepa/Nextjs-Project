import UserNav from "./components/user_nav";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* side panel */}
      <aside className="w-64 overflow-y-auto border-r bg-green-500 shadow-lg">
        Side panel
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* header */}
        <header className="bg-white flex h-16 items-center justify-between border-b px-6 shadow-sm">
          <h1 className="text-2xl font-bold text-blue-800">Movie Dashboard</h1>
          <UserNav />
        </header>
        {/* Dashboard pages */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
