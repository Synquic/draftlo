'use client';

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function FooterColumn() {
  return (
    <footer className="bg-[#1a202c] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/logoimage.png"
                alt="Draftlo"
                className="h-20 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Generate professional legal drafts within 5 minutes. Leverage the power of AI to create customized legal agreements with just a click of a button.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/draftlo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/draftlo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/draftlo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/rental-agreement" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Rental Agreements
                </Link>
              </li>
              <li>
                <Link href="/category/employment-contracts" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Employment Contracts
                </Link>
              </li>
              <li>
                <Link href="/category/business-agreements" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Business Agreements
                </Link>
              </li>
              <li>
                <Link href="/category" className="text-gray-400 hover:text-white transition-colors text-sm">
                  All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Contact</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Shipping Policy
                </Link>
              </li>
            </ul>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">
                <strong className="text-white">Phone:</strong> +91 80880 47284
              </p>
              <p className="text-sm text-gray-400">
                <strong className="text-white">Email:</strong> support@draftlo.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-400">
            © 2025 Draftlo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
