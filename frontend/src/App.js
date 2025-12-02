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
    <div className={`${darkMode ? "dark" : ""} min-h-screen`}>
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">

        <Header
          darkMode={darkMode}
          toggleDarkMode={() => {
            setDarkMode(!darkMode);
            document.documentElement.classList.toggle("dark");
          }}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="flex flex-1 overflow-hidden">

          {user?.role === "owner" && (
            <>
              {/* BACKDROP */}
              {sidebarOpen && (
                <div
                  className="fixed inset-0 bg-black/40 md:hidden z-30"
                  onClick={() => setSidebarOpen(false)}
                />
              )}

              {/* DRAWER SIDEBAR */}
              <div
                className={`fixed md:static top-0 left-0 z-40 h-full w-64 shadow-lg
                bg-white dark:bg-gray-800 transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
              >
                <Sidebar
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  closeSidebar={() => setSidebarOpen(false)}
                />
              </div>
            </>
          )}

          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 z-10">
            {renderSection(activeSection, user)}
          </main>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
