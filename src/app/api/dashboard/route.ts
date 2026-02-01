import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function GET() {
  try {
    const [totalBooks, totalViews, totalMembers, totalTags, popularBooks, recentBooks, tagsWithCount] =
      await Promise.all([
        prisma.book.count(),
        prisma.book.aggregate({ _sum: { views: true } }),
        prisma.member.count(),
        prisma.tag.count(),
        prisma.book.findMany({
          orderBy: { views: "desc" },
          take: 8,
          include: { tag: true },
        }),
        prisma.book.findMany({
          orderBy: { createdAt: "desc" },
          take: 6,
          include: { tag: true },
        }),
        prisma.tag.findMany({
          include: { _count: { select: { books: true } } },
          orderBy: { title: "asc" },
        }),
      ]);

    return NextResponse.json({
      stats: {
        total_books: totalBooks,
        total_views: totalViews._sum.views || 0,
        total_members: totalMembers,
        total_tags: totalTags,
      },
      popular_books: popularBooks,
      recent_books: recentBooks,
      tags_with_count: tagsWithCount.map((tag) => ({
        id: tag.id,
        title: tag.title,
        bookCount: tag._count.books,
      })),
    });
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดภายในระบบ" },
      { status: 500 }
    );
  }
}
