import { Children } from "react";
import type { ReactNode } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface CardsSwiperProps {
  children: ReactNode;
  width?: number;
  onSwiper?: (swiper: SwiperType) => void;
}

export default function CardsSwiper({ children, width = 270, onSwiper }: CardsSwiperProps) {
  return (
    <Swiper className="w-full" slidesPerView="auto" spaceBetween={24} onSwiper={onSwiper}>
      {Children.map(children, (child) => <SwiperSlide style={{ width }}>{child}</SwiperSlide>)}
    </Swiper>
  );
}
