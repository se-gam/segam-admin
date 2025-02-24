import '@/app/globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}