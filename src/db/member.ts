import prisma from "../../prisma";

export async function getMembers() {
    const members = await prisma.member.findMany({
        orderBy: { createdAt: "asc" },
    });
    return members;
}

export async function getMembersWithPagination({
    page,
    search,
}: {
    page: number;
    search: string;
}) {
    const pageInt = Number(page);
    const limitInt = 10;

    const searchArray = [
        { email: { contains: search } },
        { name: { contains: search } },
    ];

    const members = await prisma.member.findMany({
        where: { OR: searchArray },
        skip: (pageInt - 1) * limitInt,
        take: limitInt,
        orderBy: { createdAt: "asc" },
    });

    const totalCount = await prisma.member.count({
        where: { OR: searchArray },
    });

    return {
        members,
        totalPages: Math.ceil(totalCount / limitInt),
        currentPage: pageInt,
        totalCount,
    };
}

export async function getMemberById({ id }: { id: string }) {
    const member = await prisma.member.findUnique({ where: { id } });
    return member;
}

export async function getMembersStats() {
    const totalMembers = await prisma.member.count();
    return { totalMembers };
}
