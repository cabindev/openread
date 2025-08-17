"use server";

import prisma from "../../prisma";

export async function getTags() {
    const tags = await prisma.tag.findMany({
        orderBy: { books: { _count: "desc" } },
        include: { books: true },
    });
    return tags;
}

export async function getTagById({ id }: { id: string }) {
    const tag = await prisma.tag.findUnique({ where: { id } });
    return tag;
}

export async function getTagsWithBookCount() {
    const tags = await prisma.tag.findMany({
        include: {
            _count: {
                select: { books: true }
            }
        },
        orderBy: { title: "asc" },
    });
    
    return tags.map(tag => ({
        ...tag,
        bookCount: tag._count.books
    }));
}
