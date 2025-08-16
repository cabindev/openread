"use client";

import { Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "~/libs";
import Button from "./Button";

interface PaginationProps {
   totalPages: number;
   currentPage: number;
}

export default function Pagination({
   totalPages,
   currentPage,
}: PaginationProps) {
   const router = useRouter();
   const searchParams = useSearchParams();

   const handlePageChange = (page: number) => {
       const params = new URLSearchParams(searchParams);
       params.set("page", page.toString());
       router.push(`?${params.toString()}`);
   };

   return (
       <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-green-100 p-4">
           <div className="flex items-center justify-center gap-2">
               <Button
                   onClick={() => handlePageChange(currentPage - 1)}
                   disabled={currentPage === 1}
                   className={cn(
                       "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                       currentPage === 1 
                           ? "cursor-not-allowed opacity-50 bg-gray-100 text-gray-400" 
                           : "bg-white border border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                   )}
                   variants="outline"
               >
                   ก่อนหน้า
               </Button>

               {Array.from({ length: totalPages }, (_, i) => i + 1)
                   .filter(
                       (page) =>
                           page === 1 ||
                           page === totalPages ||
                           Math.abs(currentPage - page) <= 1,
                   )
                   .map((page, i, arr) => (
                       <Fragment key={page}>
                           {i > 0 && arr[i] - arr[i - 1] > 1 && (
                               <span className="text-gray-400 px-2">...</span>
                           )}
                           <Button
                               variants="outline"
                               onClick={() => handlePageChange(page)}
                               className={cn(
                                   "min-w-[40px] px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                                   currentPage === page 
                                       ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-md" 
                                       : "bg-white border border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                               )}
                           >
                               {page}
                           </Button>
                       </Fragment>
                   ))}

               <Button
                   onClick={() => handlePageChange(currentPage + 1)}
                   disabled={currentPage === totalPages}
                   className={cn(
                       "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                       currentPage === totalPages 
                           ? "cursor-not-allowed opacity-50 bg-gray-100 text-gray-400"
                           : "bg-white border border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                   )}
                   variants="outline"
               >
                   ถัดไป
               </Button>
           </div>
       </div>
   );
}