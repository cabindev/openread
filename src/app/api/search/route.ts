import { NextRequest } from "next/server";
import prisma from "../../../../prisma";
import { handleOptions, jsonResponse } from "../cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q") || "";

    if (!q) {
      return jsonResponse({
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

    return jsonResponse({
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
    return jsonResponse(
      { success: false, message: "เกิดข้อผิดพลาดภายในระบบ" },
      500
    );
  }
}
