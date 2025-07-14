import React from "react";
import BaseMenuItem, {MenuItemConfig} from "../ui/baseMenuItem";
import {
  FaTachometerAlt,
  FaUser,
  FaGift,
  FaClipboardList,
} from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";


const parentMenu: MenuItemConfig[] = [
  {
    label: "Dashboard",
    href: "/dashboard/parent",
    icon: <FaTachometerAlt />,
  },
  {
    label: "Health",
    href: "/dashboard/parent/health",
    icon: <MdLocalHospital />,
  },
  {
    label: "Rewards",
    href: "/dashboard/parent/reward",
    icon: <FaGift />,
  },
  {
    label: "To-Do List",
    href: "/dashboard/parent/todolist",
    icon: <FaClipboardList />,
  },
  {
    label: "Profile",
    href: "/dashboard/parent/profile",
    icon: <FaUser />,
  },
];

export default function ParentSidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white p-4 min-h-screen space-y-4">
      <h2 className="text-2xl font-bold text-blue-400 mb-6">Admin</h2>
      {parentMenu.map((item, index) => (
        <BaseMenuItem key={index} item={item} />
      ))}
    </div>
  );
}

