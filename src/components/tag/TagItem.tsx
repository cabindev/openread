"use client";

import Link from "next/link";
import { Prisma } from "@prisma/client";
import { cn } from "~/libs";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteTag } from "~/actions";

interface TagItemProps {
    tag: Prisma.tagGetPayload<{
        include: {
            books: true;
        };
    }>;
    isManager: boolean;
}

export default function TagItem({ tag, isManager }: TagItemProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const tagOrigin = isManager ? "/manager/tags/" + tag.id : "/tags/" + tag.id;
    const isBookEmpty = tag.books.length <= 0;
    const tagPath = isBookEmpty && !isManager ? "#" : tagOrigin;

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!confirm(`คุณต้องการลบหมวดหมู่ "${tag.title}" หรือไม่?`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const result = await deleteTag(tag.id);
            if (result.success) {
                toast.success(result.message);
                // Reload the page to update the tag list
                window.location.reload();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("เกิดข้อผิดพลาดในการลบหมวดหมู่");
        } finally {
            setIsDeleting(false);
        }
    };

    if (isManager) {
        return (
            <div className="relative group inline-block">
                <Link
                    href={tagPath}
                    className={cn(
                        "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200",
                        isBookEmpty
                            ? "cursor-default bg-gray-100 border-gray-200 text-gray-400"
                            : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 hover:shadow-md"
                    )}
                >
                    <span>{tag.title}</span>
                    <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        isBookEmpty
                            ? "bg-gray-200 text-gray-500"
                            : "bg-green-200 text-green-600"
                    )}>
                        {tag.books.length}
                    </span>
                </Link>
                
                {/* Manager actions */}
                <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                        href={`/manager/tags/${tag.id}`}
                        className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-colors duration-200 text-xs"
                        title="แก้ไขหมวดหมู่"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <PencilIcon className="h-3 w-3" />
                    </Link>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="p-1.5 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-lg shadow-lg transition-colors duration-200 text-xs"
                        title="ลบหมวดหมู่"
                    >
                        <TrashIcon className="h-3 w-3" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Link
            href={tagPath}
            className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200",
                isBookEmpty
                    ? "cursor-not-allowed opacity-50 bg-gray-100 border-gray-200 text-gray-400"
                    : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 hover:shadow-md"
            )}
        >
            <span>{tag.title}</span>
            <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                isBookEmpty
                    ? "bg-gray-200 text-gray-500"
                    : "bg-green-200 text-green-600"
            )}>
                {tag.books.length}
            </span>
        </Link>
    );
}
