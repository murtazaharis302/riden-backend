// app/services/page.jsx
"use client";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import Blog from "@/components/Blog";
import Technologies from "@/components/Technologies";
import WhyChooseUs from "@/components/WhyChooseUs";
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection 
        title="WHAT WE DO"
        subtitle="Transforming ideas into exceptional digital experiences"
        imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
        overlayColor="bg-white"
      />
      
     <Services/>
     <WhyChooseUs/>
     <Technologies/>
       <Blog/>
    </main>
  );
}