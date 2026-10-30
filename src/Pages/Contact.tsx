import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Contact() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const inputClass = "h-[48px] w-full rounded-[4px] border border-[#dddddd] p-[12px] text-[14px]";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("/home", { state: { contactSuccess: true } });
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] p-[16px] pt-[48px] pb-[100px] md:pt-[72px] md:pb-[140px]">
      <div className="flex gap-[12px] text-[14px]">
        <Link to="/home" className="text-[#777777]">Home</Link>
        <span className="text-[#777777]">/</span>
        <span>Contact</span>
      </div>

      <div className="mt-[48px] flex flex-col gap-[32px] md:flex-row">
        <div className="w-full rounded-[4px] bg-[#ffffff] p-[32px] shadow-[0_4px_20px_#00000020] md:w-[340px]">
          <div className="flex items-center gap-[16px]">
            <span className="flex h-[40px] w-[40px] items-center justify-center rounded-[50%] bg-[#DB4444] text-[#ffffff]">
              <Phone size={20} />
            </span>
            <h1 className="font-[500]">Call To Us</h1>
          </div>
          <p className="mt-[24px] text-[14px]">We are available 24/7.</p>
          <p className="mt-[12px] text-[14px]">
            Phone: <a href="tel:+8801588889999">+88015-88888-9999</a>
          </p>
          <div className="mt-[32px] border-t-[1px] border-[#dddddd] pt-[32px]">
            <div className="flex items-center gap-[16px]">
              <span className="flex h-[40px] w-[40px] items-center justify-center rounded-[50%] bg-[#DB4444] text-[#ffffff]">
                <Mail size={20} />
              </span>
              <h2 className="font-[500]">Write To Us</h2>
            </div>
            <p className="mt-[24px] text-[14px]">Write to us and we will contact you.</p>
            <p className="mt-[12px] text-[14px]">
              Email: <a href="mailto:exclusive@gmail.com">exclusive@gmail.com</a>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full rounded-[4px] bg-[#ffffff] p-[32px] shadow-[0_4px_20px_#00000020] md:flex-1">
          <div className="flex flex-col gap-[16px] md:flex-row">
            <Input
              required
              aria-label="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Your Name"
            />
            <Input
              required
              aria-label="Your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="Your Email"
            />
            <Input
              required
              aria-label="Your phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              placeholder="Your Phone"
            />
          </div>
          <Textarea
            required
            aria-label="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            className="mt-[24px] h-[200px] w-full rounded-[4px] border border-[#dddddd] p-[12px] text-[14px]"
          />
          <div className="mt-[24px] flex justify-end">
            <Button
              type="submit"
              className="h-auto cursor-pointer rounded-[4px] bg-[#DB4444] p-[14px] pl-[32px] pr-[32px] text-[14px] text-[#ffffff] hover:bg-[#b83838]"
            >
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
