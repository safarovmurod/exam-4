import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import tom from "../../assets/about-tom-transparent.png";
import emma from "../../assets/about-emma-transparent.png";
import will from "../../assets/about-will-transparent.png";
import teamImages from "../../assets/about-team-transparent.png";

const team = [
  { name: "Tom Cruise", role: "Founder & Chairman", image: tom },
  { name: "Emma Watson", role: "Managing Director", image: emma },
  { name: "Will Smith", role: "Product Designer", image: will },
  { name: "Mia Chen", role: "Marketing Manager", image: teamImages, position: "0% 0%" },
  { name: "Daniel Moore", role: "Sales Manager", image: teamImages, position: "33.333% 0%" },
  { name: "Amara Lewis", role: "Creative Director", image: teamImages, position: "66.667% 0%" },
  { name: "David Brown", role: "Operations Manager", image: teamImages, position: "100% 0%" },
  { name: "Alex Rivera", role: "Product Manager", image: teamImages, position: "0% 50%" },
  { name: "Sophie Martin", role: "Customer Support", image: teamImages, position: "33.333% 50%" },
  { name: "Arjun Patel", role: "Developer", image: teamImages, position: "66.667% 50%" },
  { name: "Lily Park", role: "Designer", image: teamImages, position: "100% 50%" },
  { name: "James Wilson", role: "Team Lead", image: teamImages, position: "0% 100%" },
  { name: "Nia Johnson", role: "Brand Manager", image: teamImages, position: "33.333% 100%" },
  { name: "Olivia Taylor", role: "Content Manager", image: teamImages, position: "66.667% 100%" },
  { name: "Ethan Kim", role: "Analyst", image: teamImages, position: "100% 100%" },
];

export default function TeamSwiper() {
  return (
    <Swiper modules={[A11y, Pagination]} pagination={{ clickable: true }} style={{ paddingBottom: "40px", "--swiper-pagination-color": "#DB4444" } as React.CSSProperties}>
      {[0, 1, 2, 3, 4].map((index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col gap-[24px] md:flex-row">
            {team.slice(index * 3, index * 3 + 3).map((person) => (
              <div key={person.name} className="w-full max-w-[370px] md:w-[0px] md:flex-1">
                {person.position ? <div role="img" aria-label={person.name} className="h-[430px] w-full rounded-[4px] bg-[#F5F5F5]" style={{ backgroundImage: `url(${person.image})`, backgroundSize: "400% 300%", backgroundPosition: person.position }} /> : <img src={person.image} alt={person.name} className="h-[430px] w-full rounded-[4px] bg-[#F5F5F5] object-contain" />}
                <h2 className="mt-[20px] text-[28px] font-[500]">{person.name}</h2>
                <p className="mt-[4px] text-[14px]">{person.role}</p>
                <div className="mt-[16px] flex gap-[24px] text-[#000000]">
                  <FaFacebookF size={20} />
                  <FaTwitter size={20} />
                  <FaInstagram size={20} />
                </div>
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
