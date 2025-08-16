"use client";

import { book } from "@prisma/client";
import Link from "next/link";
import { StarIcon, EyeIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface FeaturedSectionProps {
  popularBooks: book[];
  recentBooks: book[];
}

export default function FeaturedSection({ popularBooks, recentBooks }: FeaturedSectionProps) {
  return (
    <div className="space-y-12">
      {/* Popular Books */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-secondary-900 mb-2 flex items-center gap-3">
              <svg className="w-6 h-6 text-secondary-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
              หนังสือยอดนิยม
            </h2>
            <p className="text-secondary-600 text-sm">
              หนังสือที่มีผู้อ่านมากที่สุด
            </p>
          </div>
          <Link 
            href="/?sort=popular" 
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
          >
            ดูทั้งหมด
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularBooks.map((book, index) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="group bg-white rounded-2xl shadow-lg border border-secondary-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                {index < 3 && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      #{index + 1}
                    </span>
                  </div>
                )}
                <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
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
      </section>

      {/* Recent Books */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-secondary-900 mb-2 flex items-center gap-3">
              <svg className="w-6 h-6 text-secondary-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              หนังสือใหม่ล่าสุด
            </h2>
            <p className="text-secondary-600 text-sm">
              หนังสือที่เพิ่งเข้ามาใหม่
            </p>
          </div>
          <Link 
            href="/?sort=newest" 
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
          >
            ดูทั้งหมด
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recentBooks.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="group bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-3">
                <h3 className="font-medium text-secondary-900 text-sm mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {book.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs text-secondary-500">
                  <div className="flex items-center gap-1">
                    <EyeIcon className="h-3 w-3" />
                    {book.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-3 w-3 text-primary-400" />
                    {book.rating}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}