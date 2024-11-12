export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-900">
      <div className="w-full max-w-md bg-black/30 p-8 rounded-xl backdrop-blur-sm border border-white/10">
        {children}
      </div>
    </div>
  );
}
