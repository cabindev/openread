import { role } from "@prisma/client";

export function parseRoleToText(role: role): string {
    let text: string;

    switch (role) {
        case "Normal":
            text = "สมาชิก";
            break;
        case "Manager":
            text = "ผู้ควบคุม";
            break;
    }

    return text;
}
