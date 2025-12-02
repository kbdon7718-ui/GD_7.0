// components/Header.jsx
import { Bell, Search, Moon, Sun, LogOut, Menu as MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "../utils/authContext";

export function Header({ darkMode, toggleDarkMode, onMenuClick }) {
  const { user, logout } = useAuth();

  const getInitials = (name) =>
    (name || "")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const getRoleBadge = (role) => (role === "owner" ? "Owner" : "Manager");

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-800 
                       border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between gap-4 flex-wrap">

        {/* Hamburger */}
        <button
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={onMenuClick}
        >
          <MenuIcon className="w-6 h-6 text-gray-700 dark:text-white" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
            <span className="text-white">SC</span>
          </div>
          <div>
            <h1 className="text-gray-900 dark:text-white">ScrapCo</h1>
            <p className="text-gray-500 dark:text-gray-400">Godown Management</p>
          </div>
        </div>

        {/* Search */}
        <div className="w-full md:flex-1 md:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input type="text" className="pl-10 w-full" placeholder="Search records..." />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />

          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>

          {/* USER MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback>{user ? getInitials(user.name) : "U"}</AvatarFallback>
                </Avatar>
                <div className="text-left hidden sm:block">
                  <div className="text-sm">{user?.name}</div>
                  <div className="text-xs text-gray-500">{getRoleBadge(user?.role)}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{user?.email}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
