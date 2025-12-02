// App.js (or wherever your main AppContent lives)
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
  const [darkMode, setDarkMode] = useState(false);

  // sidebar drawer state (hidden by default)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user?.role === "manager") {
      setActiveSection("manager-dashboard");
    } else if (user?.role === "owner") {
      setActiveSection("dashboard");
    }
  }, [user]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderActiveSection = () => {
    if (user?.role === "manager") {
      return <ManagerDashboard />;
    }

    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "daily-book":
        return <DailyDataBook />;
      case "maal-in":
        return <MaalIn />;
      case "truck-driver":
        return <TruckDriver />;
      case "rokadi":
        return <RokadiUpdate />;
      case "bank":
        return <BankAccount />;
      case "labour":
        return <LabourSection />;
      case "feriwala":
        return <FeriwalaSection />;
      case "kabadiwala":
        return <KabadiwalaSection />;
      case "partnership":
        return <PartnershipAccount />;
      case "rates-update":
        return <RatesUpdate />;
      case "business-reports":
        return <BusinessReports />;
      case "mill":
        return <MillSection />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    // prevent horizontal scroll
    <div className={`min-h-screen ${darkMode ? "dark" : ""} overflow-x-hidden`}>
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header (z-50) */}
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex flex-1 overflow-hidden relative">
          {/* OWNER: Drawer Sidebar only opens when sidebarOpen=true */}
          {user?.role === "owner" && (
            <>
              {/* Backdrop */}
              {sidebarOpen && (
                <div
                  className="fixed inset-0 bg-black/40 z-30"
                  onClick={() => setSidebarOpen(false)}
                />
              )}

              {/* Drawer - translate toggled here */}
              <div
                className={`fixed left-0 z-40 transition-transform duration-300
                  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                // width + top + height are controlled inside Sidebar component
                style={{ top: 0 /* keep top at 0 so Sidebar uses its own top-16 */, left: 0 }}
              >
                {/* Sidebar component itself uses top-16, so it will show just under header */}
                <Sidebar
                  activeSection={activeSection}
                  setActiveSection={(s) => {
                    setActiveSection(s);
                    setSidebarOpen(false); // close when selecting
                  }}
                  closeSidebar={() => setSidebarOpen(false)}
                />
              </div>
            </>
          )}

          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            {renderActiveSection()}
          </main>
        </div>
      </div>

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
