'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const isLoginPage = path === '/';
  return (
    <html lang="en">
      <body className="bg-gray-100">
      {!isLoginPage && (
        <nav className="flex items-center justify-between px-8 py-2 shadow-md border-b border-gray-300 safe-area-top">
          <h2 className="f16 font-bold text-theme_primary">Segam Admin</h2>
          <div className="flex space-x-6">
            <Link 
              href="/notice"
              className="f14 text-text_primary font-medium hover:text-theme_secondary transition-colors"
            >
              📢 공지사항
            </Link>
            <Link 
              href="/studyroom"
              className="f14 text-text_primary font-medium hover:text-theme_secondary transition-colors"
            >
              📚 스터디룸
            </Link>
          </div>
        </nav>
      )}
        <main>{children}</main>
      </body>
    </html>
  );
}
