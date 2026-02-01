import { NextRequest } from "next/server";
import prisma from "../../../../prisma";
import { corsHeaders, handleOptions, jsonResponse } from "../cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("per_page") || "10");
    const search = searchParams.get("search") || "";
    const tagId = searchParams.get("tag_id") || "";

    const where = {
      AND: [
        search ? { title: { contains: search } } : {},
        tagId ? { tagId } : {},
      ],
    };

    const [books, totalCount] = await Promise.all([
      prisma.book.findMany({
        where,
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: { createdAt: "desc" },
        include: { tag: true },
      }),
      prisma.book.count({ where }),
    ]);

    return jsonResponse({
      data: books,
      meta: {
        current_page: page,
        last_page: Math.ceil(totalCount / perPage),
        per_page: perPage,
        total: totalCount,
      },
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return jsonResponse(
      { success: false, message: "เกิดข้อผิดพลาดภายในระบบ" },
      500
    );
  }
}
