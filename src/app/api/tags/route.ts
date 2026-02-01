import prisma from "../../../../prisma";
import { handleOptions, jsonResponse } from "../cors";

export async function OPTIONS() {
  return handleOptions();
}

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

    return jsonResponse({ data });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return jsonResponse(
      { success: false, message: "เกิดข้อผิดพลาดภายในระบบ" },
      500
    );
  }
}
