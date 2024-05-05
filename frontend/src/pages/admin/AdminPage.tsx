import React, { useState } from "react";

import { SideBarAdmin } from "../../components/header&etc/SideBarAdmin";
import { Header } from "../../components/header&etc/Header";
import { Outlet } from "react-router-dom";

export const AdminPage = () => {
  const [sibarToggle, setSibarToggle] = useState(false);

  return (
    <div className="h-screen bg-gray-200">
      <Header sibarToggle={sibarToggle} setSibarToggle={setSibarToggle} />
      <div className="flex h-screen">
        <SideBarAdmin sideBarToggle={sibarToggle} />
        <Outlet />
      </div>
    </div>
  );
};
