// components/CTA.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const elements = [badgeRef.current, titleRef.current, descriptionRef.current, buttonRef.current].filter(Boolean);
    // Reset to invisible before observing
    gsap.set(elements, { opacity: 0, y: 30 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Staggered reveal
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              clearProps: "transform"
            });
            // Floating badge after reveal
            setTimeout(() => {
              gsap.to(badgeRef.current, {
                y: -4,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
              });
            }, 1200);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(elements);
      gsap.set(elements, { clearProps: "all" });
    };
  }, [mounted, pathname]);

  if (!mounted) return <section ref={sectionRef} className="relative py-20 md:py-24 overflow-hidden" />;


  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 overflow-hidden"
    >
      {/* Gradient Background Container - Black/White theme */}
      <div className="absolute inset-0 flex justify-center items-start pointer-events-none">
        <div
          className="w-full max-w-6xl mx-auto h-full bg-black rounded-2xl md:rounded-3xl "
          style={{
            minHeight: '320px',
            maxHeight: '420px',
            width: 'calc(100% - 2rem)',
            margin: '0 auto'
          }}
        />
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gray-800/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gray-800/30 rounded-full filter blur-3xl"></div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto">
        <div className="px-4 md:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center bg-gray-800 text-gray-300 rounded-full px-4 py-2 mb-6 border border-gray-700"
          >
            <Sparkles className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-xs font-manrope tracking-wider">LIMITED SPOTS</span>
          </div>

          {/* Title */}
          <h2
            ref={titleRef}
            className="font-manrope font-bold text-3xl md:text-5xl lg:text-6xl text-white mb-4"
          >
            Ready to <span className="text-gray-400">Launch?</span>
          </h2>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="font-instrument text-gray-400 max-w-2xl mx-auto mb-8 text-lg"
          >
            Join 100+ founders who launched in 4 weeks. Let's build something great together.
          </p>

          {/* CTA Button */}
          <div ref={buttonRef} className="flex justify-center">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full text-sm font-medium overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-white/20 font-manrope"
            >
              <span className="relative z-10">Book Free Call</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}