"use client";

import { cn } from "~/libs";
import { useEffect, useState, useCallback } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { updateBookRating } from "~/actions";

interface BookRatingProps {
    bookId: string;
    initialValue: number;
    compact?: boolean;
}

export default function BookRating({ bookId, initialValue, compact = false }: BookRatingProps) {
    const [stars, setStars] = useState<number>(initialValue);

    const handleRatingUpdate = useCallback(async () => {
        if (stars > 0) {
            await updateBookRating({ id: bookId, stars });
        }
    }, [stars, bookId]);

    useEffect(() => {
        handleRatingUpdate();
    }, [handleRatingUpdate]);

    if (compact) {
        return (
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                    <button
                        key={i}
                        type="button"
                        className={cn(
                            "transition-all duration-200 hover:scale-110 focus:outline-none",
                            stars >= i + 1
                                ? "text-yellow-400 hover:text-yellow-500"
                                : "text-gray-300 hover:text-gray-400"
                        )}
                        onClick={() => setStars(i + 1)}
                        title={`ให้คะแนน ${i + 1} ดาว`}
                    >
                        <StarIcon className="h-4 w-4 drop-shadow-sm" />
                    </button>
                ))}
                <span className="ml-2 text-xs text-gray-600">
                    ({stars > 0 ? `${stars}/5` : '0/5'})
                </span>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">ให้คะแนนหนังสือ</h3>
                <p className="text-sm text-gray-600">แบ่งปันความคิดเห็นของคุณ</p>
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                    <button
                        key={i}
                        type="button"
                        className={cn(
                            "p-1 rounded-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-300",
                            stars >= i + 1
                                ? "text-yellow-400 hover:text-yellow-500"
                                : "text-gray-300 hover:text-gray-400"
                        )}
                        onClick={() => setStars(i + 1)}
                        title={`ให้คะแนน ${i + 1} ดาว`}
                    >
                        <StarIcon className="h-8 w-8 drop-shadow-sm" />
                    </button>
                ))}
            </div>
            
            <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
                    <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-green-700">
                        {stars > 0 ? `${stars} จาก 5 ดาว` : 'ยังไม่ได้ให้คะแนน'}
                    </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">คลิกดาวเพื่อให้คะแนน</p>
            </div>
        </div>
    );
}
