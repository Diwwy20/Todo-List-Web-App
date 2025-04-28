import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* ----- Mobile menu button ----- */}
      <button
        className="fixed top-4 right-4 z-50 md:hidden bg-blue-100 px-4 py-2 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* ----- Sidebar ----- */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ----- Main content ----- */}
      <div className="flex-1 flex flex-col w-full md:ml-16 lg:ml-0 overflow-auto">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
