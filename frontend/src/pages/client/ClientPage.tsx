import React, { useState } from "react";

import {} from "../../components/header&etc/SideBarAdmin";
import { Header } from "../../components/header&etc/Header";
import { SideBarClient } from "../../components/header&etc/SideBarClient";
import { Cards } from "../../components/quiz/Cards";
import { Outlet } from "react-router-dom";

export const ClientPage = () => {
  const [sibarToggle, setSibarToggle] = useState(false);
  return (
    <div>
      <Header sibarToggle={sibarToggle} setSibarToggle={setSibarToggle} />
      <div className="flex">
        <SideBarClient sideBarToggle={sibarToggle} />
        <Outlet />
      </div>
    </div>
  );
};
