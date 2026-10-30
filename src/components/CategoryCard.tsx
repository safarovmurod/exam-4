import type { ReactNode } from "react";
import { Smartphone } from "lucide-react";

type CategoryCardProps = {
  image?: string;
  children: ReactNode;
};

export default function CategoryCard({ image, children }: CategoryCardProps) {
  return (
    <div className="group flex h-[145px] w-[170px] shrink-0 cursor-pointer flex-col items-center justify-center gap-[16px] rounded-[4px] border border-[#dddddd] bg-[#ffffff] text-[#000000] hover:bg-[#DB4444] hover:text-[#ffffff]">
      {image ? <img src={image} alt="" className="h-[56px] w-[56px] object-contain brightness-0 group-hover:invert" /> : <Smartphone size={40} />}
      <p className="text-[16px]">{children}</p>
    </div>
  );
}
