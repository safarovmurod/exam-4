import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Heart, LogOut, Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import logo from "../assets/fastcardIcon.png";
import { _axios } from "../token/token";
import type { RootState } from "../store/store";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

interface SearchProduct {
  id: number;
  productName: string;
}

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "border-b-[1px] border-[#000000]" : "hover:border-b-[1px] hover:border-[#000000]";

export default function Header({ isLoggedIn = false, onLogout }: HeaderProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<SearchProduct[]>([]);
  const likes = useSelector((state: RootState) => state.like.data.length);
  const cart = useSelector((state: RootState) => state.korzina.data.reduce((sum, item) => sum + item.quantity, 0));

  useEffect(() => {
    if (!search.trim()) return;
    let active = true;

    async function getSuggestions() {
      try {
        const { data } = await _axios.get("/Product/get-products", {
          params: { PageNumber: 1, PageSize: 100 },
        });
        const products = (data.data.products || []) as SearchProduct[];
        const result = products.filter((product) => product.productName.toLowerCase().includes(search.trim().toLowerCase())).slice(0, 5);
        if (active) setSuggestions(result);
      } catch (error) {
        console.error(error);
        if (active) setSuggestions([]);
      }
    }

    getSuggestions();
    return () => { active = false; };
  }, [search]);

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  }

  return (
    <header className="relative border-b-[1px] border-[#dddddd] bg-[#ffffff]">
      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between gap-[16px] pl-[16px] pr-[16px] md:h-[64px]">
        <Sheet>
          <SheetTrigger asChild>
            <Button type="button" variant="ghost" size="icon" aria-label="Open menu" className="md:hidden"><Menu /></Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] bg-[#ffffff] p-[24px]">
            <SheetHeader><SheetTitle className="text-left">Exclusive</SheetTitle></SheetHeader>
            <nav className="mt-[32px] flex flex-col gap-[24px] text-[16px]">
              <SheetClose asChild><NavLink to="/home">Home</NavLink></SheetClose>
              <SheetClose asChild><NavLink to="/contact">Contact</NavLink></SheetClose>
              <SheetClose asChild><NavLink to="/about">About</NavLink></SheetClose>
              {!isLoggedIn && <SheetClose asChild><NavLink to="/signup">Sign Up</NavLink></SheetClose>}
            </nav>
          </SheetContent>
        </Sheet>

        <NavLink to="/home" className="mr-auto flex items-center md:mr-[0px]">
          <img src={logo} alt="fastcart" className="hidden h-[40px] w-[170px] object-contain md:block" />
          <span className="text-[24px] font-[700] md:hidden">Exclusive</span>
        </NavLink>

        <nav className="hidden items-center gap-[28px] text-[14px] md:flex">
          <NavLink to="/home" className={navClass}>Home</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>
          <NavLink to="/about" className={navClass}>About</NavLink>
          {!isLoggedIn && <NavLink to="/signup" className={navClass}>Sign Up</NavLink>}
        </nav>

        <div className="flex items-center gap-[14px]">
          <form onSubmit={submitSearch} className="relative hidden items-center rounded-[4px] bg-[#f5f5f5] lg:flex">
            <Input type="search" placeholder="What are you looking for?" value={search} onChange={(event) => setSearch(event.target.value)} className="h-[38px] w-[220px] border-[0px] bg-[#f5f5f5] text-[12px]" />
            <Button type="submit" variant="ghost" size="icon" aria-label="Search"><Search /></Button>
            {search.trim() && suggestions.length > 0 && (
              <div className="absolute top-[42px] left-0 z-20 w-full rounded-[4px] border border-[#dddddd] bg-[#ffffff] p-[8px]">
                {suggestions.map((product) => (
                  <Button key={product.id} type="button" variant="ghost" onClick={() => { navigate(`/products/${product.id}`); setSearch(""); }} className="h-auto w-full justify-start p-[8px] text-left text-[13px]">
                    {product.productName}
                  </Button>
                ))}
              </div>
            )}
          </form>

          {isLoggedIn && (
            <>
              <NavLink to="/wishlist" className="relative" aria-label="Wishlist">
                <Heart size={22} />
                {likes > 0 && <Badge className="absolute top-[-10px] right-[-10px] h-[18px] min-w-[18px] bg-[#DB4444] p-[2px] text-[10px] text-[#ffffff]">{likes}</Badge>}
              </NavLink>
              <NavLink to="/cart" className="relative" aria-label="Cart">
                <ShoppingCart size={22} />
                {cart > 0 && <Badge className="absolute top-[-10px] right-[-10px] h-[18px] min-w-[18px] bg-[#DB4444] p-[2px] text-[10px] text-[#ffffff]">{cart}</Badge>}
              </NavLink>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button type="button" variant="ghost" size="icon" aria-label="Account menu"><UserRound /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px] bg-[#27272a] text-[#ffffff]">
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild><NavLink to="/account"><UserRound />Account</NavLink></DropdownMenuItem>
                    <DropdownMenuItem asChild><NavLink to="/wishlist"><Heart />Wishlist</NavLink></DropdownMenuItem>
                    <DropdownMenuItem asChild className="md:hidden"><NavLink to="/cart"><ShoppingCart />Cart</NavLink></DropdownMenuItem>
                    <DropdownMenuItem onSelect={onLogout}><LogOut />Logout</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
