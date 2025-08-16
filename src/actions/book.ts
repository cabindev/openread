"use server";

import { z } from "zod";
import prisma from "~/prisma";
import { redirect } from "next/navigation";
import { getSession } from "~/libs";
import { uploadFile } from "./upload-file";
import { createBookSchema, updateBookSchema } from "~/schemas";

export async function createBookAction(formData: FormData) {
    const session = await getSession();
    if (!session.isManager) {
        return { success: false, message: "ไม่ได้รับอนุญาต" };
    }

    try {
        const title = formData.get('title') as string;
        const tagId = formData.get('tagId') as string;
        const imageFile = formData.get('imageFile') as File;
        const pdfFile = formData.get('pdfFile') as File;

        if (!title?.trim() || !tagId?.trim() || !imageFile || !pdfFile) {
            return { success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" };
        }

        const existingBook = await prisma.book.findUnique({
            where: { title: title.trim() }
        });

        if (existingBook) {
            return { success: false, message: "มีหนังสือชื่อนี้ในระบบแล้ว" };
        }

        const imageUrl = await uploadFile(imageFile, "images");
        const pdfUrl = await uploadFile(pdfFile, "pdfs");

        await prisma.book.create({
            data: {
                title: title.trim(),
                imageUrl,
                pdfUrl,
                tagId,
            },
        });

        return {
            success: true,
            message: "เพิ่มหนังสือสำเร็จ",
            redirect: "/manager/books"
        };

    } catch (error) {
        console.error('Create book error:', error);
        return { success: false, message: "เพิ่มหนังสือไม่สำเร็จ" };
    }
}

export async function updateBookAction(formData: FormData) {
    const session = await getSession();
    if (!session.isManager) {
        return { success: false, message: "ไม่ได้รับอนุญาต" };
    }

    try {
        const bookId = formData.get('bookId') as string;
        const title = formData.get('title') as string;
        const tagId = formData.get('tagId') as string;
        const imageFile = formData.get('imageFile') as File | null;
        const pdfFile = formData.get('pdfFile') as File | null;

        if (!bookId || !title?.trim() || !tagId) {
            return { success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" };
        }

        const updateData: any = { 
            title: title.trim(), 
            tagId 
        };

        if (imageFile && imageFile.size > 0) {
            updateData.imageUrl = await uploadFile(imageFile, "images");
        }

        if (pdfFile && pdfFile.size > 0) {
            updateData.pdfUrl = await uploadFile(pdfFile, "pdfs");
        }

        await prisma.book.update({
            where: { id: bookId },
            data: updateData
        });

        return { 
            success: true, 
            message: "แก้ไขหนังสือสำเร็จ", 
            redirect: "/manager/books" 
        };

    } catch (error) {
        console.error('Update book error:', error);
        return { success: false, message: "แก้ไขหนังสือไม่สำเร็จ" };
    }
}

export async function deleteBook(id: string) {
    const session = await getSession();
    if (!session.isManager) {
        return { success: false, message: "ไม่ได้รับอนุญาต" };
    }

    try {
        await prisma.book.delete({ where: { id } });
        return { 
            success: true, 
            message: "ลบหนังสือสำเร็จ", 
            redirect: "/manager/books" 
        };
    } catch (error) {
        console.error('Delete book error:', error);
        return { success: false, message: "ลบหนังสือไม่สำเร็จ" };
    }
}

export async function addBookView(idInput: string | { id: string }) {
    // แปลง input เป็น string id
    const id = typeof idInput === 'string' ? idInput : idInput.id;
    
    if (!id) return;

    try {
        const book = await prisma.book.findUnique({
            where: { id }
        });

        if (!book) {
            console.error('Book not found:', id);
            return;
        }

        await prisma.book.update({
            where: { id },
            data: { 
                views: { increment: 1 } 
            }
        });
    } catch (error) {
        console.error('Add view error:', error);
    }
}

export async function updateBookRating({ id, stars }: { id: string; stars: number }) {
    try {
        await prisma.book.update({
            where: { id },
            data: { rating: stars }
        });
        return { success: true, message: "อัพเดทคะแนนสำเร็จ" };
    } catch (error) {
        console.error('Update rating error:', error);
        return { success: false, message: "อัพเดทคะแนนไม่สำเร็จ" };
    }
}