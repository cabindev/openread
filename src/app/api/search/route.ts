import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q") || "";

    if (!q) {
      return NextResponse.json({
        books: [],
        tags: [],
      });
    }

    const [books, tags] = await Promise.all([
      prisma.book.findMany({
        where: { title: { contains: q } },
        take: 10,
        include: { tag: true },
      }),
      prisma.tag.findMany({
        where: { title: { contains: q } },
        include: { _count: { select: { books: true } } },
      }),
    ]);

    return NextResponse.json({
      books: books.map((book) => ({
        ...book,
        type: "book",
      })),
      tags: tags.map((tag) => ({
        id: tag.id,
        title: tag.title,
        bookCount: tag._count.books,
        type: "tag",
      })),
    });
  } catch (error) {
    console.error("Error searching:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดภายในระบบ" },
      { status: 500 }
    );
  }
}
