import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atharv Joshi — AI & Robotics Engineer",
  description:
    "Portfolio of Atharv Joshi — AI/ML student specializing in robotics, autonomous systems, computer vision, and intelligent backend development.",
  keywords: [
    "Atharv Joshi",
    "AI Engineer",
    "Machine Learning",
    "Robotics",
    "ROS2",
    "Computer Vision",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Atharv Joshi" }],
  openGraph: {
    title: "Atharv Joshi — AI & Robotics Engineer",
    description:
      "Building intelligent systems at the intersection of AI, robotics, and real-world impact.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharv Joshi — AI & Robotics Engineer",
    description:
      "Building intelligent systems at the intersection of AI, robotics, and real-world impact.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased noise">{children}</body>
    </html>
  );
}
