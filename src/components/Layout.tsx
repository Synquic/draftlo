'use client';

import NewNavbar from "./NewNavbar";
import { Footer } from "./Footer";
import type { AppData } from "@/lib/api";

interface LayoutProps {
  children: React.ReactNode;
  data: AppData;
}

export const Layout = ({ children, data }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NewNavbar data={data} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
