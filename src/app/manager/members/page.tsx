import MemberTable from "~/components/member/MemberTable";
import Pagination from "~/components/Pagination";
import Search from "~/components/Search";
import Wrapper from "~/components/Wrapper";
import { getMembersWithPagination } from "~/db";
import { UsersIcon, UserGroupIcon } from "@heroicons/react/24/outline";

interface PageProps {
    searchParams: Promise<{ page: string; search: string }>;
}

export default async function page({ searchParams }: PageProps) {
    const searchParamsResolved = await searchParams;
    const page = parseInt(searchParamsResolved.page) || 1;
    const search = searchParamsResolved.search || "";

    const memberPagination = await getMembersWithPagination({ page, search });

    // if (page > memberPagination.totalPages) notFound();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            <Wrapper className="py-8">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-green-100 p-8 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-lg">
                            <UserGroupIcon className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                จัดการสมาชิก
                            </h1>
                            <p className="text-gray-600">
                                จัดการข้อมูลสมาชิกและสิทธิ์การเข้าถึง
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 border border-green-200">
                            <div className="flex items-center gap-3 mb-2">
                                <UsersIcon className="h-6 w-6 text-green-600" />
                                <span className="text-green-700 font-medium">สมาชิกทั้งหมด</span>
                            </div>
                            <div className="text-3xl font-bold text-green-800">
                                {memberPagination.totalCount}
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-100 to-blue-100 rounded-2xl p-6 border border-blue-200">
                            <div className="flex items-center gap-3 mb-2">
                                <UserGroupIcon className="h-6 w-6 text-blue-600" />
                                <span className="text-blue-700 font-medium">หน้าปัจจุบัน</span>
                            </div>
                            <div className="text-3xl font-bold text-blue-800">
                                {memberPagination.currentPage}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl p-6 border border-teal-200">
                            <div className="flex items-center gap-3 mb-2">
                                <UsersIcon className="h-6 w-6 text-teal-600" />
                                <span className="text-teal-700 font-medium">จำนวนหน้า</span>
                            </div>
                            <div className="text-3xl font-bold text-teal-800">
                                {memberPagination.totalPages}
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="flex justify-end">
                        <div className="w-full max-w-md">
                            <Search />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    <MemberTable members={memberPagination.members} />

                    <div className="flex justify-center">
                        <Pagination
                            totalPages={memberPagination.totalPages}
                            currentPage={memberPagination.currentPage}
                        />
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}
