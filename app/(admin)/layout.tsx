import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reddit Sanit",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <html >
        <body>

        {children}
        </body>
      </html>
  );
}
