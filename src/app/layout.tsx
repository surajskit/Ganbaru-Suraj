//src/app/layout.ts
import "./globals.css";

export const metadata = {
  title: "Ganbaru Daily",
  description: "Japanese Learning Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app-body">
        {children}
      </body>
    </html>
  );
}
