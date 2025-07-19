"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";

export type MenuItemConfig = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export default function BaseMenuItem({ item }: { item: MenuItemConfig }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
        isActive ? "bg-blue-600 text-white" : "text-gray-200 hover:bg-blue-700 hover:text-white"
      }`}
    >
      {item.icon || <FaChevronRight />}
      {item.label}
    </Link>
  );
}
