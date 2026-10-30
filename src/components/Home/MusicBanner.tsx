import { useNavigate } from "react-router-dom";
import "@google/model-viewer";
import Timer from "../Timer";

export default function MusicBanner() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto w-full max-w-[1200px] bg-[#000000] p-[16px] pt-[40px] pb-[40px] md:flex md:items-center md:justify-between md:p-[56px]">
      <div className="md:w-[45%]">
        <p className="text-[16px] font-[700] text-[#00ff66]">Categories</p>
        <h2 className="mt-[32px] mb-[32px] text-[28px] font-[700] text-[#ffffff] md:text-[36px] lg:text-[48px]">Enhance Your<br />Music Experience</h2>
        <Timer circles />
        <button type="button" onClick={() => navigate("/products")} className="mt-[40px] cursor-pointer rounded-[4px] bg-[#00ff66] p-[16px] pl-[48px] pr-[48px] text-[16px] text-[#000000]">Buy Now!</button>
      </div>
      <div className="relative mt-[40px] w-full max-w-[560px] md:mt-[0px] md:w-[55%]">
        <div className="absolute top-0 left-0 h-[500px] w-full max-w-[504px] rounded-[50%] bg-[#D9D9D9] opacity-30 blur-[200px]"></div>
        <model-viewer
          src="/models/jbl-boombox.glb"
          alt="Speaker"
          camera-controls
          auto-rotate
          shadow-intensity="1"
          exposure="1.1"
          className="relative h-[320px] w-full md:h-[440px]"
        ></model-viewer>
      </div>
    </section>
  );
}
