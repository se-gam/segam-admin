import Tabbar from '@/components/Tabbar';

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <>
      <Tabbar/>
      <main>{children}</main>
    </>
  );
}
