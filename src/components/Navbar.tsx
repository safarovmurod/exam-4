import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, LogOut, Menu } from "lucide-react";
import { logout } from "../store/authSlice";
import type { AppDispatch, RootState } from "../store/store";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { _axios } from "../token/token";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<{ id: number; productName: string }[]>([]);
  const userProfile = useSelector((state: RootState) => state.user.profile);

  const adminName = userProfile?.firstName
    ? `${userProfile.firstName} ${userProfile.lastName || ""}`
    : "Admin";

  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const { data } = await _axios.get("/Product/get-products", {
          params: { ProductName: search.trim(), PageNumber: 1, PageSize: 5 },
        });
        const prods = (data.data?.products || []) as { id: number; productName: string }[];
        setSuggestions(prods);
      } catch (error) {
        console.error(error);
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSuggestions([]);
    }
  }

  return (
    <header className="flex h-[70px] w-full items-center justify-between border-b border-[#e2e8f0] bg-[#ffffff] px-[20px] md:px-[32px]">
      <div className="flex items-center gap-[16px]">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="md:hidden"
          aria-label="Toggle Menu"
        >
          <Menu size={22} />
        </Button>

        <form onSubmit={submitSearch} className="relative hidden w-[300px] sm:flex items-center">
          <Search size={18} className="absolute left-[12px] text-[#94a3b8]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="h-[40px] pl-[38px] rounded-[6px] border-[#e2e8f0] bg-[#f8fafc] text-[14px]"
          />
          {search.trim() && suggestions.length > 0 && (
            <div className="absolute top-[44px] left-0 z-50 w-full rounded-[6px] border border-[#e2e8f0] bg-[#ffffff] p-[6px] shadow-[0_4px_16px_#00000015]">
              {suggestions.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    navigate(`/products?search=${encodeURIComponent(p.productName)}`);
                    setSuggestions([]);
                    setSearch("");
                  }}
                  className="w-full truncate rounded-[4px] p-[8px] text-left text-[13px] text-[#0f172a] hover:bg-[#f1f5f9] cursor-pointer"
                >
                  {p.productName}
                </button>
              ))}
            </div>
          )}
        </form>
      </div>

      <div className="flex items-center gap-[20px]">
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-[38px] w-[38px] items-center justify-center rounded-[6px] text-[#64748b] hover:bg-[#f1f5f9] cursor-pointer"
        >
          <Bell size={20} />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-[10px] rounded-[6px] p-[6px] hover:bg-[#f1f5f9] cursor-pointer"
            >
              <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#10b981] text-[15px] font-[600] text-[#ffffff]">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden text-[14px] font-[500] text-[#0f172a] md:inline">
                {adminName}
              </span>
              <ChevronDown size={16} className="text-[#94a3b8]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuLabel>
              <p className="text-[14px] font-[600]">{adminName}</p>
              <p className="text-[12px] text-[#64748b]">Administrator</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-[#ef4444] cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
