 
import { FaTachometerAlt, FaUser, FaTasks } from "react-icons/fa";
import BaseMenuItem, {MenuItemConfig} from "../ui/baseMenuItem";

const adminMenu: MenuItemConfig[] = [
  { label: "Dashboard", href: "/dashboard/admin", icon: <FaTachometerAlt /> },
  { label: "Students", href: "/dashboard/admin/student", icon: <FaUser /> },
  {label:"Parent",href:"/dashboard/admin/parent",icon:<FaUser/>},
  { label: "To-Do List", href: "/dashboard/admin/to-do-list", icon: <FaTasks /> },
  {label:"account",href:"/dashboard/admin/account",icon:<FaTasks/>}
];

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white p-4 min-h-screen space-y-4">
      <h2 className="text-2xl font-bold text-blue-400 mb-6">Teacher</h2>
      {adminMenu.map((item, index) => (
        <BaseMenuItem key={index} item={item} />
      ))}
    </div>
  );
}
