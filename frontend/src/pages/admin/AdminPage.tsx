import React, { useState } from "react";

import { SideBarAdmin } from "../../components/header&etc/SideBarAdmin";
import { Header } from "../../components/header&etc/Header";

export const AdminPage = () => {
  const [sibarToggle, setSibarToggle] = useState(false);
  return (
    <div>
      <Header sibarToggle={sibarToggle} setSibarToggle={setSibarToggle} />
      <SideBarAdmin sideBarToggle={sibarToggle} />
    </div>
  );
};
