import Link from "next/link";
import Wrapper from "~/components/Wrapper";
import { getBooksByTagId, getTagById, getTags } from "~/db";
import { notFound } from "next/navigation";
import { TagIcon, BookOpenIcon, StarIcon, EyeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

interface PageProps {
    params: Promise<{ tid: string }>;
}

export default async function page({ params }: PageProps) {
    const { tid } = await params;

    const tag = await getTagById({ id: tid });
    if (!tag) notFound();

    const books = await getBooksByTagId({ id: tag.id });
    const tags = await getTags();

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            <Wrapper className="py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <Link 
                        href="/tags" 
                        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium mb-6 transition-colors"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        กลับไปหมวดหมู่ทั้งหมด
                    </Link>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-4 rounded-2xl shadow-lg">
                            <TagIcon className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                                {tag.title}
                            </h1>
                            <div className="flex items-center gap-2 text-secondary-600">
                                <BookOpenIcon className="h-5 w-5" />
                                <span>{books.length} หนังสือ</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Tags */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                        <TagIcon className="h-5 w-5 text-secondary-600" />
                        หมวดหมู่อื่นๆ
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {tags
                            .filter(t => t.id !== tag.id && t.books.length > 0)
                            .slice(0, 8)
                            .map((relatedTag) => (
                            <Link
                                key={relatedTag.id}
                                href={`/tags/${relatedTag.id}`}
                                className="inline-flex items-center gap-2 bg-white hover:bg-primary-50 border border-secondary-200 hover:border-primary-200 rounded-xl px-4 py-2 text-sm text-secondary-700 hover:text-primary-700 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <span>{relatedTag.title}</span>
                                <span className="text-xs text-secondary-500 bg-secondary-100 px-2 py-0.5 rounded-full">
                                    {relatedTag.books.length}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Books Section */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-secondary-900 flex items-center gap-2">
                            <BookOpenIcon className="h-6 w-6 text-secondary-600" />
                            หนังสือในหมวดหมู่นี้
                        </h2>
                        <span className="text-sm text-secondary-500 bg-secondary-100 px-3 py-1 rounded-full">
                            ทั้งหมด {books.length} เล่ม
                        </span>
                    </div>

                    {books.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {books.map((book) => (
                                <Link
                                    key={book.id}
                                    href={`/books/${book.id}`}
                                    className="group bg-white rounded-2xl shadow-lg border border-secondary-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
                                        <img
                                            src={book.imageUrl}
                                            alt={book.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    
                                    <div className="p-4">
                                        <h3 className="font-medium text-secondary-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                            {book.title}
                                        </h3>
                                        
                                        <div className="flex items-center justify-between text-xs text-secondary-500">
                                            <div className="flex items-center gap-1">
                                                <EyeIcon className="h-3 w-3" />
                                                {book.views} ครั้ง
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <StarIcon className="h-3 w-3 text-primary-400" />
                                                {book.rating}/5
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="bg-secondary-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                                <BookOpenIcon className="h-12 w-12 text-secondary-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                                ยังไม่มีหนังสือในหมวดหมู่นี้
                            </h3>
                            <p className="text-secondary-500 mb-6">
                                ขณะนี้ยังไม่มีหนังสือในหมวดหมู่ "{tag.title}"
                            </p>
                            <Link 
                                href="/tags"
                                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                            >
                                เลือกหมวดหมู่อื่น
                                <ArrowRightIcon className="h-4 w-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </Wrapper>
        </div>
    );
}
