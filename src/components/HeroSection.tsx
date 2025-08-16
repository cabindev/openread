"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "./Button";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100/50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/takhone.jpg"
          alt="Library Background"
          fill
          className="object-cover "
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/80 to-white/70" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            <span className="text-primary-600">SSN</span> OpenRead
          </h1>
          
          {/* Subtitle */}
          <p className="text-base md:text-lg text-secondary-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            ศูนย์รวมหนังสือดิจิทัลคุณภาพสูง อ่านฟรี ไม่จำกัด
            <br />
            <span className="text-primary-600 font-medium">พัฒนาความรู้ เพิ่มพูนประสบการณ์การเรียนรู้</span>
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาหนังสือที่คุณสนใจ..."
                className="w-full px-6 py-4 text-base rounded-2xl border border-secondary-300 shadow-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200"
              />
              <Button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 bg-primary-500 hover:bg-primary-600 text-white rounded-xl"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}