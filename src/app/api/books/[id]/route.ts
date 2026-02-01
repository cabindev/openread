import { NextRequest } from "next/server";
import prisma from "../../../../../prisma";
import { handleOptions, jsonResponse } from "../../cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const book = await prisma.book.findUnique({
      where: { id },
      include: { tag: true },
    });

    if (!book) {
      return jsonResponse(
        { success: false, message: "ไม่พบหนังสือที่ต้องการ" },
        404
      );
    }

    return jsonResponse({ data: book });
  } catch (error) {
    console.error("Error fetching book:", error);
    return jsonResponse(
      { success: false, message: "เกิดข้อผิดพลาดภายในระบบ" },
      500
    );
  }
}
