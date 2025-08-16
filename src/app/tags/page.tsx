import Link from "next/link";
import Wrapper from "~/components/Wrapper";
import { getTags } from "~/db";
import { TagIcon, BookOpenIcon } from "@heroicons/react/24/outline";

export default async function TagsPage() {
    const tags = await getTags();

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            <Wrapper className="py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-3 rounded-2xl shadow-lg">
                            <TagIcon className="h-8 w-8" />
                        </div>
                        <h1 className="text-4xl font-bold text-secondary-900">
                            หมวดหมู่ทั้งหมด
                        </h1>
                    </div>
                    <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
                        เลือกหมวดหมู่ที่สนใจเพื่อค้นหาหนังสือที่คุณชื่นชอบ
                    </p>
                </div>

                {/* Tags Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {tags.map((tag) => {
                        const bookCount = tag.books.length;
                        const isEmpty = bookCount === 0;
                        
                        return (
                            <Link
                                key={tag.id}
                                href={isEmpty ? "#" : `/tags/${tag.id}`}
                                className={`group bg-white rounded-2xl shadow-lg border border-secondary-200 p-6 transition-all duration-300 ${
                                    isEmpty 
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:shadow-xl hover:-translate-y-1 hover:border-primary-200'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${
                                        isEmpty 
                                            ? 'bg-secondary-100 text-secondary-400' 
                                            : 'bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600 group-hover:from-primary-500 group-hover:to-primary-600 group-hover:text-white'
                                    } transition-all duration-300`}>
                                        <TagIcon className="h-6 w-6" />
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        isEmpty
                                            ? 'bg-secondary-100 text-secondary-500'
                                            : 'bg-primary-100 text-primary-700 group-hover:bg-primary-500 group-hover:text-white'
                                    } transition-all duration-300`}>
                                        {bookCount} เล่म
                                    </div>
                                </div>
                                
                                <h3 className={`text-lg font-semibold mb-3 ${
                                    isEmpty 
                                        ? 'text-secondary-400' 
                                        : 'text-secondary-900 group-hover:text-primary-600'
                                } transition-colors duration-300`}>
                                    {tag.title}
                                </h3>
                                
                                <div className="flex items-center gap-2 text-sm text-secondary-500">
                                    <BookOpenIcon className="h-4 w-4" />
                                    <span>
                                        {isEmpty ? 'ยังไม่มีหนังสือ' : `หนังสือ ${bookCount} เล่ม`}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Empty State */}
                {tags.length === 0 && (
                    <div className="text-center py-16">
                        <div className="bg-secondary-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                            <TagIcon className="h-12 w-12 text-secondary-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                            ยังไม่มีหมวดหมู่
                        </h3>
                        <p className="text-secondary-500">
                            ยังไม่มีหมวดหมู่หนังสือในระบบ
                        </p>
                    </div>
                )}
            </Wrapper>
        </div>
    );
}