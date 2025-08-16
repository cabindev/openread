import BookItem from "./BookItem";
import { book } from "@prisma/client";

interface BookListProps {
    books: book[];
    isManager: boolean;
}

export default function BookList({ books, isManager }: BookListProps) {
    if (books.length <= 0) {
        return <p className="text-gray-500">ไม่มีพบหนังสือ...</p>;
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {books.map((book, i) => (
                <BookItem key={i} book={book} isManager={isManager} />
            ))}
        </div>
    );
}
