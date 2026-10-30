import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { _axios, saveToken } from "@/token/token"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const schema = z.object({
   userName: z.string().trim().min(1, "Enter your username"),
   password: z.string().min(1, "Enter your password"),
})
type LoginData = z.infer<typeof schema>

export default function Login() {
   const navigate = useNavigate()
   const [showPassword, setShowPassword] = useState(false)
   const [error, setError] = useState("")
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginData>({
      resolver: zodResolver(schema),
   })

   async function loginUser(user: LoginData) {
      try {
         setError("")
         const { data } = await _axios.post("Account/login", user)
         if (typeof data.data !== "string" || !data.data.trim()) throw new Error("Token missing")
         saveToken(data.data)
         navigate("/home")
      } catch (error: any) {
         setError(error?.response?.data?.errors?.[0] || error?.message || "error")
      }
   }

   return (
      <form onSubmit={handleSubmit(loginUser)} className="flex flex-col gap-[16px]">
         <div>
            <div className="relative">
               <label htmlFor="login-name" className="absolute top-[-8px] left-[10px] bg-[#ffffff] pl-[4px] pr-[4px] text-[12px] text-[#737373]">UserName</label>
               <Input {...register("userName")} id="login-name" autoComplete="username" className="h-[56px] rounded-[4px] border-[#bfbfbf] text-[14px]" />
            </div>
            {errors.userName && <p role="alert" className="mt-[4px] text-[12px] text-[#DB4444]">{errors.userName.message}</p>}
         </div>
         <div>
            <div className="relative">
               <label htmlFor="login-password" className="absolute top-[-8px] left-[10px] bg-[#ffffff] pl-[4px] pr-[4px] text-[12px] text-[#737373]">Password</label>
               <Input {...register("password")} id="login-password" autoComplete="current-password" type={showPassword ? "text" : "password"} className="h-[56px] rounded-[4px] border-[#bfbfbf] pr-[44px] text-[14px]" />
               <Button type="button" variant="ghost" size="icon" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute top-[10px] right-[6px] text-[#737373]">{showPassword ? <EyeOff /> : <Eye />}</Button>
            </div>
            {errors.password && <p role="alert" className="mt-[4px] text-[12px] text-[#DB4444]">{errors.password.message}</p>}
         </div>
         <Button type="button" variant="link" disabled className="mt-[16px] mb-[8px] text-[14px] text-[#DB4444]">Forgot Password?</Button>
         {error && <p role="alert" className="text-[12px] text-[#DB4444]">{error}</p>}
         <Button type="submit" className="mt-[16px] h-[56px] w-full rounded-[4px] bg-[#DB4444] text-[16px] text-[#ffffff]">Log In</Button>
      </form>
   )
}
