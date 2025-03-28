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
      { url: '/favicon.ico' },
      { url: 'https://i.ibb.co/x8csBSph/robot.png', type: 'image/png' }
    ],
    apple: [
      { url: 'https://i.ibb.co/x8csBSph/robot.png', type: 'image/png' }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
