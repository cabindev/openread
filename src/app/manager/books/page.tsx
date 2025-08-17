import Link from "next/link";
import Search from "~/components/Search";
import BookList from "~/components/book/BookList";
import Button from "~/components/Button";
import Pagination from "~/components/Pagination";
import TagList from "~/components/tag/TagList";
import Wrapper from "~/components/Wrapper";
import { getBooksWithPagination, getTags } from "~/db";
import { PlusIcon, BookOpenIcon, TagIcon } from "@heroicons/react/24/outline";

interface PageProps {
   searchParams: Promise<{ page: string; search: string }>;
}

export default async function page({ searchParams }: PageProps) {
   const searchParamsResolved = await searchParams;
   const page = parseInt(searchParamsResolved.page) || 1;
   const search = searchParamsResolved.search || "";

   const bookPagination = await getBooksWithPagination({ page, search });
   const tags = await getTags();

   const isTagEmpty = tags.length <= 0;
   const addBookPath = isTagEmpty
       ? "/manager/tags/create"
       : "/manager/books/create";

   return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            <Wrapper className="py-8">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-green-100 p-8 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-lg">
                            <BookOpenIcon className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                จัดการหนังสือ
                            </h1>
                            <p className="text-gray-600">
                                จัดการคลังหนังสือดิจิทัลและหมวดหมู่
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 border border-green-200">
                            <div className="flex items-center gap-3 mb-2">
                                <BookOpenIcon className="h-6 w-6 text-green-600" />
                                <span className="text-green-700 font-medium">หนังสือทั้งหมด</span>
                            </div>
                            <div className="text-3xl font-bold text-green-800">
                                {bookPagination.totalCount || 0}
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl p-6 border border-emerald-200">
                            <div className="flex items-center gap-3 mb-2">
                                <TagIcon className="h-6 w-6 text-emerald-600" />
                                <span className="text-emerald-700 font-medium">หมวดหมู่</span>
                            </div>
                            <div className="text-3xl font-bold text-emerald-800">
                                {tags.length}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-200 to-emerald-200 rounded-2xl p-6 border border-green-300">
                            <div className="flex items-center gap-3 mb-2">
                                <BookOpenIcon className="h-6 w-6 text-green-700" />
                                <span className="text-green-800 font-medium">หน้าปัจจุบัน</span>
                            </div>
                            <div className="text-3xl font-bold text-green-900">
                                {bookPagination.currentPage}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex gap-3">
                            <Link href={addBookPath}>
                                <Button variants="outline" 
                                    className="flex items-center gap-2 px-6 py-3 text-sm 
                                             bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white
                                             border-0 rounded-xl font-medium
                                             transition duration-200 ease-in-out
                                             shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                    <PlusIcon className="w-5 h-5" />
                                    เพิ่มหนังสือ
                                </Button>
                            </Link>
                            <Link href="/manager/tags/create">
                                <Button variants="outline"
                                    className="flex items-center gap-2 px-6 py-3 text-sm
                                             bg-white hover:bg-green-50 text-green-600 hover:text-green-700
                                             border border-green-200 hover:border-green-300 rounded-xl font-medium
                                             transition duration-200 ease-in-out
                                             shadow-lg hover:shadow-xl">
                                    <TagIcon className="w-5 h-5" />
                                    เพิ่มหมวดหมู่
                                </Button>
                            </Link>
                        </div>
                        
                        <div className="w-full sm:w-auto sm:max-w-md">
                            <Search />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <TagList tags={tags} isManager={true} />
                    <BookList books={bookPagination.books} isManager={true} />
                    
                    <div className="flex justify-center">
                        <Pagination
                            totalPages={bookPagination.totalPages}
                            currentPage={bookPagination.currentPage}
                        />
                    </div>
                </div>
            </Wrapper>
        </div>
   );
};