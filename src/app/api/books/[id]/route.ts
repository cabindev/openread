import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";

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
      return NextResponse.json(
        { success: false, message: "ไม่พบหนังสือที่ต้องการ" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: book });
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดภายในระบบ" },
      { status: 500 }
    );
  }
}
