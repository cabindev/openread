"use client";

import Input from "../Input";
import Label from "../Label";
import Submit from "../Submit";
import { useState } from "react";
import toast from "react-hot-toast";
import { signUpAction } from "~/actions";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
   const router = useRouter();
   const [isSubmitting, setIsSubmitting] = useState(false);

   async function handleSubmit(formData: FormData) {
       try {
           setIsSubmitting(true);
           
           const result = await signUpAction(null, formData);
           
           if (result?.success === false) {
               toast.error(result.message);
           } else if (result?.success === true) {
               toast.success(result.message);
               router.push('/auth/sign-in');
               router.refresh();
           }
           
       } catch (error) {
           toast.error('สมัครสมาชิกไม่สำเร็จ');
       } finally {
           setIsSubmitting(false);
       }
   }

   return (
       <form 
           onSubmit={async (e) => {
               e.preventDefault();
               await handleSubmit(new FormData(e.currentTarget));
           }} 
           className="space-y-6"
       >
           <div className="space-y-2">
               <Label htmlFor="name" className="text-gray-700 font-medium">ชื่อ</Label>
               <Input 
                   type="text" 
                   id="name" 
                   name="name"
                   placeholder="ระบุชื่อของคุณ"
                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white/80"
                   required 
               />
           </div>

           <div className="space-y-2">
               <Label htmlFor="email" className="text-gray-700 font-medium">อีเมล</Label>
               <Input 
                   type="email" 
                   id="email" 
                   name="email" 
                   placeholder="example@email.com"
                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white/80"
                   required 
               />
           </div>

           <div className="space-y-2">
               <Label htmlFor="password" className="text-gray-700 font-medium">รหัสผ่าน</Label>
               <Input 
                   type="password" 
                   id="password" 
                   name="password"
                   placeholder="••••••••"
                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white/80"
                   required 
               />
           </div>

           <Submit 
               isLoading={isSubmitting}
               loadingText="กำลังสมัครสมาชิก..."
               className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
           >
               สมัครสมาชิก
           </Submit>
       </form>
   );
}