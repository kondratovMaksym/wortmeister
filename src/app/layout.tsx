import type { Metadata } from "next";
import "@/styles/normalize.css";
import { Quicksand } from "next/font/google";

export const metadata: Metadata = {
  title: "Wortmeister",
  description: "Created by Maksym Kondratov",
};

const roboto = Quicksand({
  weight: "500",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
