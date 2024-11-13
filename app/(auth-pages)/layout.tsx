export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md bg-card/30 p-8 rounded-xl backdrop-blur-sm border border-border">
        {children}
      </div>
    </div>
  );
}
