import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { OfflineSyncProvider } from "@/hooks/use-offline-sync";

export const metadata: Metadata = {
  title: "RoadWatch",
  description: "AI-powered civic road intelligence and transparency platform.",
  manifest: "/manifest.json"
};

export const viewport: Viewport = {
  themeColor: "#158f88",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <OfflineSyncProvider>
          <AppShell>{children}</AppShell>
        </OfflineSyncProvider>
      </body>
    </html>
  );
}
