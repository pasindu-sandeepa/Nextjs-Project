import UserNav from "./components/user_nav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/side_panel"; // Adjusted import path

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-green-100">
        {/* Sidebar */}
        <AppSidebar />
        
        <div className="flex flex-1 flex-col overflow-hidden w-full">
          {/* Header */}
          <header className="bg-white flex h-16 items-center justify-between border-b px-6 shadow-sm w-full">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold text-blue-800">Movie Dashboard</h1>
            <UserNav />
          </header>

          {/* Dashboard content that takes full screen */}
          <main className="flex-1 overflow-y-auto bg-blue-100 p-6 w-full">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
