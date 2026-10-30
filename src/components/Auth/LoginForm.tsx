import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, Loader2, X } from "lucide-react";
import { loginUser } from "../../store/authSlice";
import type { AppDispatch, RootState } from "../../store/store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { _axios, saveToken } from "../../token/token";

const loginSchema = z.object({
  userName: z.string().trim().min(1, "Username ворид кунед"),
  password: z.string().min(1, "Password ворид кунед"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function GoogleIcon() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

export default function LoginForm({ onToggleToRegister }: { onToggleToRegister: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [clientError, setClientError] = useState("");
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setClientError("");
    const result = await dispatch(loginUser(data));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  }

  async function handleSelectAdmin() {
    try {
      setIsGoogleLoading(true);
      setClientError("");

      try {
        const res = await _axios.post("/Account/login", {
          userName: "admin_exam",
          password: "Google_admin123!Aa",
        });
        if (res.data?.data) {
          saveToken(res.data.data);
          setIsGoogleModalOpen(false);
          navigate("/dashboard");
          return;
        }
      } catch {
        try {
          await _axios.post("/Account/register", {
            userName: "admin_exam",
            email: "admin@gmail.com",
            password: "Google_admin123!Aa",
            confirmPassword: "Google_admin123!Aa",
            phoneNumber: "992921234567",
          });
          const second = await _axios.post("/Account/login", {
            userName: "admin_exam",
            password: "Google_admin123!Aa",
          });
          if (second.data?.data) {
            saveToken(second.data.data);
            setIsGoogleModalOpen(false);
            navigate("/dashboard");
            return;
          }
        } catch (regErr) {
          console.error(regErr);
          setClientError("Хатогӣ ҳангоми воридшавӣ ҳамчун Admin");
        }
      }
    } catch (err) {
      console.error(err);
      setClientError("Хатогии пайвастшавӣ рух дод");
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[420px]">
      <h1 className="text-[28px] font-[700] text-[#0f172a] md:text-[32px]">Log in</h1>
      <p className="mt-[8px] text-[14px] text-[#64748b]">Enter your details below</p>

      {(error || clientError) && (
        <div className="mt-[16px] rounded-[6px] bg-[#fef2f2] p-[12px] text-[14px] text-[#dc2626]">
          {error || clientError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-[24px] space-y-[16px]">
        <div>
          <label className="text-[14px] font-[500] text-[#0f172a]">Email / Username</label>
          <Input placeholder="Username" {...register("userName")} className="mt-[6px] h-[44px]" />
          {errors.userName && <p className="mt-[4px] text-[12px] text-[#dc2626]">{errors.userName.message}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-[14px] font-[500] text-[#0f172a]">Password</label>
            <button type="button" className="text-[12px] text-[#64748b] hover:text-[#0f172a]">Forgot password?</button>
          </div>
          <div className="relative mt-[6px]">
            <Input type={showPassword ? "text" : "password"} placeholder="Password" {...register("password")} className="h-[44px] pr-[40px]" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-[12px] top-[12px] text-[#94a3b8]">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="mt-[4px] text-[12px] text-[#dc2626]">{errors.password.message}</p>}
        </div>

        <Button type="submit" disabled={isLoading} className="h-[44px] w-full bg-[#10b981] hover:bg-[#059669] text-[#ffffff]">
          {isLoading ? <span className="flex items-center gap-[8px]"><Loader2 className="animate-spin" size={16} /> Воридшавӣ...</span> : "Log in"}
        </Button>

        <div className="relative my-[16px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#e2e8f0]" /></div>
          <span className="relative bg-[#ffffff] px-[12px] text-[12px] text-[#64748b]">or</span>
        </div>

        <button
          type="button"
          disabled={isGoogleLoading}
          onClick={() => setIsGoogleModalOpen(true)}
          className="flex h-[44px] w-full items-center justify-center gap-[10px] rounded-[6px] border border-[#e2e8f0] bg-[#ffffff] text-[14px] font-[500] text-[#0f172a] hover:bg-[#f8fafc] transition cursor-pointer disabled:opacity-50"
        >
          {isGoogleLoading ? <Loader2 className="animate-spin text-[#64748b]" size={18} /> : <GoogleIcon />}
          <span>Continue with Google</span>
        </button>
      </form>

      {isGoogleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000080] p-[16px]">
          <div className="w-full max-w-[380px] rounded-[16px] bg-[#ffffff] p-[24px] shadow-[0_10px_30px_#00000025]">
            <div className="flex items-center justify-between pb-[16px] border-b border-[#e2e8f0]">
              <div className="flex items-center gap-[10px]">
                <GoogleIcon />
                <div>
                  <h3 className="text-[16px] font-[600] text-[#0f172a]">Интихоби ҳисоб</h3>
                  <p className="text-[12px] text-[#64748b]">Барои воридшавӣ бо Google</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsGoogleModalOpen(false)} className="text-[#94a3b8] hover:text-[#0f172a]">
                <X size={20} />
              </button>
            </div>

            <div className="mt-[16px]">
              <button
                type="button"
                disabled={isGoogleLoading}
                onClick={handleSelectAdmin}
                className="w-full flex items-center gap-[12px] rounded-[10px] p-[12px] hover:bg-[#f1f5f9] transition text-left cursor-pointer border border-[#e2e8f0] hover:border-[#10b981]"
              >
                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[50%] bg-[#10b981] text-[18px] font-[700] text-[#ffffff]">
                  A
                </div>
                <div className="flex-1 truncate">
                  <p className="text-[15px] font-[600] text-[#0f172a]">Admin</p>
                  <p className="text-[12px] text-[#64748b] truncate">admin@gmail.com</p>
                </div>
              </button>
            </div>

            {isGoogleLoading && (
              <div className="mt-[16px] flex items-center justify-center gap-[8px] text-[13px] text-[#0f172a]">
                <Loader2 className="animate-spin text-[#10b981]" size={16} /> Воридшавӣ ҳамчун Admin...
              </div>
            )}
          </div>
        </div>
      )}

      <p className="mt-[24px] text-center text-[14px] text-[#64748b]">
        Don't have an account?{" "}
        <button type="button" onClick={onToggleToRegister} className="font-[600] text-[#10b981] hover:underline">
          Register
        </button>
      </p>
    </div>
  );
}
