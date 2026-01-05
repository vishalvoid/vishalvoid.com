import "./globals.css";
import { Space_Grotesk } from "next/font/google";



const font = Space_Grotesk({
  subsets : ["latin"],
  variable: "--font-space-grotesk",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
