import { z } from "zod";

export const createBookSchema = z.object({
    title: z.string().min(1),
    imageFile: z.instanceof(File),
    pdfFile: z.instanceof(File),
    tagId: z.string().min(1),
});

export const updateBookSchema = z.object({
    bookId: z.string().min(1),
    title: z.string().min(1),
    imageFile: z.instanceof(File).optional(),
    pdfFile: z.instanceof(File).optional(),
    tagId: z.string().min(1),
});
