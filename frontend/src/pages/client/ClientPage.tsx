import React, { useState } from "react";
import { Header } from "../../components/header&etc/Header";
import { SideBarClient } from "../../components/header&etc/SideBarClient";
import { Outlet } from "react-router-dom";

export const ClientPage = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="h-screen bg-gray-200">
      <Header sibarToggle={sidebarToggle} setSibarToggle={setSidebarToggle} />
      <div className="flex h-screen">
        <SideBarClient sideBarToggle={sidebarToggle} />
        <Outlet />
      </div>
    </div>
  );
};
