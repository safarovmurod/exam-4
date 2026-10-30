import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[600px] flex-col items-center justify-center p-[16px] text-center">
      <h1 className="text-[48px] font-[500] md:text-[110px]">404 Not Found</h1>
      <p className="mt-[24px] text-[16px]">Your visited page not found. You may go home page.</p>
      <Button asChild className="mt-[64px] h-auto bg-[#DB4444] p-[16px] pl-[48px] pr-[48px] text-[#ffffff] hover:bg-[#c63c3c]">
        <Link to="/home">Back to home page</Link>
      </Button>
    </div>
  );
}
