import ClientSessionProvider from '../providers/ClientSessionProvider';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* Wraps the entire app in NextAuth session context */}
        <ClientSessionProvider>{children}</ClientSessionProvider>
      </body>
    </html>
  );
}
