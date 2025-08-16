"use server";

import { redirect } from "next/navigation";
import { getSession } from "~/libs";
import prisma from "~/prisma";
import { createTagSchema, updateTagSchema } from "~/schemas";

export async function createTagAction(_: any, formData: FormData) {
    const session = await getSession();
    if (!session.isManager) {
        return {
            success: false,
            message: "ไม่ได้รับอนุญาต",
        };
    }

    let isSuccess: boolean = false;

    try {
        const formRaw = Object.fromEntries(formData);
        const validated = createTagSchema.parse(formRaw);

        await prisma.tag.create({ data: validated });

        isSuccess = true;
    } catch (error) {
        return {
            success: false,
            message: "เพิ่มเเท็กไม่สำเร็จ",
        };
    }

    if (isSuccess) redirect("/manager/books/");
}

export async function updateTagAction(_: any, formData: FormData) {
    const session = await getSession();
    if (!session.isManager) {
        return {
            success: false,
            message: "ไม่ได้รับอนุญาต",
        };
    }

    let isSuccess: boolean = false;

    try {
        const formRaw = Object.fromEntries(formData);
        const validated = updateTagSchema.parse(formRaw);

        const { tagId, ...restData } = validated;

        await prisma.tag.update({
            where: { id: tagId },
            data: restData,
        });

        isSuccess = true;
    } catch (error) {
        return {
            success: false,
            message: "เเก้ไขเเท็กไม่สำเร็จ",
        };
    }

    if (isSuccess) redirect("/manager/books/");
}

export async function deleteTag({ id }: { id: string }) {
    const session = await getSession();
    if (!session.isManager) return;

    try {
        await prisma.tag.delete({ where: { id } });
    } catch (error) {
        return;
    }

    redirect("/manager/books");
}
