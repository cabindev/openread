import UpdateBookForm from "~/components/book/UpdateBookForm";
import Wrapper from "~/components/Wrapper";
import { getBookById, getTags } from "~/db";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ bid: string }>;
}

export default async function page({ params }: PageProps) {
    const { bid } = await params;

    const book = await getBookById({ id: bid });
    if (!book) notFound();

    const tags = await getTags();

    return (
        <Wrapper className="max-w-lg">
            <UpdateBookForm book={book} tags={tags} />
        </Wrapper>
    );
}
