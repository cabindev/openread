import TagItem from "./TagItem";
import { Prisma } from "@prisma/client";

interface TagListProps {
    tags: Prisma.tagGetPayload<{
        include: {
            books: true;
        };
    }>[];
    isManager: boolean;
}

export default function TagList({ tags, isManager }: TagListProps) {
    if (tags.length === 0) {
        return (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-green-100 p-6 text-center">
                <p className="text-gray-500">ยังไม่มีหมวดหมู่</p>
            </div>
        );
    }

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">หมวดหมู่</h3>
            <div className="flex flex-wrap items-center gap-3">
                {tags.map((tag, i) => (
                    <TagItem 
                        key={i} 
                        tag={tag} 
                        isManager={isManager}
                    />
                ))}
            </div>
        </div>
    );
}
