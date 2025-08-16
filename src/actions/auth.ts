"use server";

import prisma from "~/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "~/schemas";
import { getSession } from "~/libs";

export async function signInAction(_: any, formData: FormData) {
    let isSuccess: boolean = false;

    try {
        const formRaw = Object.fromEntries(formData);
        const validated = signInSchema.parse(formRaw);

        const { email, password } = validated;

        const isExist = await prisma.member.findUnique({
            where: { email: email.toLowerCase() },
        });
        if (!isExist) {
            return {
                success: false,
                message: "กรุณากรอกข้อมูลให้ถูกต้อง",
            };
        }

        const isMatch = await bcrypt.compare(password, isExist.password);
        if (!isMatch) {
            return {
                success: false,
                message: "กรุณากรอกข้อมูลให้ถูกต้อง",
            };
        }

        const session = await getSession();

        session.id = isExist.id;
        session.name = isExist.name;
        session.email = isExist.email;
        session.isManager = isExist.role == "Manager" ? true : false;
        session.isLoggedIn = true;

        await session.save();

        isSuccess = true;
    } catch (error) {
        return {
            success: false,
            message: "เข้าสู่ระบบไม่สำเร็จ",
        };
    }

    if (isSuccess) redirect("/");
}

export async function signUpAction(_: any, formData: FormData) {
    let isSuccess: boolean = false;

    try {
        const formRaw = Object.fromEntries(formData);
        const validated = signUpSchema.parse(formRaw);

        const { name, email, password } = validated;

        const isExist = await prisma.member.findUnique({
            where: { email: email.toLowerCase() },
        });
        if (isExist) {
            return {
                success: false,
                message: "อีเมลนี้ถูกใช้เเล้ว",
            };
        }

        await prisma.member.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: await bcrypt.hash(password, 10),
            },
        });

        isSuccess = true;
    } catch (error) {
        return {
            success: false,
            message: "สมัครสมาชิกไม่สำเร็จ",
        };
    }

    if (isSuccess) redirect("/auth/sign-in");
}
