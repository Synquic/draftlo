'use client';

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-[hsl(220,30%,12%)] text-gray-300 pt-14 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-sm">D</div>
              <span className="text-white font-bold text-lg">DRAFTLO</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Generate professional, standardised legal drafts within 5 minutes. Lawyer-drafted agreements with just a click of a button.
            </p>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">About Us</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/rental-agreements" className="hover:text-white transition-colors">Rental Agreements</Link></li>
              <li><Link href="/category/employment-contracts" className="hover:text-white transition-colors">Employment Contracts</Link></li>
              <li><Link href="/category/business-agreements" className="hover:text-white transition-colors">Business Agreements</Link></li>
              <li><Link href="/category" className="hover:text-white transition-colors">All Categories</Link></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal &amp; Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms and Conditions</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
            </ul>
            <div className="mt-4 text-sm space-y-1">
              <p>Phone: <a href="tel:+918088047284" className="hover:text-white transition-colors">+91 80880 47284</a></p>
              <p>Email: <a href="mailto:support@draftlo.com" className="hover:text-white transition-colors">support@draftlo.com</a></p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Draftlo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
