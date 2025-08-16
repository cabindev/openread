"use client";

import Button from "../Button";
import Input from "../Input";
import Label from "../Label";
import Heading from "../Heading";
import Submit from "../Submit";
import useToastNotification from "~/hooks/useToastNotification";
import { createTagAction } from "~/actions";
import { useActionState } from "react";

export default function CreateTagForm() {
    const [state, formAction] = useActionState(createTagAction, null);

    useToastNotification(state as any);

    return (
        <form action={formAction} className="space-y-4">
            <Heading>เพิ่มหมวดหมู่</Heading>

            <div className="space-y-2">
                <Label htmlFor="title">ชื่อ หมวดหมู่</Label>
                <Input type="title" id="title" name="title" required />
            </div>

            <Submit>ยืนยัน</Submit>
        </form>
    );
}
