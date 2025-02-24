import Layout from '@/app/layout';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <main>{children}</main>
    </Layout>
  );
}