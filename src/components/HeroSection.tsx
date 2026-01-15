'use client';

import { Search, FileText } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { Draft } from "@/lib/schema";

interface HeroSectionProps {
  drafts?: Draft[];
}

export const HeroSection = ({ drafts = [] }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Draft[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search logic
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = drafts.filter(draft =>
      draft.name.toLowerCase().includes(query) ||
      draft.category?.toLowerCase().includes(query) ||
      draft.description?.toLowerCase().includes(query)
    ).slice(0, 8); // Limit to 8 results

    setSearchResults(results);
    setShowDropdown(results.length > 0);
  }, [searchQuery, drafts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Optionally keep the navigation as fallback
    // if (searchQuery.trim()) {
    //   router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    // }
  };

  return (
    <section className="relative py-20 md:py-32 ">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 -z-10">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #9ca3af 1px, transparent 1px),
              linear-gradient(to bottom, #9ca3af 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 animate-fade-in tracking-tight">
            Generate Legal Drafts within 5 Minutes
          </h1>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto animate-slide-up relative" style={{ animationDelay: "0.2s" }}>
            <div className="relative" ref={dropdownRef}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <input
                type="text"
                placeholder="Search Agreements"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) setShowDropdown(true);
                }}
                className="w-full px-4 py-4 pl-12 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-base"
              />

              {/* Search Results Dropdown */}
              {showDropdown && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[50vh] overflow-hidden z-[999]">
                  <div
                    className="overflow-y-auto max-h-[50vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  >
                    {searchResults.map((draft) => (
                      <Link
                        key={draft.href}
                        href={draft.href}
                        onClick={() => {
                          setShowDropdown(false);
                          setSearchQuery("");
                        }}
                        className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 group"
                      >
                        <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {draft.name}
                          </h3>
                          {draft.category && (
                            <p className="text-xs text-gray-500 mb-1">
                              {draft.category}
                            </p>
                          )}
                          {draft.description && (
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {draft.description}
                            </p>
                          )}
                          <p className="text-sm font-semibold text-blue-600 mt-1">
                            {draft.price.label || `₹${draft.price.amount}`}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results Message */}
              {showDropdown && searchQuery.trim().length >= 2 && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-[999]">
                  <p className="text-gray-500 text-center">
                    No agreements found for "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
