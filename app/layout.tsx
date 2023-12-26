import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";

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
      <head>
        <ThemeModeScript />
      </head>
      <body className={noto.className}>{children}</body>
    </html>
  );
}
