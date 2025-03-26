import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from '../components/ThemeProvider';
import { AuthProvider } from '../utils/AuthContext';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "StudyAI - Your Intelligent Study Companion",
  description: "StudyAI helps students learn smarter with personalized AI-powered study tools, flashcards, summaries, and knowledge testing.",
  keywords: "AI study tool, flashcards, learning assistant, study help, education AI",
  authors: [{ name: "StudyAI Team" }],
  openGraph: {
    title: "StudyAI - Study Smarter, Not Harder",
    description: "AI-powered study companion that helps you master any subject with personalized learning materials.",
    images: ['/og-image.png'],
  },
  metadataBase: new URL('http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
