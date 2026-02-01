import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: { books: true },
        },
      },
      orderBy: { title: "asc" },
    });

    const data = tags.map((tag) => ({
      id: tag.id,
      title: tag.title,
      bookCount: tag._count.books,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดภายในระบบ" },
      { status: 500 }
    );
  }
}
