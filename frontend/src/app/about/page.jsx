// app/about/page.jsx
"use client";
import HeroSection from "@/components/HeroSection";
import AboutUs from "@/components/AboutUs";
import CEOMessage from "@/components/CEOMessage";
import Team from '@/components/Team'
import Technologies from "@/components/Technologies";
// import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section for About */}
      <HeroSection
        title="ABOUT US"
        subtitle="Building a legacy of innovation and trust"
        imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
        overlayColor="bg-white"
      />

      <AboutUs />
      <CEOMessage />
      {/* <Team/> */}
      <Technologies />
      {/* <Testimonials/> */}
      <Blog />
    </main>
  );
}