import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";

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
      return NextResponse.json(
        { success: false, message: "ไม่พบหมวดหมู่ที่ต้องการ" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: tag });
  } catch (error) {
    console.error("Error fetching tag:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดภายในระบบ" },
      { status: 500 }
    );
  }
}
