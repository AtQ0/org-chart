import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <header>{/* Add your navigation, logo, etc. here */}</header>
        <main>{children}</main>
        <footer>{/* Add footer content here */}</footer>
      </body>
    </html>
  );
}
