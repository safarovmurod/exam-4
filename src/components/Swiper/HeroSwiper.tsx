import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import appleIcon from "../../assets/1200px-Apple_gray_logo 1.png";
import iphoneImage from "../../assets/iphone.png";
import iphoneSilver from "../../assets/iphone-silver.png";
import iphoneBlue from "../../assets/iphone-blue.png";
import iphoneGold from "../../assets/iphone-gold.png";
import iphoneRed from "../../assets/iphone-red.png";

interface HeroSlide {
  name: string;
  image: string;
  discount: string;
  model?: string;
}

const slides: HeroSlide[] = [
  { name: "iPhone 14 Series", image: iphoneImage, discount: "10%", model: "/models/iphone-14-pro.glb" },
  { name: "iPhone Silver", image: iphoneSilver, discount: "15%", model: "/models/iphone-2.glb" },
  { name: "iPhone Blue", image: iphoneBlue, discount: "20%", model: "/models/iphone-15-pro-blue.glb" },
  { name: "iPhone Gold", image: iphoneGold, discount: "25%", model: "/models/iphone-4.glb" },
  { name: "iPhone Red", image: iphoneRed, discount: "30%", model: "/models/iphone-5.glb" },
];

export default function HeroSwiper() {
  return (
    <Swiper
      modules={[A11y, Autoplay, Pagination]}
      autoplay={{ delay: 6500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
      style={{ "--swiper-pagination-color": "#DB4444", "--swiper-pagination-bullet-inactive-color": "#ffffff" } as React.CSSProperties}
      className="w-full"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.name}>
          <div className="flex w-full flex-col bg-[#000000] px-[24px] pt-[40px] pb-[40px] text-[#ffffff] md:h-[340px] md:flex-row md:items-center md:justify-between md:overflow-hidden md:px-[0px] md:pl-[64px] md:py-[0px]">
            <div className="md:max-w-[340px]">
              <div className="flex items-center gap-[14px]">
                <img src={appleIcon} alt="Apple" className="h-[40px] w-[34px] object-contain" />
                <p className="text-[16px]">{slide.name}</p>
              </div>
              <h1 className="mt-[20px] text-[36px] font-[600] leading-[44px] md:text-[48px] md:leading-[60px]">Up to {slide.discount}<br />off Voucher</h1>
              <Link to="/products" className="mt-[22px] flex items-center gap-[8px] cursor-pointer">
                <span className="text-[16px] font-[500] underline underline-offset-[6px]">Shop Now</span>
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="mx-auto mt-[32px] h-[250px] w-full max-w-[280px] md:mx-[0px] md:mt-[0px] md:flex md:h-[340px] md:w-[490px] md:max-w-none md:shrink-0 md:items-center md:justify-end">
              {slide.model ? (
                <model-viewer src={slide.model} alt={slide.name} camera-controls auto-rotate shadow-intensity="1" exposure="1.1" className="h-full w-full"></model-viewer>
              ) : (
                <img src={slide.image} alt={slide.name} draggable={false} className="h-full w-full object-contain md:w-auto md:object-right" />
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
