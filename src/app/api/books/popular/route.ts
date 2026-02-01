import { NextRequest } from "next/server";
import prisma from "../../../../../prisma";
import { handleOptions, jsonResponse } from "../../cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "8");

    const books = await prisma.book.findMany({
      orderBy: { views: "desc" },
      take: limit,
      include: { tag: true },
    });

    return jsonResponse({ data: books });
  } catch (error) {
    console.error("Error fetching popular books:", error);
    return jsonResponse(
      { success: false, message: "เกิดข้อผิดพลาดภายในระบบ" },
      500
    );
  }
}
