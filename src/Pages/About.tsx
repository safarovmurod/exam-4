import { Link } from "react-router-dom";
import Story from "../components/About/Story";
import Highlights from "../components/About/Highlights";
import Team from "../components/About/Team";
import Services from "../components/Home/Services";

export default function About() {
  return (
    <>
      <div className="mx-auto w-full max-w-[1200px] p-[16px] pt-[48px] md:pt-[72px]">
        <div className="flex gap-[12px] text-[14px]"><Link to="/home" className="text-[#777777]">Home</Link><span className="text-[#777777]">/</span><span>About</span></div>
        <Story />
        <Highlights />
        <Team />
      </div>
      <Services /></>
  );
}
