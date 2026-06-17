import type { Metadata } from "next";
import "./globals.css";



export const metadata = {
  title: "PVC Kalkulator App",
  description: "Aplikacija za Ponude i Radne liste kod ALU i PVC stolarije",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "PVC Kalkulator",
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
