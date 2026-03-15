// components/HeroSection.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection({
  title = "WHAT WE DO",
  subtitle = "We blend innovative design, strategic insights, and cutting-edge technology to build digital experiences that drive growth, engagement, and lasting impact for your business.",
  imageSrc = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  overlayColor = "bg-white"
}) {
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const heroContainerRef = useRef(null);

  const heroImageRefTop = useRef(null);
  const heroImageRefBottom = useRef(null);

  useEffect(() => {
    setMounted(true);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timeoutId = setTimeout(() => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        // Header animations
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        }

        if (subtitleRef.current) {
          gsap.fromTo(
            subtitleRef.current,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        }

        if (buttonRef.current) {
          gsap.fromTo(
            buttonRef.current,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        }

        // Hero overlays animation
        if (
          heroImageRefTop.current &&
          heroImageRefBottom.current &&
          heroContainerRef.current
        ) {
          // Top and bottom overlays fully cover image
          gsap.set(heroImageRefTop.current, { top: 0, height: "100%" });
          gsap.set(heroImageRefBottom.current, { bottom: 0, height: "100%" });

          // Slow reveal: top overlay slides up
          gsap.to(heroImageRefTop.current, {
            top: "-100%", // slides fully up
            ease: "power2.out",
            scrollTrigger: {
              trigger: heroContainerRef.current,
              start: "top bottom",
              end: "bottom top", // longer scroll distance
              scrub: 2,
            },
          });

          // Slow reveal: bottom overlay slides down
          gsap.to(heroImageRefBottom.current, {
            bottom: "-100%", // slides fully down
            ease: "power2.out",
            scrollTrigger: {
              trigger: heroContainerRef.current,
              start: "top bottom",
              end: "bottom top", // longer scroll distance
              scrub: 2,
            },
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [mounted]);


  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 px-6 md:px-20 overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <div className="relative mb-6 flex justify-center">
          <h1
            ref={titleRef}
            className="font-manrope text-[13vw] md:text-[13vw] lg:text-[13vw] font-black uppercase text-gray-900 leading-[0.85] tracking-tight"
          >
            {title}
          </h1>
        </div>
        <p
          ref={subtitleRef}
          className="font-manrope text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          {subtitle}
        </p>

        <div className="mt-10 flex justify-center opacity-0" ref={buttonRef}>
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 px-10 py-4 bg-gray-900 text-white rounded-full overflow-hidden transition-transform duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10 font-manrope font-semibold tracking-wide">
              Get in Touch
            </span>
            <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <svg
              className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div
        ref={heroContainerRef}
        className="w-full max-w-7xl h-[85vh]  relative overflow-hidden mx-auto flex justify-center items-center"
      >
        {/* Full image */}
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover w-full h-full mx-auto"
          priority
        />

        {/* Top overlay */}
        <div
          ref={heroImageRefTop}
          className="absolute left-0 w-full bg-white"
        ></div>


        {/* Bottom overlay */}
        <div
          ref={heroImageRefBottom}
          className="absolute left-0 w-full bg-white"
        ></div>
      </div>
    </section>
  );
}