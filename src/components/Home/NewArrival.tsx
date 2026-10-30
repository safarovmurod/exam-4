import { Link } from "react-router-dom";
import "@google/model-viewer";
import playstation from "../../assets/ps5-slim-goedkope-playstation_large 1.png";
import woman from "../../assets/attractive-woman-wearing-hat-posing-black-background 1.png";
import perfume from "../../assets/652e82cd70aa6522dd785109a455904c.png";

export default function NewArrival() {
  return (
    <section className="mx-auto w-full max-w-[1200px] p-[16px] pt-[60px] pb-[60px]">
      <div className="flex items-center gap-[16px] text-[#DB4444]">
        <span className="h-[40px] w-[20px] rounded-[4px] bg-[#DB4444]"></span>
        <span className="text-[16px] font-[700]">Featured</span>
      </div>
      <h2 className="mt-[24px] mb-[32px] text-[28px] font-[700] md:text-[36px]">New Arrival</h2>
      <div className="flex flex-col gap-[24px] md:flex-row">
        <div className="relative flex h-[250px] w-full items-end justify-center overflow-hidden rounded-[4px] bg-[#000000] md:h-[600px] md:w-[50%]">
          <img src={playstation} alt="PlayStation 5" className="h-[100%] w-[100%] object-contain" />
          <div className="absolute bottom-0 left-0 p-[24px] text-[#ffffff]">
            <h3 className="text-[24px] font-[700]">PlayStation 5</h3>
            <p className="mt-[8px] text-[14px]">Black and White version of the PS5<br />coming out on sale.</p>
            <Link to="/products" className="mt-[16px] inline-block cursor-pointer text-[16px] underline">Shop Now</Link>
          </div>
        </div>
        <div className="flex w-full flex-col gap-[24px] md:w-[50%]">
          <div className="relative h-[250px] overflow-hidden rounded-[4px] bg-[#0d0d0d] md:h-[284px]">
            <img src={woman} alt="Women's Collections" className="absolute right-0 bottom-0 h-[100%] object-contain" />
            <div className="absolute bottom-0 left-0 p-[24px] text-[#ffffff]">
              <h3 className="text-[24px] font-[700]">Women’s Collections</h3>
              <p className="mt-[8px] text-[14px]">Featured woman collections that<br />give you another vibe.</p>
              <Link to="/products" className="mt-[16px] inline-block cursor-pointer text-[16px] underline">Shop Now</Link>
            </div>
          </div>
          <div className="flex flex-col gap-[24px] md:flex-row">
            <div className="relative flex h-[250px] w-full items-center justify-center overflow-hidden rounded-[4px] bg-[#1c1c1c] md:h-[292px] md:w-[50%]">
              <model-viewer src="/models/jbl-boombox.glb" alt="Speaker" camera-controls auto-rotate shadow-intensity="1" exposure="1.1" className="h-[200px] w-full md:h-[240px]"></model-viewer>
              <div className="absolute bottom-0 left-0 p-[24px] text-[#ffffff]">
                <h3 className="text-[24px] font-[700]">Speakers</h3>
                <p className="mt-[8px] text-[14px]">Amazon wireless speakers</p>
                <Link to="/products" className="mt-[16px] inline-block cursor-pointer text-[16px] underline">Shop Now</Link>
              </div>
            </div>
            <div className="relative flex h-[250px] w-full items-center justify-center overflow-hidden rounded-[4px] bg-[#1c1c1c] md:h-[292px] md:w-[50%]">
              <img src={perfume} alt="Perfume" className="h-[200px] w-[200px] object-contain" />
              <div className="absolute bottom-0 left-0 p-[24px] text-[#ffffff]">
                <h3 className="text-[24px] font-[700]">Perfume</h3>
                <p className="mt-[8px] text-[14px]">GUCCI INTENSE OUD EDP</p>
                <Link to="/products" className="mt-[16px] inline-block cursor-pointer text-[16px] underline">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
