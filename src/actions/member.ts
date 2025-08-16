"use server";

import prisma from "~/prisma";
import { redirect } from "next/navigation";
import { updateMemberSchema } from "~/schemas";
import { getSession } from "~/libs";

export async function updateMemberAction(_: any, formData: FormData) {
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
        const validated = updateMemberSchema.parse(formRaw);

        const { memberId, ...restData } = validated;

        await prisma.member.update({
            where: { id: memberId },
            data: { ...restData, email: restData.email.toLowerCase() },
        });

        isSuccess = true;
    } catch (error) {
        return {
            success: false,
            message: "เเก้ไขสมาชิกไม่สำเร็จ",
        };
    }

    if (isSuccess) redirect("/manager/members/");
}
