'use client';

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ShoppingBag, Menu, X } from "lucide-react";
import type { AppData } from "@/lib/api";

interface NavbarProps {
  data: AppData;
}

export const Navbar = ({ data }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[hsl(220,30%,12%)] border-b border-white/10">
      {/* removed extra horizontal padding to pull menu closer to logo */}
      <div className="container mx-auto px-2">
        <div className="flex items-center h-20">

          {/* Logo (hard reload) */}
          <a href="/" className="flex items-center mr-6">
            <img
              src="/logoimage.png"
              alt="Draftlo Logo"
              className="h-14 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 flex-1">
            {data?.menu.map((item) => (
              <div key={item.name} className="relative group">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="
                      flex items-center gap-1
                      px-4 py-2
                      text-base font-semibold
                      text-white
                    "
                  >
                    {item.name}
                    {item.items && <ChevronDown className="w-4 h-4 mt-0.5" />}
                  </Link>
                ) : (
                  <div
                    className="
                      flex items-center gap-1
                      px-4 py-2
                      text-base font-semibold
                      text-white
                      cursor-pointer
                    "
                  >
                    {item.name}
                    {item.items && <ChevronDown className="w-4 h-4 mt-0.5" />}
                  </div>
                )}

                {item.items && (
                  <div
                    className="
                      absolute left-0 top-full mt-2 w-52
                      bg-[hsl(220,30%,15%)]
                      border border-white/10
                      rounded-xl shadow-xl
                      opacity-0 invisible
                      group-hover:opacity-100 group-hover:visible
                    "
                  >
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="
                          block px-4 py-3
                          text-sm font-medium
                          text-white/80
                          hover:bg-white/10
                          hover:text-white
                        "
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-5">
            {/* Shopping bag WITHOUT count */}
            <button className="p-2 text-white">
              <ShoppingBag className="w-6 h-6" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/10">
            {data?.menu.map((item) => (
              <div key={item.name} className="mb-2">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="
                      block px-4 py-3
                      text-base font-semibold
                      text-white
                      hover:bg-white/10
                      rounded-lg
                    "
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <div
                    className="
                      block px-4 py-3
                      text-base font-semibold
                      text-white
                      hover:bg-white/10
                      rounded-lg
                    "
                  >
                    {item.name}
                  </div>
                )}

                {item.items && (
                  <div className="pl-6">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="
                          block px-4 py-2
                          text-sm
                          text-white/70
                          hover:text-white
                        "
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
