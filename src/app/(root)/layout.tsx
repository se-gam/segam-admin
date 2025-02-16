export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen flex-col justify-between overflow-hidden">
      <div>{children}</div>
    </div>
  );
}
