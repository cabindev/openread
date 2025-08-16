import { z } from "zod";

export const createTagSchema = z.object({
    title: z.string().min(1),
});

export const updateTagSchema = z.object({
    tagId: z.string().min(1),
    title: z.string().min(1),
});
