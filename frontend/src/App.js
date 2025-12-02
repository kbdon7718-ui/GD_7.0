// App.js
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

import { DashboardOverview } from "./components/DashboardOverview";
import { DailyDataBook } from "./components/DailyDataBook";
import TruckDriver from "./components/TruckDriver";
import MaalIn from "./components/MaalIn";
import { RokadiUpdate } from "./components/RokadiUpdate";
import { BankAccount } from "./components/BankAccount";
import { FeriwalaSection } from "./components/FeriwalaSection";
import { LabourSection } from "./components/LabourSection";
import KabadiwalaSection from "./components/KabadiwalaSection";
import { PartnershipAccount } from "./components/PartnershipAccount";
import { BusinessReports } from "./components/BusinessReports";
import { MillSection } from "./components/MillSection";
import RatesUpdate from "./components/RatesUpdate";
import { ManagerDashboard } from "./components/manager/ManagerDashboard";

import { Login } from "./components/Login";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider, useAuth } from "./utils/authContext";
import { DataProvider } from "./utils/dataContext";

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  if (!isAuthenticated) return <Login />;

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""} overflow-x-hidden`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* BACKDROP */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR DRAWER */}
      <div
        className={`fixed left-0 top-0 z-40 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar
          activeSection={activeSection}
          setActiveSection={(s) => {
            setActiveSection(s);
            setSidebarOpen(false);
          }}
          closeSidebar={() => setSidebarOpen(false)}
        />
      </div>

      <main className="pt-20 p-4 overflow-y-auto">{/* content */}</main>

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}
