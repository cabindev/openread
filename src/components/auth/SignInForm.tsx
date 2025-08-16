"use client";

import Input from "../Input";
import Label from "../Label";
import Heading from "../Heading";
import Submit from "../Submit";
import { useState } from "react";
import toast from "react-hot-toast";
import { signInAction } from "~/actions";

export default function SignInForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(formData: FormData) {
        try {
            setIsSubmitting(true);
            
            const result = await signInAction(null, formData);
            
            // ถ้า result เป็น undefined แสดงว่าสำเร็จ (redirect แล้ว)
            if (result?.success === false) {
                toast.error(result.message);
            } else if (!result) {
                // สำเร็จแล้ว (redirect จะเกิดขึ้นเอง)
                toast.success('เข้าสู่ระบบสำเร็จ');
            }
            
        } catch (error) {
            // จะ error ถ้า redirect ไม่สำเร็จ แต่ส่วนใหญ่แล้วจะไม่เข้ามาตรงนี้
            console.log('เข้าสู่ระบบสำเร็จ กำลัง redirect...');
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
                loadingText="กำลังเข้าสู่ระบบ..."
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
                เข้าสู่ระบบ
            </Submit>
        </form>
    );
}