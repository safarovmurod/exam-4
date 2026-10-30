import { useState } from "react";
import { Input } from "../ui/input";

const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => String(currentYear + i));

export default function InteractiveCard() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  function handleCardNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  }

  function handleCvvChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCardCvv(raw);
  }

  const cleanNumber = cardNumber.replace(/\s/g, "");
  const cardType = cleanNumber.startsWith("4") ? "visa" : "mastercard";

  const blocks: string[] = [];
  for (let b = 0; b < 4; b++) {
    let block = "";
    for (let i = 0; i < 4; i++) {
      const idx = b * 4 + i;
      if (idx < cleanNumber.length) {
        if (idx >= 4 && idx <= 11) {
          block += "*";
        } else {
          block += cleanNumber[idx];
        }
      } else {
        block += "#";
      }
    }
    blocks.push(block);
  }

  const inputClass = "h-[50px] w-full rounded-[4px] border border-[#cccccc] p-[12px] text-[15px]";

  return (
    <div className="flex w-full flex-col gap-[20px]">
      <div className="flex w-full justify-center" style={{ perspective: "1000px" }}>
        <div
          className="relative h-[210px] w-full max-w-[360px] rounded-[16px] shadow-[0_16px_36px_#00000040] transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div
            className="absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-[16px] bg-[#121624] p-[20px] text-[#ffffff]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-35" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="40" x2="360" y2="180" stroke="#DB4444" strokeWidth="1.5" />
              <line x1="140" y1="0" x2="280" y2="210" stroke="#DB4444" strokeWidth="1" />
              <line x1="20" y1="200" x2="300" y2="20" stroke="#ef4444" strokeWidth="1" />
              <line x1="220" y1="210" x2="360" y2="80" stroke="#DB4444" strokeWidth="1.5" />
            </svg>

            <div className="relative z-10 flex items-center justify-between">
              <div className="relative flex h-[36px] w-[46px] items-center justify-center overflow-hidden rounded-[6px] border border-[#f5d76e] bg-gradient-to-br from-[#d4af37] via-[#f7e799] to-[#b38600] shadow-inner">
                <div className="absolute inset-0 m-[3px] rounded-[3px] border border-[#8a6500] opacity-40"></div>
                <div className="h-[1px] w-full bg-[#8a6500] opacity-50"></div>
                <div className="absolute h-full w-[1px] bg-[#8a6500] opacity-50"></div>
              </div>

              {cardType === "visa" ? (
                <span className="text-[22px] font-[700] italic tracking-[1px] text-[#ffffff]">VISA</span>
              ) : (
                <div className="flex flex-col items-end">
                  <div className="flex -space-x-2">
                    <div className="h-[26px] w-[26px] rounded-[50%] bg-[#EB001B] opacity-90"></div>
                    <div className="h-[26px] w-[26px] rounded-[50%] bg-[#F79E1B] opacity-90"></div>
                  </div>
                  <span className="mt-[2px] text-[9px] font-[700] tracking-[1px] text-[#ffffff]">mastercard</span>
                </div>
              )}
            </div>

            <div className="relative z-10 flex justify-between font-mono text-[18px] tracking-[2px] text-[#ffffff] md:text-[20px]">
              {blocks.map((block, i) => (
                <span key={i}>{block}</span>
              ))}
            </div>

            <div className="relative z-10 flex items-end justify-between text-[#ffffff]">
              <div className="flex max-w-[200px] flex-col">
                <span className="text-[10px] font-[500] tracking-[1px] text-[#ffffff80] uppercase">Card Holder</span>
                <span className="truncate text-[14px] font-[500] tracking-[1px] uppercase">
                  {cardName.trim() || "AD SOYAD"}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-[500] tracking-[1px] text-[#ffffff80] uppercase">Expires</span>
                <span className="text-[14px] font-[500] tracking-[1px]">
                  {(cardMonth || "MM") + " / " + (cardYear ? cardYear.slice(-2) : "YY")}
                </span>
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-[16px] bg-[#121624] py-[16px] text-[#ffffff]"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="w-full">
              <div className="h-[42px] w-full bg-[#000000]"></div>
              <div className="p-[16px]">
                <div className="mb-[4px] flex justify-end text-[10px] font-[500] tracking-[1px] text-[#ffffff80] uppercase">
                  <span>CVV</span>
                </div>
                <div className="flex h-[36px] w-full items-center justify-end rounded-[4px] bg-[#ffffff] p-[8px]">
                  <span className="font-mono text-[14px] font-[700] tracking-[3px] text-[#000000]">
                    {cardCvv ? cardCvv.replace(/./g, "*") : "***"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end px-[16px]">
              {cardType === "visa" ? (
                <span className="text-[20px] font-[700] italic tracking-[1px] text-[#ffffff]">VISA</span>
              ) : (
                <div className="flex -space-x-2">
                  <div className="h-[22px] w-[22px] rounded-[50%] bg-[#EB001B] opacity-90"></div>
                  <div className="h-[22px] w-[22px] rounded-[50%] bg-[#F79E1B] opacity-90"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[6px]">
        <label className="text-[14px] font-[500] text-[#000000]">Card Number</label>
        <Input
          required
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="5324 3423 4923 0492"
          maxLength={19}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-[6px]">
        <label className="text-[14px] font-[500] text-[#000000]">Card Name</label>
        <Input
          required
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="AD SOYAD"
          maxLength={26}
          className={inputClass}
        />
      </div>

      <div className="flex gap-[16px]">
        <div className="flex flex-[2] flex-col gap-[6px]">
          <label className="text-[14px] font-[500] text-[#000000]">Expiration Date</label>
          <div className="flex gap-[8px]">
            <select
              required
              value={cardMonth}
              onChange={(e) => setCardMonth(e.target.value)}
              className="h-[50px] w-full rounded-[4px] border border-[#cccccc] bg-[#ffffff] p-[10px] text-[15px] outline-none"
            >
              <option value="">Month</option>
              {months.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select
              required
              value={cardYear}
              onChange={(e) => setCardYear(e.target.value)}
              className="h-[50px] w-full rounded-[4px] border border-[#cccccc] bg-[#ffffff] p-[10px] text-[15px] outline-none"
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-[1] flex-col gap-[6px]">
          <label className="text-[14px] font-[500] text-[#000000]">CVV</label>
          <Input
            required
            value={cardCvv}
            onChange={handleCvvChange}
            onFocus={() => setIsFlipped(true)}
            onBlur={() => setIsFlipped(false)}
            placeholder="123"
            maxLength={4}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}

