import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Eastern Spa Rio Grand",
  description:
    "Eastern Spa Rio Grande provides high quality Chinese massage therapy in Rio Grande, Cape May County, Cape May, NJ. Our expert therapists are trained in numerous therapies including Swedish and deep tissue massages, reflexology, and more.",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
