import CreateBookForm from "~/components/book/CreateBookForm";
import Wrapper from "~/components/Wrapper";
import { getTags } from "~/db";
import Link from "next/link";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";

export default async function page() {
    const tags = await getTags();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            <Wrapper className="py-8">
                {/* Back Button */}
                <Link 
                    href="/manager/books" 
                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium mb-8 transition-colors"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    กลับไปจัดการหนังสือ
                </Link>

                {/* Main Card */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-green-100 p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                                <PlusIcon className="w-8 h-8" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                เพิ่มหนังสือใหม่
                            </h1>
                            <p className="text-gray-600">
                                เพิ่มหนังสือดิจิทัลเข้าสู่ระบบห้องสมุด
                            </p>
                        </div>

                        {/* Form */}
                        <CreateBookForm tags={tags} />
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}
