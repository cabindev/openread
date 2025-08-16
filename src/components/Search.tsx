"use client";

import Button from "./Button";
import Input from "./Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function Search() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [value, setValue] = useState(searchParams.get("search") || "");
   const [isFocused, setIsFocused] = useState(false);

   const handleSearch = () => {
       const params = new URLSearchParams(searchParams);
       if (value) {
           params.set("search", value);
       } else {
           params.delete("search");
       }
       router.push(`?${params.toString()}`);
   };

   const clearSearch = () => {
       setValue("");
       const params = new URLSearchParams(searchParams);
       params.delete("search");
       router.push(`?${params.toString()}`);
   };

   return (
       <div className="flex justify-center w-full">
           <div className={`relative w-full max-w-md transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
               <div className={`
                   relative flex items-center bg-white/80 backdrop-blur-md rounded-xl 
                   border-2 transition-all duration-300
                   ${isFocused ? 'border-green-500 shadow-lg shadow-green-100' : 'border-gray-200 shadow-md'}
               `}>
                   <MagnifyingGlassIcon className="size-5 text-gray-400 ml-4" />
                   <Input
                       className="w-full bg-transparent border-none pl-3 pr-10 py-3
                               text-gray-700 placeholder:text-gray-400
                               focus:ring-0 focus:outline-none"
                       placeholder="ค้นหาหนังสือที่คุณสนใจ..."
                       value={value}
                       onChange={(e) => setValue(e.target.value)}
                       onFocus={() => setIsFocused(true)}
                       onBlur={() => setIsFocused(false)}
                       onKeyDown={(e) => {
                           if (e.key === "Enter") {
                               handleSearch();
                           }
                       }}
                   />
                   {value && (
                       <button
                           onClick={clearSearch}
                           className="absolute right-14 hover:text-green-500 transition-colors"
                       >
                           <XCircleIcon className="size-5 text-gray-400 hover:text-green-500" />
                       </button>
                   )}
                   <Button
                       onClick={handleSearch}
                       className="absolute right-2 px-4 py-2 rounded-lg
                               bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white 
                               transition-all duration-300 hover:shadow-md font-medium"
                   >
                       ค้นหา
                   </Button>
               </div>
               {isFocused && (
                   <div className="absolute mt-2 w-full text-sm text-gray-500 text-center">
                       กด Enter เพื่อค้นหา
                   </div>
               )}
           </div>
       </div>
   );
}