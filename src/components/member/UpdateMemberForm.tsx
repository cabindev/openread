"use client";

import Input from "../Input";
import Label from "../Label";
import Heading from "../Heading";
import Submit from "../Submit";
import Select from "../Select";
import { useState } from "react";
import toast from "react-hot-toast";
import { member, role } from "@prisma/client";
import { updateMemberAction } from "~/actions";
import { parseRoleToText } from "~/utils";
import { useRouter } from "next/navigation";

interface UpdateMemberFormProps {
    member: member;
}

export default function UpdateMemberForm({ member }: UpdateMemberFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(formData: FormData) {
        try {
            setIsSubmitting(true);
            const result = await updateMemberAction(null, formData);
            
            if (result?.success === false) {
                toast.error(result.message);
            } else {
                toast.success('แก้ไขสมาชิกสำเร็จ');
                router.push('/manager/members');
                router.refresh();
            }
        } catch (error) {
            toast.error('แก้ไขสมาชิกไม่สำเร็จ');
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
            className="space-y-4"
        >
            <Heading>แก้ไขสมาชิก</Heading>

            <Input type="hidden" name="memberId" defaultValue={member.id} />

            <div className="space-y-2">
                <Label htmlFor="name">ชื่อ</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="ระบุชื่อ"
                    defaultValue={member.name}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="example@email.com"
                    defaultValue={member.email}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="role">เลือกบทบาท</Label>
                <Select id="role" name="role" defaultValue={member.role}>
                    {Object.values(role).map((r, i) => (
                        <option key={i} value={r}>
                            {parseRoleToText(r)}
                        </option>
                    ))}
                </Select>
            </div>

            <Submit 
                isLoading={isSubmitting}
                loadingText="กำลังแก้ไข..."
                className="bg-amber-500 hover:bg-amber-600 text-white"
            >
                บันทึก
            </Submit>
        </form>
    );
}