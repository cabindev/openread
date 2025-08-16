"use client";

import Input from "../Input";
import Label from "../Label";
import Submit from "../Submit";
import toast from "react-hot-toast";
import { tag } from "@prisma/client";
import { createBookAction } from "~/actions";
import { useRef, ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface CreateBookFormProps {
   tags: tag[];
}

export default function CreateBookForm({ tags }: CreateBookFormProps) {
   const router = useRouter();
   const formRef = useRef<HTMLFormElement>(null);
   const [imageFile, setImageFile] = useState<File | null>(null);
   const [pdfFile, setPdfFile] = useState<File | null>(null);

   // จัดการการเปลี่ยนแปลงของไฟล์
   function handleFileChange(
       event: ChangeEvent<HTMLInputElement>,
       setFile: React.Dispatch<React.SetStateAction<File | null>>,
   ) {
       setFile(event.target.files?.[0] || null);
   }

   // จัดการการ submit form
   async function handleSubmit(formData: FormData) {
       try {
           // สร้าง FormData ใหม่และเพิ่มข้อมูล
           const data = new FormData();
           data.append('title', formData.get('title') as string);
           data.append('tagId', formData.get('tagId') as string);
           
           // เพิ่มไฟล์ถ้ามี
           if (imageFile) {
               data.append('imageFile', imageFile);
           }
           if (pdfFile) {
               data.append('pdfFile', pdfFile);
           }

           // เรียกใช้ server action
           const result = await createBookAction(data);
           
           // จัดการผลลัพธ์
           if (result?.success === false) {
               toast.error(result.message);
           } else if (result?.success === true) {
               toast.success(result.message || 'เพิ่มหนังสือสำเร็จ');
               formRef.current?.reset();
               setImageFile(null);
               setPdfFile(null);
               
               // Redirect หากมี redirect path
               if (result.redirect) {
                   router.push(result.redirect);
               }
           }
       } catch (error) {
           toast.error('เกิดข้อผิดพลาดในการเพิ่มหนังสือ');
       }
   }

   return (
       <form 
           ref={formRef} 
           action={async (formData) => {
               await handleSubmit(formData);
           }}
           className="space-y-6"
       >
           {/* ส่วนกรอกชื่อหนังสือ */}
           <div className="space-y-2">
               <Label htmlFor="title" className="text-gray-700 font-medium">ชื่อหนังสือ</Label>
               <Input
                   type="text"
                   id="title"
                   name="title"
                   placeholder="กรอกชื่อหนังสือ"
                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white/80"
                   required
               />
           </div>

           {/* ส่วนเลือกหมวดหมู่ */}
           <div className="space-y-2">
               <Label htmlFor="tagId" className="text-gray-700 font-medium">หมวดหมู่</Label>
               <select 
                   id="tagId" 
                   name="tagId" 
                   defaultValue="" 
                   required
                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white/80"
               >
                   <option value="" disabled>
                       เลือกหมวดหมู่
                   </option>
                   {tags.map((t) => (
                       <option key={t.id} value={t.id}>
                           {t.title}
                       </option>
                   ))}
               </select>
           </div>

           {/* ส่วนอัพโหลดรูปภาพ */}
           <div className="space-y-2">
               <Label htmlFor="imageFile" className="text-gray-700 font-medium">รูปปกหนังสือ</Label>
               <div className="relative">
                   <Input
                       type="file"
                       id="imageFile"
                       name="imageFile"
                       accept="image/*"
                       required
                       onChange={(e) => handleFileChange(e, setImageFile)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                   />
               </div>
               {imageFile && (
                   <div className="text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                       ✓ เลือกไฟล์: {imageFile.name}
                   </div>
               )}
               <p className="text-sm text-gray-500">
                   รองรับไฟล์: JPG, PNG, GIF (ไม่เกิน 5MB)
               </p>
           </div>

           {/* ส่วนอัพโหลด PDF */}
           <div className="space-y-2">
               <Label htmlFor="pdfFile" className="text-gray-700 font-medium">ไฟล์หนังสือ PDF</Label>
               <div className="relative">
                   <Input
                       type="file"
                       id="pdfFile"
                       name="pdfFile"
                       accept="application/pdf"
                       required
                       onChange={(e) => handleFileChange(e, setPdfFile)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                   />
               </div>
               {pdfFile && (
                   <div className="text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                       ✓ เลือกไฟล์: {pdfFile.name}
                   </div>
               )}
               <p className="text-sm text-gray-500">
                   รองรับไฟล์: PDF (ไม่เกิน 15MB)
               </p>
           </div>

           {/* ปุ่มยืนยัน */}
           <Submit className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
               เพิ่มหนังสือ
           </Submit>
       </form>
   );
}