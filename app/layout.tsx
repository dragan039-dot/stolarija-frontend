import type { Metadata } from "next";
import "./globals.css";



export const metadata = {
  title: "Stolarija App",
  description: "Aplikacija za ponude i radne liste",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Stolarija",
    statusBarStyle: "default",
  },
};

export const viewport = {
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      
    >
      <body>{children}</body>
    </html>
  );
}
