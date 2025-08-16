import MemberRow from "./MemberRow";
import { member } from "@prisma/client";

interface MemberTableProps {
    members: member[];
}

export default function MemberTable({ members }: MemberTableProps) {
    if (members.length <= 0) {
        return (
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-green-100 p-8 text-center">
                <p className="text-gray-500">ไม่พบสมาชิก</p>
            </div>
        );
    }

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-green-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gradient-to-r from-green-100 to-emerald-100">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-4 text-left text-sm font-semibold text-green-800"
                            >
                                #
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 text-left text-sm font-semibold text-green-800"
                            >
                                ชื่อ
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 text-left text-sm font-semibold text-green-800"
                            >
                                อีเมล
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-4 text-center text-sm font-semibold text-green-800"
                            >
                                ประเภท
                            </th>
                            <th scope="col" className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-green-100 bg-white/50">
                        {members.map((member) => (
                            <MemberRow key={member.id} member={member} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
