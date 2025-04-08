import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyAI - Your AI-Powered Study Companion",
  description:
    "StudyAI helps students learn more effectively with AI-powered flashcards, quiz generation, and personalized study plans",
  keywords: ["AI", "education", "studying", "learning", "flashcards", "quiz"],
  icons: {
    icon: [
      {
        url: "/images/robot.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/robot.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: {
      url: "/images/robot.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: [
      {
        rel: "icon",
        url: "/images/robot.png",
      },
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
          type="image/png"
          sizes="32x32"
          href="/images/robot.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/robot.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/robot.png"
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
