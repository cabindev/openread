import BookList from "~/components/book/BookList";
import Heading from "~/components/Heading";
import Pagination from "~/components/Pagination";
import Search from "~/components/Search";
import TagList from "~/components/tag/TagList";
import Wrapper from "~/components/Wrapper";
import HeroSection from "~/components/HeroSection";
import FeaturedSection from "~/components/FeaturedSection";
import CategoriesSection from "~/components/CategoriesSection";
import { getBooksWithPagination, getTags, getPopularBooks, getRecentBooks } from "~/db";
import { getTagsWithBookCount } from "~/db/tag";

interface PageProps {
    searchParams: Promise<{ page: string; search: string }>;
}

export default async function page({ searchParams }: PageProps) {
    const searchParamsResolved = await searchParams;
    const page = parseInt(searchParamsResolved.page) || 1;
    const search = searchParamsResolved.search || "";

    // If there's a search, show search results
    if (search) {
        const bookPagination = await getBooksWithPagination({ page, search });
        const tags = await getTags();
        
        return (
            <Wrapper className="space-y-8">
                <div className="w-full space-y-8">
                    {/* Search Section */}
                    <div className="flex justify-center w-full">
                        <Search />
                    </div>
         
                    {/* Tags Section */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                        <h2 className="text-lg font-medium text-secondary-800 mb-4">หมวดหมู่หนังสือ</h2>
                        <TagList tags={tags} isManager={false} />
                    </div>
         
                    {/* Books Section */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-medium text-secondary-800">หนังสือทั้งหมด</h2>
                            <span className="text-sm text-secondary-600">
                                ผลการค้นหา: "{search}"
                            </span>
                        </div>
                        <BookList books={bookPagination.books} isManager={false} />
                    </div>
         
                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        <Pagination
                            totalPages={bookPagination.totalPages}
                            currentPage={bookPagination.currentPage}
                        />
                    </div>
                </div>
            </Wrapper>
        );
    }

    // Home page without search
    const [popularBooks, recentBooks, tagsWithCount] = await Promise.all([
        getPopularBooks(8),
        getRecentBooks(6),
        getTagsWithBookCount()
    ]);

    return (
        <div className="min-h-screen bg-secondary-50">
            {/* Hero Section */}
            <HeroSection />

            <Wrapper className="space-y-12 py-8">
                {/* Featured Books */}
                <FeaturedSection 
                    popularBooks={popularBooks}
                    recentBooks={recentBooks}
                />

                {/* Categories */}
                <CategoriesSection tags={tagsWithCount} />
            </Wrapper>
        </div>
    );
}
