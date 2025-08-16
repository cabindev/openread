"use client";

import { tag } from "@prisma/client";
import Link from "next/link";
import { BookOpenIcon } from "@heroicons/react/24/outline";

interface CategoriesSectionProps {
  tags: (tag & { bookCount: number })[];
}

export default function CategoriesSection({ tags }: CategoriesSectionProps) {
  return (
    <section className="bg-white p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-secondary-900 mb-2">
          📖 หมวดหมู่หนังสือ
        </h2>
        <p className="text-secondary-600 text-sm">
          เลือกอ่านตามหมวดหมู่ที่คุณสนใจ
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/tags/${tag.id}`}
            className="group bg-secondary-50 hover:bg-secondary-100 border border-secondary-200 rounded-xl p-6 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <BookOpenIcon className="h-6 w-6 text-secondary-600" />
              <span className="text-xs font-medium bg-secondary-200 text-secondary-700 px-2 py-1 rounded-full">
                {tag.bookCount} เล่ม
              </span>
            </div>
            
            <h3 className="font-semibold text-sm mb-1 text-secondary-900 group-hover:text-primary-600 transition-colors">
              {tag.title}
            </h3>
            
            <p className="text-xs text-secondary-600">
              คลิกเพื่อดูหนังสือ
            </p>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <Link
          href="/tags"
          className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          <BookOpenIcon className="h-5 w-5" />
          ดูหมวดหมู่ทั้งหมด
        </Link>
      </div>
    </section>
  );
}