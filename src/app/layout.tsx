import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import AIChatWidget from "@/components/AIChatWidget";
import { Metadata } from "next";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

export const metadata: Metadata = {
 title: "PawMatchAI - Find Your Perfect Pet",
 description: "AI-powered pet adoption platform helping you find your perfect companion",
 icons: {
 icon: "/logo.png",
 shortcut: "/logo.png",
 apple: "/logo.png",
 },
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html
 lang="en"
 className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
 >
 <body className="min-h-full flex flex-col text-fluid-body text-slate-600">
 <Providers>
 {children}
 <AIChatWidget />
 </Providers>
 </body>
 </html>
 );
}
