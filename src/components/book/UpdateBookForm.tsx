"use client";

import Button from "../Button";
import Heading from "../Heading";
import Input from "../Input";
import Label from "../Label";
import Select from "../Select";
import Submit from "../Submit";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import { deleteBook,updateBookAction } from "~/actions/book";
import { book, tag } from "@prisma/client";

interface UpdateBookFormProps {
   book: book;
   tags: tag[];
}

export default function UpdateBookForm({ book, tags }: UpdateBookFormProps) {
   const formRef = useRef<HTMLFormElement>(null);
   const [imageFile, setImageFile] = useState<File | null>(null);
   const [pdfFile, setPdfFile] = useState<File | null>(null);
   const [isPending, startTransition] = useTransition();
   const router = useRouter();

   function handleFileChange(
       event: ChangeEvent<HTMLInputElement>,
       setFile: React.Dispatch<React.SetStateAction<File | null>>,
   ) {
       setFile(event.target.files?.[0] || null);
   }

   async function handleSubmit(formData: FormData) {
    try {
        // สร้าง FormData ใหม่
        const data = new FormData();
        data.append('bookId', formData.get('bookId') as string);
        data.append('title', formData.get('title') as string);
        data.append('tagId', formData.get('tagId') as string);
        
        if (imageFile) {
            data.append('imageFile', imageFile);
        }
        if (pdfFile) {
            data.append('pdfFile', pdfFile);
        }

        const result = await updateBookAction(data); // แก้จาก updateBookAction(null, data)
        
        if (result?.success === false) {
            toast.error(result.message);
        } else {
            toast.success('แก้ไขหนังสือสำเร็จ');
            formRef.current?.reset();
            setImageFile(null);
            setPdfFile(null);
        }
    } catch (error) {
        toast.error('เกิดข้อผิดพลาดในการแก้ไขหนังสือ');
    }
}

async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    
    startTransition(() => {
        deleteBook(book.id)
            .then((result) => {
                if (result.success) {
                    toast.success('ลบหนังสือสำเร็จ');
                    router.push('/manager/books');
                } else {
                    toast.error(result.message || 'เกิดข้อผิดพลาดในการลบหนังสือ');
                }
            })
            .catch(() => {
                toast.error('เกิดข้อผิดพลาดในการลบหนังสือ');
            });
    });
}

   return (
    <form ref={formRef} onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit(new FormData(e.currentTarget));
    }} className="space-y-4">
           <Heading>แก้ไขหนังสือ</Heading>

           {/* bookId */}
           <Input type="hidden" name="bookId" defaultValue={book.id} />

           <div className="space-y-2">
               <Label htmlFor="title">ชื่อ</Label>
               <Input
                   type="text"
                   id="title"
                   name="title"
                   required
                   defaultValue={book.title}
               />
           </div>

           <div className="space-y-2">
               <Label htmlFor="imageFile">ไฟล์รูปภาพ</Label>
               <Input
                   type="file"
                   id="imageFile"
                   accept="image/*"
                   onChange={(e) => handleFileChange(e, setImageFile)}
               />
           </div>

           <div className="space-y-2">
               <Label htmlFor="pdfFile">ไฟล์พีดีเอฟ</Label>
               <Input
                   type="file"
                   id="pdfFile"
                   accept="application/pdf"
                   onChange={(e) => handleFileChange(e, setPdfFile)}
               />
           </div>

           <div className="space-y-2">
               <Label htmlFor="tagId">เลือกหมวดหมู่</Label>
               <Select id="tagId" name="tagId" defaultValue={book.tagId}>
                   {tags.map((t, i) => (
                       <option key={i} value={t.id}>
                           {t.title}
                       </option>
                   ))}
               </Select>
           </div>

           <Submit>ยืนยัน</Submit>
           <Button
               type="button"
               disabled={isPending}
               onClick={handleDelete}
               className="w-full bg-red-500"
           >
               ลบหนังสือ
           </Button>
       </form>
   );
}