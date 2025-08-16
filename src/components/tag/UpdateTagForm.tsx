"use client";

import Button from "../Button";
import Input from "../Input";
import Label from "../Label";
import Heading from "../Heading";
import Submit from "../Submit";
import useToastNotification from "~/hooks/useToastNotification";
import { useTransition } from "react";
import { tag } from "@prisma/client";
import { deleteTag, updateTagAction } from "~/actions";
import { useActionState } from "react";

interface UpdateTagFormProps {
    tag: tag;
}

export default function UpdateTagForm({ tag }: UpdateTagFormProps) {
    const [state, formAction] = useActionState(updateTagAction, null);
    const [isDeletePending, startTransition] = useTransition();

    useToastNotification(state as any);

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
                disabled={isDeletePending}
                onClick={() => startTransition(() => deleteTag({ id: tag.id }))}
                className="w-full bg-red-500"
            >
                ลบเเท็ก
            </Button>
        </form>
    );
}
