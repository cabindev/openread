"use client";

import Link from "next/link";
import { book } from "@prisma/client";
import { addBookView, deleteBook } from "~/actions";
import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import toast from "react-hot-toast";

interface BookItemProps {
    book: book;
    isManager: boolean;
}

export default function BookItem({ book, isManager }: BookItemProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const bookPath = isManager
        ? "/manager/books/" + book.id
        : "/books/" + book.id;

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!confirm(`คุณต้องการลบหนังสือ "${book.title}" หรือไม่?`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const result = await deleteBook(book.id);
            if (result.success) {
                toast.success(result.message);
                // Reload the page to update the book list
                window.location.reload();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("เกิดข้อผิดพลาดในการลบหนังสือ");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleViewClick = () => {
        if (!isManager) {
            addBookView({ id: book.id });
        }
    };

    return (
        <div className="relative group">
            <Link href={bookPath} onClick={handleViewClick} className="block">
                <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="h-64 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Book title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-semibold text-sm line-clamp-2">{book.title}</h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-300">
                            <EyeIcon className="h-3 w-3" />
                            <span>{book.views} ครั้ง</span>
                        </div>
                    </div>
                </div>
            </Link>
            
            {/* Manager actions */}
            {isManager && (
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                        href={`/manager/books/${book.id}`}
                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-colors duration-200"
                        title="แก้ไขหนังสือ"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <PencilIcon className="h-4 w-4" />
                    </Link>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="p-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-lg shadow-lg transition-colors duration-200"
                        title="ลบหนังสือ"
                    >
                        <TrashIcon className="h-4 w-4" />
                    </button>
                </div>
            )}
        </div>
    );
}