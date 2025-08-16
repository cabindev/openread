"use client";

import Link from "next/link";
import { book } from "@prisma/client";
import { addBookView } from "~/actions";

interface BookItemProps {
    book: book;
    isManager: boolean;
}

export default function BookItem({ book, isManager }: BookItemProps) {
    const bookPath = isManager
        ? "/manager/books/" + book.id
        : "/books/" + book.id;

    return (
        <Link href={bookPath} onClick={() => addBookView({ id: book.id })}>
            <img
                src={book.imageUrl}
                alt={book.title}
                className="h-64 w-auto rounded border object-cover"
            />
        </Link>
    );
}