import React, { useState } from "react";

import {} from "../../components/header&etc/SideBarAdmin";
import { Header } from "../../components/header&etc/Header";
import { SideBarClient } from "../../components/header&etc/SideBarClient";

export const ClientPage = () => {
  const [sibarToggle, setSibarToggle] = useState(false);
  return (
    <div>
      <Header sibarToggle={sibarToggle} setSibarToggle={setSibarToggle} />
      <SideBarClient sideBarToggle={sibarToggle} />
    </div>
  );
};
