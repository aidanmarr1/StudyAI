import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyAI - AI-Powered Learning Platform",
  description: "Study smarter with our AI-powered learning platform. Personalized tutoring, smart flashcards, and more.",
  keywords: "AI learning, study AI, flashcards, learning platform, education technology",
  icons: {
    icon: [
      {
        url: "https://img.freepik.com/free-vector/ai-technology-robot-cyborg-illustrations_24640-134419.jpg",
        sizes: "32x32",
        type: "image/jpg",
      },
      {
        url: "https://img.freepik.com/free-vector/ai-technology-robot-cyborg-illustrations_24640-134419.jpg",
        sizes: "16x16",
        type: "image/jpg",
      }
    ],
    apple: [
      {
        url: "https://img.freepik.com/free-vector/ai-technology-robot-cyborg-illustrations_24640-134419.jpg",
        sizes: "180x180",
        type: "image/jpg",
      }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="icon" 
          type="image/jpg" 
          sizes="32x32" 
          href="https://img.freepik.com/free-vector/ai-technology-robot-cyborg-illustrations_24640-134419.jpg" 
        />
        <link 
          rel="icon" 
          type="image/jpg" 
          sizes="16x16" 
          href="https://img.freepik.com/free-vector/ai-technology-robot-cyborg-illustrations_24640-134419.jpg" 
        />
        <link 
          rel="apple-touch-icon" 
          sizes="180x180" 
          href="https://img.freepik.com/free-vector/ai-technology-robot-cyborg-illustrations_24640-134419.jpg" 
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
