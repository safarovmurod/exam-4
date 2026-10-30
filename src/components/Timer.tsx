import { useEffect, useState } from "react";

export default function Timer({ circles = false }: { circles?: boolean }) {
  const [seconds, setSeconds] = useState(3 * 24 * 60 * 60 + 23 * 60 * 60 + 19 * 60 + 56);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((time) => (time > 0 ? time - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;


  if (circles) {
    return (
      <div className="flex gap-[12px]">
        <div className="flex h-[62px] w-[62px] flex-col items-center justify-center rounded-[50%] bg-[#ffffff] text-[#000000]"><p className="text-[16px] font-[700]">{String(hours).padStart(2, "0")}</p><p className="text-[10px]">Hours</p></div>
        <div className="flex h-[62px] w-[62px] flex-col items-center justify-center rounded-[50%] bg-[#ffffff] text-[#000000]"><p className="text-[16px] font-[700]">{String(days).padStart(2, "0")}</p><p className="text-[10px]">Days</p></div>
        <div className="flex h-[62px] w-[62px] flex-col items-center justify-center rounded-[50%] bg-[#ffffff] text-[#000000]"><p className="text-[16px] font-[700]">{String(minutes).padStart(2, "0")}</p><p className="text-[10px]">Minutes</p></div>
        <div className="flex h-[62px] w-[62px] flex-col items-center justify-center rounded-[50%] bg-[#ffffff] text-[#000000]"><p className="text-[16px] font-[700]">{String(remainingSeconds).padStart(2, "0")}</p><p className="text-[10px]">Seconds</p></div>
      </div>
    );
  }

  return (
          <div className="flex items-end gap-[8px] text-[#000000]">
            <div><p className="text-[12px]">Days</p><p className="text-[24px] font-[700]">{String(days).padStart(2, "0")}</p></div>
            <span className="text-[24px] text-[#DB4444]">:</span>
            <div><p className="text-[12px]">Hours</p><p className="text-[24px] font-[700]">{String(hours).padStart(2, "0")}</p></div>
            <span className="text-[24px] text-[#DB4444]">:</span>
            <div><p className="text-[12px]">Minutes</p><p className="text-[24px] font-[700]">{String(minutes).padStart(2, "0")}</p></div>
            <span className="text-[24px] text-[#DB4444]">:</span>
            <div><p className="text-[12px]">Seconds</p><p className="text-[24px] font-[700]">{String(remainingSeconds).padStart(2, "0")}</p></div>
          </div>
  );
}
