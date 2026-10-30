import { useState } from "react";
import AuthBanner from "../components/Auth/AuthBanner";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <AuthBanner />
      <div className="flex flex-1 items-center justify-center bg-[#ffffff] p-[24px] md:p-[60px]">
        {isLogin ? (
          <LoginForm onToggleToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onToggleToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}
