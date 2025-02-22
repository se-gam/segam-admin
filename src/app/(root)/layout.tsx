import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
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
        <main>{children}</main>
      </body>
    </html>
  );
}
