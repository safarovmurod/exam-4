import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { LayoutDashboard, ClipboardList, Tag, Folder, Users } from "lucide-react";
import logo from "../assets/fastcardIcon.png";
import type { RootState } from "../store/store";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export default function Sidebar({ onCloseMobile }: SidebarProps) {
  const ordersCount = useSelector((state: RootState) => state.order.orders.length);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-[16px] py-[12px] rounded-[6px] text-[14px] font-[500] transition-colors ${
      isActive
        ? "bg-[#2563eb] text-[#ffffff]"
        : "text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#ffffff]"
    }`;

  return (
    <aside className="flex h-full w-[240px] flex-col bg-[#111827] text-[#ffffff]">
      <div className="flex h-[70px] items-center gap-[12px] px-[20px] border-b border-[#1f2937]">
        <img src={logo} alt="fastcart" className="h-[28px] object-contain" />
        <span className="text-[20px] font-[700] tracking-tight text-[#ffffff]">fastcart</span>
      </div>

      <nav className="flex flex-1 flex-col gap-[6px] p-[16px]">
        <NavLink to="/dashboard" onClick={onCloseMobile} className={linkClass}>
          <div className="flex items-center gap-[12px]">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
        </NavLink>

        <NavLink to="/orders" onClick={onCloseMobile} className={linkClass}>
          <div className="flex items-center gap-[12px]">
            <ClipboardList size={20} />
            <span>Orders</span>
          </div>
          {ordersCount > 0 && (
            <span className="rounded-full bg-[#1e293b] px-[8px] py-[2px] text-[11px] font-[600] text-[#ffffff]">
              {ordersCount}
            </span>
          )}
        </NavLink>

        <NavLink to="/products" onClick={onCloseMobile} className={linkClass}>
          <div className="flex items-center gap-[12px]">
            <Tag size={20} />
            <span>Products</span>
          </div>
        </NavLink>

        <NavLink to="/users" onClick={onCloseMobile} className={linkClass}>
          <div className="flex items-center gap-[12px]">
            <Users size={20} />
            <span>Users</span>
          </div>
        </NavLink>

        <NavLink to="/other" onClick={onCloseMobile} className={linkClass}>
          <div className="flex items-center gap-[12px]">
            <Folder size={20} />
            <span>Other</span>
          </div>
        </NavLink>
      </nav>

      <div className="p-[16px] border-t border-[#1f2937] text-[12px] text-[#64748b] text-center">
        Admin Panel v1.0
      </div>
    </aside>
  );
}

