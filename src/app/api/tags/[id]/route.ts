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

    const tag = await prisma.tag.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!tag) {
      return jsonResponse(
        { success: false, message: "ไม่พบหมวดหมู่ที่ต้องการ" },
        404
      );
    }

    return jsonResponse({ data: tag });
  } catch (error) {
    console.error("Error fetching tag:", error);
    return jsonResponse(
      { success: false, message: "เกิดข้อผิดพลาดภายในระบบ" },
      500
    );
  }
}
