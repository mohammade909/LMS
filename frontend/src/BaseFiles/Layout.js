import NavbarMenu from "./NavbarMenu";
import SidebarMenu from "./SideBarMenu";
import { useState } from "react";

export default function Layout({ children }) {
  const currentUrl = window.location.href;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-full bg-gray-600 overflow-hidden">
      <aside
        className={`${
          sidebarCollapsed ? "w-20" : "w-60"
        } transition-all duration-300 ease-in-out overflow-y-auto`}
        style={{ height: "calc(100vh - 60px)" }}
      >
        <SidebarMenu toggleSidebar={toggleSidebar} />
      </aside>
      <div className="flex flex-col w-full h-screen">
        <NavbarMenu />
        <div className="flex flex-col flex-grow z-50 px-4">
          <div className="bg-[#e2e8f0]-200 p-4 flex-grow overflow-auto ">
            <p className="text-xs font-sans capitalize tracking-widest py-3   text-white w-[98%] m-auto">
              Home - {`${currentUrl.split("/")[3]} / ${currentUrl.split("/")[4]}`}
            </p>
            <div className="shadow-green-800" style={{ height: "calc(100vh - 100px)" }}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
