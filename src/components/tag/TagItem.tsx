import Link from "next/link";
import { Prisma } from "@prisma/client";
import { cn } from "~/libs";

interface TagItemProps {
    tag: Prisma.tagGetPayload<{
        include: {
            books: true;
        };
    }>;
    isManager: boolean;
}

export default function TagItem({ tag, isManager }: TagItemProps) {
    const tagOrigin = isManager ? "/manager/tags/" + tag.id : "/tags/" + tag.id;
    const isBookEmpty = tag.books.length <= 0;
    const tagPath = isBookEmpty && !isManager ? "#" : tagOrigin;

    return (
        <Link
            href={tagPath}
            className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200",
                isBookEmpty && !isManager
                    ? "cursor-not-allowed opacity-50 bg-gray-100 border-gray-200 text-gray-400"
                    : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 hover:shadow-md"
            )}
        >
            <span>{tag.title}</span>
            <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                isBookEmpty && !isManager
                    ? "bg-gray-200 text-gray-500"
                    : "bg-green-200 text-green-600"
            )}>
                {tag.books.length}
            </span>
        </Link>
     );
}
