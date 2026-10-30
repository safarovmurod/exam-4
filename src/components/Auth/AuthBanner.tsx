import logo from "../../assets/fastcardIcon.png";

export default function AuthBanner() {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#111827] p-[40px] text-center md:w-[50%] md:p-[60px]">
      <p className="mb-[24px] text-[18px] font-[500] text-[#94a3b8] md:text-[20px]">
        Welcome to admin panel
      </p>
      <div className="flex items-center gap-[14px]">
        <img src={logo} alt="fastcart" className="h-[48px] object-contain" />
        <span className="text-[36px] font-[700] text-[#ffffff]">fastcart</span>
      </div>
    </div>
  );
}

