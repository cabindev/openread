"use client";

import Button from "../Button";
import Input from "../Input";
import Label from "../Label";
import Heading from "../Heading";
import Submit from "../Submit";
import useToastNotification from "~/hooks/useToastNotification";
import { useState } from "react";
import { tag } from "@prisma/client";
import { deleteTag, updateTagAction } from "~/actions";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UpdateTagFormProps {
    tag: tag;
}

export default function UpdateTagForm({ tag }: UpdateTagFormProps) {
    const [state, formAction] = useActionState(updateTagAction, null);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useToastNotification(state as any);

    const handleDelete = async () => {
        if (!confirm(`คุณต้องการลบหมวดหมู่ "${tag.title}" หรือไม่?`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const result = await deleteTag(tag.id);
            if (result.success) {
                toast.success(result.message);
                router.push('/manager/books');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("เกิดข้อผิดพลาดในการลบหมวดหมู่");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <form action={formAction} className="space-y-4">
            <Heading>เเก้ไขเเท็ก</Heading>

            {/* tagId */}
            <Input type="hidden" name="tagId" defaultValue={tag.id} />

            <div className="space-y-2">
                <Label htmlFor="title">ชื่อ</Label>
                <Input
                    type="title"
                    id="title"
                    name="title"
                    defaultValue={tag.title}
                    required
                />
            </div>

            <Submit>ยืนยัน</Submit>
            <Button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300"
            >
                {isDeleting ? "กำลังลบ..." : "ลบเเท็ก"}
            </Button>
        </form>
    );
}
