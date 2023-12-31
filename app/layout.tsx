import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const noto = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "catfederation",
  description: "Cats federated",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={noto.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
