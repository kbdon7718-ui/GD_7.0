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

// App.js
function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user?.role === "manager") setActiveSection("manager-dashboard");
    else setActiveSection("dashboard");
  }, [user]);

  if (!isAuthenticated) return <Login />;

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""} overflow-x-hidden`}>
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">

        {/* HEADER */}
        <Header
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="flex flex-1 overflow-hidden relative">

          {/* SIDEBAR DRAWER */}
          <>
            {/* BACKDROP */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/40 z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* DRAWER */}
            <div
              className={`fixed top-0 left-0 z-50 h-full w-64
                bg-white dark:bg-gray-800 border-r border-gray-700
                transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:static md:translate-x-0`}
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
          </>

          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            {/* Your routing logic */}
            {activeSection === "dashboard" && <DashboardOverview />}
            {activeSection === "daily-book" && <DailyDataBook />}
            {activeSection === "truck-driver" && <TruckDriver />}
            {activeSection === "maal-in" && <MaalIn />}
            {activeSection === "rokadi" && <RokadiUpdate />}
            {activeSection === "bank" && <BankAccount />}
            {activeSection === "labour" && <LabourSection />}
            {activeSection === "feriwala" && <FeriwalaSection />}
            {activeSection === "kabadiwala" && <KabadiwalaSection />}
            {activeSection === "partnership" && <PartnershipAccount />}
            {activeSection === "rates-update" && <RatesUpdate />}
            {activeSection === "business-reports" && <BusinessReports />}
            {activeSection === "mill" && <MillSection />}
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
