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
           className="relative flex min-h-[700px] items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden"
       >
           {/* Enhanced floating control bar */}
           <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 rounded-2xl bg-white/98 backdrop-blur-lg p-4 shadow-2xl border border-gray-300">
               {/* Page navigation - move to front */}
               <div className="flex items-center gap-2">
                   <button
                       onClick={prevPage}
                       disabled={pageNumber <= 1}
                       className="rounded-lg p-2 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed text-blue-600 hover:text-blue-700 transition-all duration-200 border border-blue-200 hover:border-blue-300"
                   >
                       <ChevronLeft className="h-4 w-4" />
                   </button>
                   <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                       <span className="text-sm font-bold text-blue-800">
                           {pageNumber}
                       </span>
                       <span className="text-xs text-blue-600">/</span>
                       <span className="text-sm font-medium text-blue-700">
                           {numPages || "-"}
                       </span>
                   </div>
                   <button
                       onClick={nextPage}
                       disabled={pageNumber >= (numPages || 1)}
                       className="rounded-lg p-2 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed text-blue-600 hover:text-blue-700 transition-all duration-200 border border-blue-200 hover:border-blue-300"
                   >
                       <ChevronRight className="h-4 w-4" />
                   </button>
               </div>

               <div className="mx-2 h-8 w-px bg-gray-300" />

               {/* Enhanced zoom controls */}
               <div className="flex items-center gap-2">
                   <span className="text-xs font-medium text-gray-600 mr-1">ซูม:</span>
                   <button onClick={() => setZoomLevel(0.6)} 
                       className={`text-xs rounded-lg px-3 py-2 font-semibold transition-all duration-200 border ${
                           scale === 0.6 
                               ? 'bg-green-500 text-white border-green-600 shadow-lg' 
                               : 'bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 border-gray-300 hover:border-green-400'
                       }`}>
                       60%
                   </button>
                   <button onClick={() => setZoomLevel(1)} 
                       className={`text-xs rounded-lg px-3 py-2 font-semibold transition-all duration-200 border ${
                           scale === 1 
                               ? 'bg-green-500 text-white border-green-600 shadow-lg' 
                               : 'bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 border-gray-300 hover:border-green-400'
                       }`}>
                       100%
                   </button>
                   <button onClick={() => setZoomLevel(1.5)} 
                       className={`text-xs rounded-lg px-3 py-2 font-semibold transition-all duration-200 border ${
                           scale === 1.5 
                               ? 'bg-green-500 text-white border-green-600 shadow-lg' 
                               : 'bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 border-gray-300 hover:border-green-400'
                       }`}>
                       150%
                   </button>
                   <button onClick={() => setZoomLevel(2)} 
                       className={`text-xs rounded-lg px-3 py-2 font-semibold transition-all duration-200 border ${
                           scale === 2 
                               ? 'bg-green-500 text-white border-green-600 shadow-lg' 
                               : 'bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 border-gray-300 hover:border-green-400'
                       }`}>
                       200%
                   </button>
               </div>

               <div className="mx-2 h-8 w-px bg-gray-300" />

               {/* Quick action buttons */}
               <div className="flex items-center gap-2">
                   <button
                       onClick={toggleFullScreen}
                       className="rounded-lg p-2 hover:bg-purple-50 text-purple-600 hover:text-purple-700 transition-all duration-200 border border-purple-200 hover:border-purple-300"
                       title="เต็มจอ (F11)"
                   >
                       <Maximize className="h-4 w-4" />
                   </button>
                   <Link
                       href={pdfUrl}
                       target="_blank"
                       className="rounded-lg p-2 hover:bg-green-50 text-green-600 hover:text-green-700 transition-all duration-200 border border-green-200 hover:border-green-300"
                       title="เปิดในแท็บใหม่"
                   >
                       <FileSearch className="h-4 w-4" />
                   </Link>
               </div>
           </div>

           {/* Enhanced PDF display area */}
           <div className="max-h-full max-w-full overflow-auto bg-white rounded-xl shadow-inner p-6 m-4">
               <div className="flex justify-center">
                   <Document
                       file={pdfUrl}
                       onLoadSuccess={onDocumentLoadSuccess}
                       onLoadError={onDocumentLoadError}
                       loading={<LoadingSpinner />}
                       error={<ErrorDisplay />}
                   >
                       <div className="shadow-2xl rounded-lg overflow-hidden border border-gray-300">
                           <Page
                               pageNumber={pageNumber}
                               scale={scale}
                               renderAnnotationLayer={false}
                               renderTextLayer={false}
                               loading={<LoadingSpinner />}
                           />
                       </div>
                   </Document>
               </div>
           </div>

           {/* Reading progress indicator */}
           {numPages && (
               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                   <div className="bg-black/80 text-white px-4 py-2 rounded-full text-xs font-medium">
                       หน้า {pageNumber} จาก {numPages} ({Math.round((pageNumber / numPages) * 100)}%)
                   </div>
               </div>
           )}
       </div>
   );
}