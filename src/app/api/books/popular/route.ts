import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "8");

    const books = await prisma.book.findMany({
      orderBy: { views: "desc" },
      take: limit,
      include: { tag: true },
    });

    return NextResponse.json({ data: books });
  } catch (error) {
    console.error("Error fetching popular books:", error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดภายในระบบ" },
      { status: 500 }
    );
  }
}
