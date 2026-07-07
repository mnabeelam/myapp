import { PlatformProvider, PlatformShell } from "@/components/platform";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlatformProvider>
      <PlatformShell>{children}</PlatformShell>
    </PlatformProvider>
  );
}
