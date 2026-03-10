// app/layout.js
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Manrope:wght@200..800&family=Marcellus&display=swap" rel="stylesheet" />
      </head>
      <body className="font-instrument antialiased">
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}