import { role } from "@prisma/client";
import { cn } from "~/libs";

interface MemberRoleProps {
    role: role;
}

export default function MemberRole({ role }: MemberRoleProps) {
    const roleObj = {
        Normal: {
            bgColor: "bg-emerald-100",
            textColor: "text-emerald-700",
            label: "สมาชิก",
        },
        Manager: {
            bgColor: "bg-green-100",
            textColor: "text-green-700",
            label: "ผู้ควบคุม",
        },
    };

    const { bgColor, textColor, label } = roleObj[role];

    return (
        <span
            className={cn(
                "rounded-full px-3 py-1 font-medium",
                bgColor,
                textColor,
            )}
        >
            {label}
        </span>
    );
}
