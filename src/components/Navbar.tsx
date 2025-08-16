"use client";

import Link from "next/link";
import Wrapper from "./Wrapper";
import { useState } from "react";
import { cn, logout } from "~/libs";
import { SessionData } from "~/constants";
import { 
   ArrowRightOnRectangleIcon, 
   UserPlusIcon,
   Bars2Icon,
   ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/solid";

interface NavbarProps {
  session: SessionData;
}

export default function Navbar({ session }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  return (
      <nav className="relative bg-white/95 backdrop-blur-md shadow-sm border-b border-primary-100">
          <Wrapper className="flex flex-wrap items-center justify-between py-3">
              <Link
                  href="/"
                  className="flex items-center gap-2 text-xl font-bold text-primary-800 hover:text-primary-600 transition-all duration-300 group"
              >
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                      </svg>
                  </div>
                  <div className="flex flex-col">
                      <span className="text-lg font-bold tracking-tight">
                          <span className="text-primary-600">SSN</span>
                          <span className="text-secondary-800 ml-1">OpenRead</span>
                      </span>
                      <span className="text-xs text-secondary-500 font-normal -mt-1">Digital Library</span>
                  </div>
              </Link>
              
              <button
                  type="button"
                  title="เมนู"
                  className="rounded-lg p-2 text-secondary-600 hover:bg-primary-50 hover:text-primary-600 transition-colors lg:hidden"
                  onClick={toggleMenu}
              >
                  <Bars2Icon className="size-6" />
              </button>

              <div
                  className={cn(
                      "w-full lg:flex lg:w-auto lg:items-center",
                      {
                          block: isMenuOpen,
                          hidden: !isMenuOpen,
                      }
                  )}
              >
                  <div className="mt-4 flex flex-col items-start gap-4 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                      <Link
                          href="/"
                          className="text-sm text-secondary-600 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
                          onClick={() => setIsMenuOpen(false)}
                      >
                          หนังสือ
                      </Link>

                      {session.isManager && (
                          <>
                              <Link
                                  href="/manager/books/"
                                  className="text-sm text-secondary-600 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
                                  onClick={() => setIsMenuOpen(false)}
                              >
                                  จัดการหนังสือ
                              </Link>
                              <Link
                                  href="/manager/members/"
                                  className="text-sm text-secondary-600 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-primary-50"
                                  onClick={() => setIsMenuOpen(false)}
                              >
                                  จัดการสมาชิก
                              </Link>
                          </>
                      )}

                      <div className="flex items-center gap-2 lg:border-l lg:border-secondary-200 lg:pl-6">
                          {!session.isLoggedIn ? (
                              <>
                                  <Link
                                      href="/auth/sign-up/"
                                      onClick={() => setIsMenuOpen(false)}
                                  >
                                      <button
                                          type="button"
                                          className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                                          title="สมัครสมาชิก"
                                      >
                                          <UserPlusIcon className="size-5" />
                                      </button>
                                  </Link>
                                  <Link
                                      href="/auth/sign-in"
                                      onClick={() => setIsMenuOpen(false)}
                                  >
                                      <button
                                          type="button"
                                          className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                                          title="เข้าสู่ระบบ"
                                      >
                                          <ArrowRightOnRectangleIcon className="size-5" />
                                      </button>
                                  </Link>
                              </>
                          ) : (
                              <div className="flex items-center gap-3">
                                  {session.name && (
                                      <span className="text-sm text-secondary-700 font-medium hidden lg:block">
                                          {session.name}
                                      </span>
                                  )}
                                  <button
                                      type="button"
                                      onClick={() => logout()}
                                      className="p-2 text-secondary-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                      title="ออกจากระบบ"
                                  >
                                      <ArrowLeftOnRectangleIcon className="size-5" />
                                  </button>
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </Wrapper>
      </nav>
  );
}