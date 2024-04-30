import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { IoHomeOutline } from "react-icons/io5";
import { Link, Navigate } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem(
    "Dashboard",
    "home",
    null,
    [
      getItem(
        "Trang chủ",
        "1",
        <Link to={"/"}>
          {" "}
          <IoHomeOutline />{" "}
        </Link>
      ),
    ],
    "group"
  ),
  getItem("Quiz", "sub1", <MailOutlined />, [getItem("Danh sách", "2")]),

  { type: "divider" },

  getItem("Bảng điểm", "score", null),
];

export const SideBarClient = ({
  sideBarToggle,
}: {
  sideBarToggle: boolean;
}) => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  return (
    <div
      className={`w-64 h-screen bg-gray-800 transition-all duration-500 transform ${
        sideBarToggle ? "" : "-translate-x-full"
      }`}
    >
      <Menu
        className="h-screen bg-gray-400 text-white"
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </div>
  );
};
