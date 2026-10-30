import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Camera, Globe2, MessageCircle, Send, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function Footer() {
  const navigate = useNavigate();
  const [subEmail, setSubEmail] = useState("");

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (subEmail.trim()) {
      setSubEmail("");
      navigate("/home", { state: { contactSuccess: true } });
    }
  }

  return (
    <footer className="bg-[#000000] text-[#ffffff]">
      <div className="mx-auto max-w-[1200px] pl-[32px] pr-[32px] pt-[40px] pb-[40px] md:pl-[16px] md:pr-[16px] md:pt-[64px] md:pb-[64px]">
        <div className="flex flex-wrap justify-between gap-[32px]">
          <div className="w-full md:w-auto">
            <h2 className="mb-[16px] text-[24px] font-[700]">Exclusive</h2>

            <h3 className="mb-[16px] text-[20px]">Subscribe</h3>

            <p className="mb-[12px] text-[14px]">
              Get 10% off your first order
            </p>

            <form onSubmit={handleSubscribe} className="flex w-full max-w-[320px] items-center rounded-[4px] border border-[#ffffff] pl-[12px] pr-[4px] md:max-w-[220px]">
              <Input
                required
                type="email"
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Subscribe email"
                className="h-[44px] w-full min-w-[0px] border-[0px] bg-[#ffffff00] pl-[0px] pr-[0px] text-[12px] text-[#ffffff] placeholder:text-[#a3a3a3]"
              />
              <Button type="submit" variant="ghost" size="icon" aria-label="Subscribe" className="text-[#ffffff] cursor-pointer hover:bg-[#ffffff20]">
                <Send size={20} />
              </Button>
            </form>
          </div>
          <div className="w-full md:w-auto">
            <h3 className="mb-[20px] text-[20px] font-[500]">Support</h3>
            <div className="flex flex-col gap-[16px] text-[14px]">
              <p>
                111 Bijoy sarani, Dhaka,
                <br />
                DH 1515, Bangladesh.
              </p>
              <a href="mailto:exclusive@gmail.com">
                exclusive@gmail.com
              </a>
              <a href="tel:+8801588889999">
                +88015-88888-9999
              </a>
            </div>
          </div>
          <div className="flex w-full gap-[48px] md:w-auto md:gap-[64px]">
            <div>
              <h3 className="mb-[20px] text-[20px] font-[500]">Account</h3>
              <div className="flex flex-col gap-[16px] text-[14px]">
                <Link to="/account">My Account</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/wishlist">Wishlist</Link>
                <Link to="/products">Shop</Link>
              </div>
            </div>
            <div>
              <h3 className="mb-[20px] text-[20px] font-[500]">Quick Link</h3>
              <div className="flex flex-col gap-[16px] text-[14px]">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms Of Use</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/contact">Contact</Link>
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <h3 className="mb-[20px] text-[20px] font-[500]">Social</h3>
            <div className="flex items-center gap-[16px]">
              <Globe2 size={18} aria-label="Website" />
              <MessageCircle size={18} aria-label="Messages" />
              <Camera size={18} aria-label="Photos" />
              <Users size={18} aria-label="Community" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[#18181b] pl-[16px] pr-[16px] pt-[16px] pb-[16px] text-center text-[12px] text-[#737373]">
        © Copyright Rimel 2022. All right reserved.
      </div>
    </footer>
  );
}
export default Footer;
