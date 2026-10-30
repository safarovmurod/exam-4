import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { registerUser } from "../../store/authSlice";
import type { AppDispatch, RootState } from "../../store/store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const registerSchema = z.object({
  userName: z.string().trim().min(1, "Номро ворид кунед"),
  email: z.string().email("Email нодуруст аст"),
  phoneNumber: z.string().trim().min(1, "Рақами телефон ворид кунед"),
  password: z.string().min(6, "Парол камаш 6 аломат бошад"),
  confirmPassword: z.string().min(1, "Паролро тасдиқ кунед"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface Props {
  onToggleToLogin: () => void;
}

export default function RegisterForm({ onToggleToLogin }: Props) {
  const [clientError, setClientError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    setClientError("");
    if (data.password !== data.confirmPassword) {
      setClientError("Паролҳо мувофиқат намекунанд");
      return;
    }

    const result = await dispatch(registerUser(data));
    if (result.meta.requestStatus === "fulfilled") {
      onToggleToLogin();
    }
  }

  return (
    <div className="w-full max-w-[420px]">
      <h1 className="text-[28px] font-[700] text-[#0f172a] md:text-[32px]">
        Create an account
      </h1>
      <p className="mt-[8px] text-[14px] text-[#64748b]">
        Enter your details below
      </p>

      {(error || clientError) && (
        <div className="mt-[16px] rounded-[6px] bg-[#fef2f2] p-[12px] text-[14px] text-[#dc2626]">
          {error || clientError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-[20px] space-y-[12px]">
        <div>
          <label className="text-[13px] font-[500] text-[#0f172a]">
            Username
          </label>
          <Input placeholder="Username" {...register("userName")} className="mt-[4px]" />
          {errors.userName && (
            <p className="mt-[2px] text-[12px] text-[#dc2626]">
              {errors.userName.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-[13px] font-[500] text-[#0f172a]">Email</label>
          <Input placeholder="name@example.com" {...register("email")} className="mt-[4px]" />
          {errors.email && (
            <p className="mt-[2px] text-[12px] text-[#dc2626]">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-[13px] font-[500] text-[#0f172a]">
            Phone Number
          </label>
          <Input placeholder="+992 90 000 0000" {...register("phoneNumber")} className="mt-[4px]" />
          {errors.phoneNumber && (
            <p className="mt-[2px] text-[12px] text-[#dc2626]">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-[13px] font-[500] text-[#0f172a]">
            Password
          </label>
          <Input type="password" placeholder="Password" {...register("password")} className="mt-[4px]" />
          {errors.password && (
            <p className="mt-[2px] text-[12px] text-[#dc2626]">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-[13px] font-[500] text-[#0f172a]">
            Confirm Password
          </label>
          <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} className="mt-[4px]" />
          {errors.confirmPassword && (
            <p className="mt-[2px] text-[12px] text-[#dc2626]">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-[8px] h-[44px] w-full bg-[#10b981] hover:bg-[#059669] text-[#ffffff]"
        >
          {isLoading ? (
            <span className="flex items-center gap-[8px]">
              <Loader2 className="animate-spin" size={16} /> Сабт...
            </span>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <p className="mt-[20px] text-center text-[14px] text-[#64748b]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onToggleToLogin}
          className="font-[600] text-[#10b981] hover:underline"
        >
          Log in
        </button>
      </p>
    </div>
  );
}

