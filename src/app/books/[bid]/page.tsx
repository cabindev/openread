import { getBookById } from "~/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Wrapper from "~/components/Wrapper";
import BookRating from "~/components/book/BookRating";
import PDFViewer from "~/components/PDFViewer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, EyeIcon, TagIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { addBookView } from "~/actions";

interface PageProps {
    params: Promise<{ bid: string }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { bid } = await params;
    const book = await getBookById({ id: bid });
    if (!book) return {};

    return {
        title: book.title,
        openGraph: { images: { url: book.imageUrl } },
    };
}

export default async function page({ params }: PageProps) {
    const { bid } = await params;

    const book = await getBookById({ id: bid });
    if (!book) notFound();

    // Add view count
    await addBookView(book.id);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* Header with back button and book info */}
            <div className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-40">
                <Wrapper className="py-4">
                    <div className="flex items-center gap-6">
                        <Link 
                            href="/"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white border border-green-200 hover:border-green-300 transition-all duration-200 shadow-sm hover:shadow-md group"
                        >
                            <ArrowLeftIcon className="h-5 w-5 text-green-600 group-hover:text-green-700" />
                            <span className="text-green-700 font-medium">กลับหน้าหลัก</span>
                        </Link>
                        
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative h-16 w-12 rounded-lg overflow-hidden shadow-md border border-green-100">
                                <Image 
                                    src={book.imageUrl} 
                                    alt={book.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            
                            <div className="flex-1">
                                <h1 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                                    {book.title}
                                </h1>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    {book.tag && (
                                        <div className="flex items-center gap-1">
                                            <TagIcon className="h-4 w-4 text-green-600" />
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                                {book.tag.title}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <EyeIcon className="h-4 w-4 text-gray-500" />
                                        <span>{book.views.toLocaleString()} ครั้ง</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookRating bookId={book.id} initialValue={book.rating} compact={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </div>

            {/* Main content */}
            <div className="flex-1">
                <Wrapper className="py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* PDF Viewer */}
                        <div className="lg:col-span-3">
                            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-green-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                                    <div className="flex items-center gap-3 text-white">
                                        <BookOpenIcon className="h-6 w-6" />
                                        <h2 className="text-lg font-semibold">อ่านหนังสือ</h2>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <PDFViewer pdfUrl={book.pdfUrl} />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Book Details Card */}
                            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-green-100 p-6">
                                <div className="text-center mb-6">
                                    <div className="relative h-48 w-32 mx-auto rounded-xl overflow-hidden shadow-lg border border-green-100">
                                        <Image 
                                            src={book.imageUrl} 
                                            alt={book.title}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-3">{book.title}</h3>
                                        <div className="space-y-3 text-sm">
                                            {book.tag && (
                                                <div className="flex items-center gap-2">
                                                    <TagIcon className="h-4 w-4 text-green-600" />
                                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                                        {book.tag.title}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <EyeIcon className="h-4 w-4" />
                                                <span>{book.views.toLocaleString()} ครั้งที่อ่าน</span>
                                            </div>
                                            
                                            {/* Rating แบบ compact */}
                                            <div className="pt-2 border-t border-green-100">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-700">ให้คะแนน:</span>
                                                    <div className="flex items-center gap-1">
                                                        <BookRating bookId={book.id} initialValue={book.rating} compact={true} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-green-100 p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">การดำเนินการ</h3>
                                <div className="space-y-3">
                                    <Link 
                                        href={book.pdfUrl}
                                        target="_blank"
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        <BookOpenIcon className="h-5 w-5" />
                                        เปิดในหน้าต่างใหม่
                                    </Link>
                                    {book.tag && (
                                        <Link 
                                            href={`/tags/${book.tag.id}`}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-green-50 text-green-600 hover:text-green-700 border border-green-200 hover:border-green-300 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                                        >
                                            <TagIcon className="h-5 w-5" />
                                            ดูหนังสือในหมวดเดียวกัน
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </div>
        </div>
    );
}