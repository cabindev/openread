"use client";

import { ChevronLeft, ChevronRight, FileSearch, Maximize } from "lucide-react";
import { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Link from "next/link";
import screenfull from "screenfull";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
   pdfUrl: string;
}

function LoadingSpinner() {
    return (
        <div className="flex h-[600px] items-center justify-center">
            <div className="text-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />
                <p className="mt-4 text-gray-600">กำลังโหลด PDF...</p>
            </div>
        </div>
    );
}

function ErrorDisplay() {
    return (
        <div className="flex h-[600px] items-center justify-center">
            <div className="text-center">
                <p className="text-lg font-medium text-red-600">ไม่สามารถโหลดไฟล์ PDF ได้</p>
                <p className="mt-2 text-gray-600">โปรดลองใหม่อีกครั้ง</p>
            </div>
        </div>
    );
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
   const [numPages, setNumPages] = useState<number | null>(null);
   const [pageNumber, setPageNumber] = useState<number>(1);
   const [scale, setScale] = useState<number>(1);
   const [isLoading, setIsLoading] = useState(true);
   const [hasError, setHasError] = useState(false);
   const containerRef = useRef<HTMLDivElement>(null);

   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
       setNumPages(numPages);
       setIsLoading(false);
       if (window.innerWidth < 768) {
           setScale(0.6);
       }
   };

   const onDocumentLoadError = (error: Error) => {
       console.error('PDF load error:', error);
       setHasError(true);
       setIsLoading(false);
   };

   const setZoomLevel = (level: number) => setScale(level);
   const prevPage = () => setPageNumber((p) => Math.max(p - 1, 1));
   const nextPage = () => setPageNumber((p) => Math.min(p + 1, numPages || p));

   const toggleFullScreen = () => {
       if (containerRef.current && screenfull.isEnabled) {
           screenfull.toggle(containerRef.current);
       }
   };

   if (hasError) return <ErrorDisplay />;

   return (
       <div
           ref={containerRef}
           className="relative flex min-h-[600px] items-center justify-center rounded-xl border border-green-100 bg-gradient-to-br from-gray-50 to-green-50/30 overflow-hidden"
       >
           {/* Enhanced control bar */}
           <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-xl bg-white/95 backdrop-blur-md p-3 shadow-lg border border-green-100">
               {/* Zoom controls */}
               <div className="flex items-center gap-1 px-2">
                   <span className="text-xs text-gray-500 mr-2">ซูม:</span>
                   <button onClick={() => setZoomLevel(0.5)} 
                       className={`text-xs rounded-lg px-3 py-1.5 font-medium transition-all duration-200 ${
                           scale === 0.5 
                               ? 'bg-green-100 text-green-700 border border-green-200' 
                               : 'hover:bg-green-50 text-gray-600 hover:text-green-600'
                       }`}>
                       50%
                   </button>
                   <button onClick={() => setZoomLevel(1)} 
                       className={`text-xs rounded-lg px-3 py-1.5 font-medium transition-all duration-200 ${
                           scale === 1 
                               ? 'bg-green-100 text-green-700 border border-green-200' 
                               : 'hover:bg-green-50 text-gray-600 hover:text-green-600'
                       }`}>
                       100%
                   </button>
                   <button onClick={() => setZoomLevel(1.7)} 
                       className={`text-xs rounded-lg px-3 py-1.5 font-medium transition-all duration-200 ${
                           scale === 1.7 
                               ? 'bg-green-100 text-green-700 border border-green-200' 
                               : 'hover:bg-green-50 text-gray-600 hover:text-green-600'
                       }`}>
                       170%
                   </button>
               </div>

               <div className="mx-2 h-6 w-px bg-green-200" />

               {/* Page navigation */}
               <div className="flex items-center gap-1">
                   <button
                       onClick={prevPage}
                       disabled={pageNumber <= 1}
                       className="rounded-lg p-2 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed text-green-600 hover:text-green-700 transition-all duration-200"
                   >
                       <ChevronLeft className="h-4 w-4" />
                   </button>
                   <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-lg border border-green-100">
                       <span className="text-sm font-medium text-green-800">
                           {pageNumber}
                       </span>
                       <span className="text-xs text-green-600">/</span>
                       <span className="text-sm text-green-600">
                           {numPages || "-"}
                       </span>
                   </div>
                   <button
                       onClick={nextPage}
                       disabled={pageNumber >= (numPages || 1)}
                       className="rounded-lg p-2 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed text-green-600 hover:text-green-700 transition-all duration-200"
                   >
                       <ChevronRight className="h-4 w-4" />
                   </button>
               </div>

               <div className="mx-2 h-6 w-px bg-green-200" />

               {/* Additional controls */}
               <div className="flex items-center gap-1">
                   <button
                       onClick={toggleFullScreen}
                       className="rounded-lg p-2 hover:bg-green-50 text-green-600 hover:text-green-700 transition-all duration-200"
                       title="เต็มจอ"
                   >
                       <Maximize className="h-4 w-4" />
                   </button>
                   <Link
                       href={pdfUrl}
                       target="_blank"
                       className="rounded-lg p-2 hover:bg-green-50 text-green-600 hover:text-green-700 transition-all duration-200"
                       title="เปิดในแท็บใหม่"
                   >
                       <FileSearch className="h-4 w-4" />
                   </Link>
               </div>
           </div>

           <div className="max-h-full max-w-full overflow-auto">
               <Document
                   file={pdfUrl}
                   onLoadSuccess={onDocumentLoadSuccess}
                   onLoadError={onDocumentLoadError}
                   loading={<LoadingSpinner />}
                   error={<ErrorDisplay />}
               >
                   <Page
                       pageNumber={pageNumber}
                       scale={scale}
                       renderAnnotationLayer={false}
                       renderTextLayer={false}
                       loading={<LoadingSpinner />}
                   />
               </Document>
           </div>
       </div>
   );
}