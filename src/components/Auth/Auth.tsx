import { useLocation, useNavigate } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"

export default function Auth() {
   const { pathname } = useLocation()
   const navigate = useNavigate()
   const isLogin = pathname === "/login"

   return (
      <section className={isLogin ? "min-h-[570px] pl-[16px] pr-[16px] pt-[64px] pb-[96px] md:min-h-[1040px] md:pt-[280px]" : "min-h-[740px] pl-[16px] pr-[16px] pt-[64px] pb-[96px] md:min-h-[1040px] md:pt-[240px]"}>
         <div className="mx-auto w-full max-w-[420px]">
            <h1 className="text-[28px] font-[500] md:text-[36px]">{isLogin ? "Log in to Exclusive" : "Create an account"}</h1>
            <p className="mt-[8px] mb-[40px] text-[14px]">Enter your details below</p>
            {isLogin ? <Login /> : <Register onLogin={() => navigate("/login")} />}
            <p className="mt-[32px] flex items-center justify-center gap-[12px] text-[14px] text-[#737373]">
               {isLogin ? "Don't have an account?" : "Already have account?"}
               <button type="button" onClick={() => navigate(isLogin ? "/signup" : "/login")} className="cursor-pointer underline">{isLogin ? "Register" : "Log in"}</button>
            </p>
         </div>
      </section>
   )
}
