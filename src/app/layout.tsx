import React from "react";
import { Metadata, Viewport } from "next";
import "../styles/globals.scss"; 

export const metadata: Metadata = {
  title: "Samarth Patil - AI/ML Developer & Full-Stack Engineer",
  description: "B.Tech Computer Science student specializing in AI and Machine Learning. Skilled in Java, Python, and the MERN stack. Vice President of ACM Student Chapter.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
