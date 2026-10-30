import { useState } from "react"
import { LogIn } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { _axios } from "@/token/token"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const schema = z.object({
   userName: z.string().trim().min(1, "Enter your name"),
   email: z.email("Enter a valid email"),
   phoneNumber: z.string().trim().min(1, "Enter your phone number"),
   password: z.string().min(1, "Enter your password"),
   confirmPassword: z.string().min(1, "Confirm your password"),
})
type RegisterData = z.infer<typeof schema>

export default function Register({ onLogin }: { onLogin: () => void }) {
   const [error, setError] = useState("")
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<RegisterData>({
      resolver: zodResolver(schema),
   })

   async function registerUser(user: RegisterData) {
      if (user.password !== user.confirmPassword) {
         setError("Passwords do not match")
      } else {
         try {
            setError("")
            await _axios.post("Account/register", user)
            onLogin()
         } catch (error: any) {
            setError(error?.response?.data?.errors?.[0] || error?.message || "error")
         }
      }
   }

   return (
      <form onSubmit={handleSubmit(registerUser)} className="flex flex-col gap-[16px]">
         <div>
            <Input {...register("userName")} placeholder="Name" autoComplete="username" className="h-[56px] rounded-[4px] border-[#bfbfbf] text-[14px]" />
            {errors.userName && <p role="alert" className="mt-[4px] text-[12px] text-[#DB4444]">{errors.userName.message}</p>}
         </div>
         <div>
            <Input {...register("email")} placeholder="Email" autoComplete="email" className="h-[56px] rounded-[4px] border-[#bfbfbf] text-[14px]" />
            {errors.email && <p role="alert" className="mt-[4px] text-[12px] text-[#DB4444]">{errors.email.message}</p>}
         </div>
         <div>
            <Input {...register("phoneNumber")} placeholder="Phone number" autoComplete="tel" className="h-[56px] rounded-[4px] border-[#bfbfbf] text-[14px]" />
            {errors.phoneNumber && <p role="alert" className="mt-[4px] text-[12px] text-[#DB4444]">{errors.phoneNumber.message}</p>}
         </div>
         <div>
            <Input {...register("password")} type="password" placeholder="Password" className="h-[56px] rounded-[4px] border-[#bfbfbf] text-[14px]" />
            {errors.password && <p role="alert" className="mt-[4px] text-[12px] text-[#DB4444]">{errors.password.message}</p>}
         </div>
         <div>
            <Input {...register("confirmPassword")} type="password" placeholder="Confirm password" className="h-[56px] rounded-[4px] border-[#bfbfbf] text-[14px]" />
            {errors.confirmPassword && <p role="alert" className="mt-[4px] text-[12px] text-[#DB4444]">{errors.confirmPassword.message}</p>}
         </div>
         {error && <p role="alert" className="text-[12px] text-[#DB4444]">{error}</p>}
         <Button
            type="submit"
            className="mt-[16px] h-[56px] w-full cursor-pointer rounded-[4px] bg-[#DB4444] text-[16px] text-[#ffffff]"
         >
            Create Account
         </Button>
         <Button
            type="button"
            disabled
            className="flex h-[56px] w-full items-center justify-center gap-[16px] rounded-[4px] border border-[#bfbfbf] text-[14px] opacity-50"
         >
            <LogIn size={24} />
            Sign up with Google
         </Button>
      </form>
   )
}
