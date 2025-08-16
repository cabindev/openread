import { role } from "@prisma/client";
import { z } from "zod";

export const updateMemberSchema = z.object({
    memberId: z.string().min(1),
    name: z.string().min(1),
    email: z.string().email().min(1),
    role: z.nativeEnum(role),
});
