// components/Hero.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const headingLinesRef = useRef([]);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);
  const imageRef = useRef(null);
  const [clipPath, setClipPath] = useState("");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const updateClipPath = () => {
      // ... same logic ...
      if (window.innerWidth < 768) {
        setClipPath("path('M 10,20 L 100,20 A 10,10 0,0,0 110,10 L 110,10 A 10,10 0,0,1 120,0 L 260,0 A 10,10 0,0,1 270,10 L 270,235 A 10,10 0,0,1 260,245 L 10,245 A 10,10 0,0,1 0,235 L 0,30 A 10,10 0,0,1 10,20 Z')");
      } else if (window.innerWidth < 1024) {
        setClipPath("path('M 15,30 L 150,30 A 15,15 0,0,0 165,15 L 165,15 A 15,15 0,0,1 180,0 L 390,0 A 15,15 0,0,1 405,15 L 405,352 A 15,15 0,0,1 390,367 L 15,367 A 15,15 0,0,1 0,352 L 0,45 A 15,15 0,0,1 15,30 Z')");
      } else {
        setClipPath("path('M 20,40 L 200,40 A 20,20 0,0,0 220,20 L 220,20 A 20,20 0,0,1 240,0 L 520,0 A 20,20 0,0,1 540,20 L 540,470 A 20,20 0,0,1 520,490 L 20,490 A 20,20 0,0,1 0,470 L 0,60 A 20,20 0,0,1 20,40 Z')");
      }
    };

    updateClipPath();
    window.addEventListener('resize', updateClipPath);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial fade in for the whole section
      tl.fromTo(heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );

      // Badge animation
      tl.fromTo(badgeRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );

      // Heading lines stagger animation
      tl.fromTo(headingLinesRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power4.out"
        },
        "-=0.4"
      );

      // Description animation
      tl.fromTo(descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Buttons container fade in
      tl.fromTo(buttonsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.4"
      );

      // Button 1 animation
      tl.fromTo(button1Ref.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.2"
      );

      // Button 2 animation
      tl.fromTo(button2Ref.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      );

      // Image animation with clip path reveal
      tl.fromTo(imageRef.current,
        {
          opacity: 0,
          scale: 0.95
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out"
        },
        "-=0.8"
      );

      // Subtle floating animation for image (only on desktop)
      if (window.innerWidth >= 1024) {
        gsap.to(imageRef.current, {
          y: 10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }
    });

    return () => {
      ctx.revert();
      window.removeEventListener('resize', updateClipPath);
    };
  }, [mounted]);

  if (!mounted) return <section ref={heroRef} className="relative bg-white sm:h-[100vh] h-auto overflow-hidden" />;

  return (
    <section ref={heroRef} className="relative bg-white sm:h-[100vh] h-auto overflow-hidden">
      {/* Background decorative elements - visible on all screens */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Desktop: side-by-side, Mobile: stacked with reduced gap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 items-center lg:items-start">

          {/* Left Content - responsive padding */}
          <div className="space-y-4 md:space-y-5 lg:space-y-6 py-12 md:py-8 order-1">
            {/* Badge - responsive sizing */}
            <div ref={badgeRef} className="inline-flex items-center bg-gray-100 rounded-full px-3 md:px-4 lg:px-4 py-1.5 md:py-2 lg:py-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2 lg:h-2 bg-gray-900 rounded-full mr-1.5 md:mr-2 lg:mr-2"></span>
              <span className="text-xs md:text-sm lg:text-sm font-manrope text-gray-700 tracking-wide">WELCOME TO RIDEN TECH</span>
            </div>

            {/* Main Heading - responsive text sizes */}
            <h1 className="font-manrope text-3xl font-bold md:text-4xl lg:text-6xl text-gray-900 leading-tight">
              <span ref={el => headingLinesRef.current[0] = el} className="block">Transform Your</span>
              <span ref={el => headingLinesRef.current[1] = el} className="block text-gray-700 ">Business with</span>
              <span ref={el => headingLinesRef.current[2] = el} className="block relative">
                Innovative Software
              </span>
            </h1>

            {/* Description - responsive text */}
            <p ref={descriptionRef} className="font-instrument text-base md:text-lg lg:text-lg text-gray-600 max-w-lg leading-relaxed">
              We craft cutting-edge digital solutions that drive growth,
              enhance efficiency, and transform complex challenges into
              seamless experiences.
            </p>

            {/* CTA Buttons - responsive sizing */}
            <div ref={buttonsRef} className="flex flex-wrap gap-3 md:gap-4 lg:gap-4">
              <Link
                ref={button1Ref}
                href="/contact"
                className="group inline-flex items-center space-x-2 bg-gray-900 text-white px-5 md:px-8 lg:px-8 py-2.5 md:py-4 lg:py-4 rounded-lg text-xs md:text-sm lg:text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20 font-manrope"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-4 lg:h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                ref={button2Ref}
                href="/services"
                className="group inline-flex items-center space-x-2 bg-white text-gray-900 px-5 md:px-8 lg:px-8 py-2.5 md:py-4 lg:py-4 rounded-lg text-xs md:text-sm lg:text-sm font-medium border border-gray-200 hover:border-gray-900 transition-all duration-300 hover:shadow-lg font-manrope"
              >
                <span>View Services</span>
              </Link>
            </div>
          </div>

          {/* Right Content - Image always centered */}
          <div className="flex justify-center items-center py-6 md:py-8  order-2">
            <div className="relative flex justify-center items-center w-full">
              {/* Image container with auto margins for centering */}
              <div className="w-full max-w-[320px] sm:max-w-[450px] md:max-w-[550px] lg:h-[700px] lg:w-[800px] aspect-[8/7] lg:aspect-auto mx-auto">
                {/* Main Image Container with Responsive Clip Path */}
                <div
                  ref={imageRef}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    clipPath: clipPath,
                  }}
                >
                  {/* IT-Related Image */}
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop')"
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;