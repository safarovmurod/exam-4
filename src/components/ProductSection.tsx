import type { ReactNode } from "react";

type ProductSectionProps = {
  label: string;
  title: string;
  timer?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export default function ProductSection({ label, title, timer, action, children, footer }: ProductSectionProps) {
  return (
    <section className="mx-auto w-full max-w-[1200px] p-[16px] pt-[60px] pb-[60px]">
      <div className="flex items-center gap-[16px] text-[#DB4444]">
        <span className="h-[40px] w-[20px] rounded-[4px] bg-[#DB4444]"></span>
        <span className="text-[16px] font-[700]">{label}</span>
      </div>
      <div className="mt-[24px] flex flex-wrap items-end justify-between gap-[24px]">
        <div className="flex flex-wrap items-end gap-[32px]">
          <h2 className="text-[36px] font-[700]">{title}</h2>
          {timer}
        </div>
        {action}
      </div>
      <div className="mt-[32px] w-full">{children}</div>
      {footer}
    </section>
  );
}

