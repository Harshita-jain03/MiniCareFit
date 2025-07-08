import BaseMenuItem, {MenuItemConfig} from "../ui/baseMenuItem";
import { FaTachometerAlt, FaUser, FaTasks,FaGift,FaClipboardList,FaStopwatch } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder, MdLocalHospital } from "react-icons/md";
//import { , FaStar, FaTrophy, FaMedal } from "react-icons/fa";


const childMenu: MenuItemConfig[] = [
  { label: "Dashboard", href: "/dashboard/child",  },
  { label: "Health", href: "/dashboard/child/health", icon: <MdLocalHospital  /> },
  { label: "Reward", href: "/dashboard/child/rewards", icon: <FaGift /> },
  { label: "Tools", href: "/dashboard/child/tools", icon: <FaStopwatch /> },
  { label: "To-Do List", href: "/dashboard/child/to-do-list", icon: <FaClipboardList /> }
  
];

export default function ChildSidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white p-4 min-h-screen space-y-4">
      <h2 className="text-2xl font-bold text-blue-400 mb-6">Student</h2>
      {childMenu.map((item, index) => (
        <BaseMenuItem key={index} item={item} />
      ))}
    </div>
  );
}
