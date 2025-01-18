"use client";

import React from "react";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { MenuItem } from "@/types/menu";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuItems: MenuItem[] = [
  {
    icon: "Home",
    label: "Dashboard",
    route: "/"
  },
  {
    icon: "Group",
    label: "Users",
    route: "users"
  },
  {
    icon: "Task",
    label: "Tasks",
    route: "tasks"
  }
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", pathname);

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${sidebarOpen
          ? "translate-x-0 duration-300 ease-linear"
          : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6">

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            // className="block"
            className="block lg:hidden"
          >
            <span className="material-symbols-outlined">{"Menu"}</span>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-1 px-4 lg:px-6">
            <li className="mb-6 flex flex-col gap-2">
              {menuItems.map((menuItem, menuIndex) => (
                <SidebarItem
                  key={menuIndex}
                  item={menuItem}
                  pageName={pageName}
                  setPageName={setPageName}
                />
              ))}
            </li>
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
