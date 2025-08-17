import { getBookById } from "~/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
            {/* Minimal Header */}
            <div className="bg-white/95 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link 
                                href="/"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 hover:border-gray-400 transition-all duration-200 group"
                            >
                                <ArrowLeftIcon className="h-4 w-4 text-gray-600 group-hover:text-gray-700" />
                                <span className="text-gray-700 font-medium text-sm">กลับ</span>
                            </Link>
                            
                            <div className="flex items-center gap-3">
                                <div className="relative h-12 w-9 rounded-md overflow-hidden shadow-sm border border-gray-200">
                                    <Image 
                                        src={book.imageUrl} 
                                        alt={book.title}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div>
                                    <h1 className="font-semibold text-gray-900 text-sm line-clamp-1">
                                        {book.title}
                                    </h1>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <span>{book.views.toLocaleString()} ครั้ง</span>
                                        {book.tag && (
                                            <>
                                                <span>•</span>
                                                <span className="text-green-600">{book.tag.title}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="hidden md:flex items-center gap-2">
                            <BookRating bookId={book.id} initialValue={book.rating} compact={true} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Reading Area */}
            <div className="flex-1">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                        {/* Enhanced PDF Reader */}
                        <div className="xl:col-span-4">
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                                {/* Reader Header */}
                                <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
                                    <div className="flex items-center justify-between text-white">
                                        <div className="flex items-center gap-3">
                                            <BookOpenIcon className="h-5 w-5" />
                                            <h2 className="font-semibold">อ่านหนังสือ</h2>
                                        </div>
                                        <div className="text-sm text-gray-300">
                                            เครื่องมือการอ่านขั้นสูง
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Enhanced PDF Viewer Container */}
                                <div className="bg-gray-50 p-6">
                                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                        <PDFViewer pdfUrl={book.pdfUrl} />
                                    </div>
                                </div>
                                
                                {/* Reading Tips */}
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200 px-6 py-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-4 text-gray-600">
                                            <span>💡 <strong>เคล็ดลับ:</strong> ใช้ปุ่มซูมเพื่อปรับขนาดให้เหมาะกับการอ่าน</span>
                                        </div>
                                        <div className="hidden lg:flex items-center gap-4 text-gray-500 text-xs">
                                            <span>← → เปลี่ยนหน้า</span>
                                            <span>F11 เต็มจอ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Improved Sidebar - Keep rating section unchanged */}
                        <div className="xl:col-span-1 space-y-6">
                            {/* Book Info Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                                <div className="text-center mb-6">
                                    <div className="relative h-44 w-28 mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200">
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
                                        <h3 className="font-semibold text-gray-900 mb-3 text-center">{book.title}</h3>
                                        <div className="space-y-3 text-sm">
                                            {book.tag && (
                                                <div className="flex items-center justify-center gap-2">
                                                    <TagIcon className="h-4 w-4 text-green-600" />
                                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                                        {book.tag.title}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                                <EyeIcon className="h-4 w-4" />
                                                <span>{book.views.toLocaleString()} ครั้งที่อ่าน</span>
                                            </div>
                                            
                                            {/* Rating Section - Keep as requested */}
                                            <div className="pt-3 border-t border-gray-200">
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

                            {/* Enhanced Quick Actions */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">การดำเนินการ</h3>
                                <div className="space-y-3">
                                    <Link 
                                        href={book.pdfUrl}
                                        target="_blank"
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        <BookOpenIcon className="h-5 w-5" />
                                        เปิดในแท็บใหม่
                                    </Link>
                                    {book.tag && (
                                        <Link 
                                            href={`/tags/${book.tag.id}`}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                                        >
                                            <TagIcon className="h-5 w-5" />
                                            หนังสือในหมวดเดียวกัน
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Reading Stats */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">สถิติการอ่าน</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">ยอดเข้าชม:</span>
                                        <span className="font-semibold text-green-700">{book.views.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">คะแนน:</span>
                                        <span className="font-semibold text-green-700">{book.rating}/5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}