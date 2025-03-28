import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyAI - Your AI-Powered Study Companion",
  description: "StudyAI helps you study smarter with AI-powered learning tools, personalized study guides, flashcards, and practice quizzes.",
  icons: [
    {
      rel: "icon",
      url: "https://img.freepik.com/free-vector/ai-technology-robot-cyborg-illustrations_24640-134419.jpg",
      sizes: "any"
    },
    {
      rel: "apple-touch-icon",
      url: "https://img.freepik.com/free-vector/ai-technology-robot-cyborg-illustrations_24640-134419.jpg",
      sizes: "180x180"
    }
  ]
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
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow overflow-hidden">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
