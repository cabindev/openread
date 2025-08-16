import SignInForm from "~/components/auth/SignInForm";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function page() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/img/takhone.jpg"
                    alt="Library Background"
                    fill
                    className="object-cover opacity-5"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/90 via-emerald-50/95 to-teal-50/90" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Back Button */}
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium mb-8 transition-colors"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    กลับหน้าหลัก
                </Link>

                {/* Main Card */}
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-green-100 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            เข้าสู่ระบบ
                        </h1>
                        <p className="text-gray-600">
                            เข้าสู่ระบบเพื่อเข้าถึงหนังสือดิจิทัล
                        </p>
                    </div>

                    {/* Form */}
                    <SignInForm />

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 text-sm">
                            ยังไม่มีบัญชี?{" "}
                            <Link 
                                href="/auth/sign-up" 
                                className="text-green-600 hover:text-green-700 font-medium transition-colors"
                            >
                                สมัครสมาชิก
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm">
                        © 2025 SSN OpenRead - ศูนย์รวมหนังสือดิจิทัลคุณภาพสูง
                    </p>
                </div>
            </div>
        </div>
    );
}
