import Link from "next/link";
import MemberRole from "./MemberRole";
import { PencilIcon } from "@heroicons/react/24/solid";
import { member } from "@prisma/client";

interface MemberRowProps {
    member: member;
}

export default function MemberRow({ member }: MemberRowProps) {
    return (
        <tr className="hover:bg-green-50/50 transition-colors">
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                {member.id.split("-")[0].toUpperCase()}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                {member.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                {member.email}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                <MemberRole role={member.role} />
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-center">
                <Link 
                    href={"/manager/members/" + member.id}
                    className="inline-flex items-center justify-center p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 transition-all duration-200"
                    title="แก้ไขสมาชิก"
                >
                    <PencilIcon className="h-4 w-4" />
                </Link>
            </td>
        </tr>
    );
}
