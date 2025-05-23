import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header/Header";
import { Sidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SanityLive } from "@/sanity/lib/live";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reddit",
  description: "Reddit clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
       <SidebarProvider>
        <AppSidebar />
        
        <SidebarInset>
        <Header />
        <div className="flex flex-col">

        {children}
        </div>
        </SidebarInset>
       </SidebarProvider>
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
   
  );
}
