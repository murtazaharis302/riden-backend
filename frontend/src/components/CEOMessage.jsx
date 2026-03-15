// components/CEOMessage.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CEOMessage() {
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const messageRef = useRef(null);
  const quoteRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      // Create a timeline with scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Quote mark animation (from left)
      tl.fromTo(quoteRef.current,
        {
          x: -100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 0.1,
          duration: 1,
          ease: "power3.out"
        }
      );

      // Name animation (from left)
      tl.fromTo(nameRef.current,
        {
          x: -100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out"
        },
        "-=0.7"
      );

      // Title animation (from left)
      tl.fromTo(titleRef.current,
        {
          x: -100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        },
        "-=0.6"
      );

      // Message paragraphs animation (from left with stagger)
      const paragraphs = messageRef.current?.children;
      if (paragraphs) {
        tl.fromTo(paragraphs,
          {
            x: -100,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
          },
          "-=0.5"
        );
      }

      // Image animation (from right)
      tl.fromTo(imageRef.current,
        {
          x: 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out"
        },
        "-=0.8"
      );

      // Continuous floating animation for image (like in About component)
      gsap.to(imageRef.current, {
        y: 8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.5
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill(true);
      });
    };
  }, [mounted]);

  if (!mounted) return <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden" />;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Top Section */}
      <div className="text-center mb-12">

        {/* Badge */}
        <div

          className="inline-flex items-center bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full px-5 py-2.5 mb-6 shadow-lg"
        >
          {/* <Zap className="w-4 h-4 mr-2 text-gray-100" /> */}
          <span className="text-sm font-manrope font-medium tracking-wide">
            ABOUT CEO
          </span>
        </div>

        {/* Titles */}
        <h2

          className="font-manrope font-bold text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-2"
        >
          Vision for Digital


          <span className="text-gray-400 "> Growth</span>
        </h2>

        {/* Subheading */}
        <p

          className="font-manrope text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          We combine strategy, design, and technology to build impactful digital experiences that help businesses grow.  </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Message (slides from left) */}
          <div ref={textContentRef} className="relative">
            {/* Quote mark */}
            <div
              ref={quoteRef}
              className="absolute -top-10 -left-10 text-9xl font-serif text-gray-200 select-none"
            >
              &quot;
            </div>

            {/* Name */}
            <h2
              ref={nameRef}
              className="font-marcellus text-4xl md:text-5xl text-gray-900 mb-2"
            >
              Johnathan Reynolds
            </h2>

            {/* Title */}
            <p
              ref={titleRef}
              className="font-manrope text-lg text-gray-600 mb-6"
            >
              Founder & Chief Executive Officer
            </p>

            {/* Message paragraphs */}
            <div
              ref={messageRef}
              className="space-y-6"
            >
              <p className="font-manrope text-xl text-gray-700 leading-relaxed">
                &quot;Technology is not just about code and algorithms — it&apos;s about people,
                their dreams, and the problems we solve together. Every line of code we write
                is an opportunity to make someone&apos;s life better, easier, or more meaningful.&quot;
              </p>
              <p className="font-manrope text-gray-600 leading-relaxed">
                When I founded Riden Tech over a decade ago, I envisioned a company where
                innovation meets empathy, where technical excellence serves human needs.
                Today, I&apos;m proud to lead a team that shares this vision — brilliant minds
                who understand that our real job is to transform challenges into opportunities
                for our clients.
              </p>

            </div>
          </div>

          {/* Right Column - Image with floating animation */}
          <div
            ref={imageRef}
            className="relative h-[500px] w-full max-w-[500px] mx-auto lg:mx-0 lg:ml-auto"
          >
            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="CEO Johnathan Reynolds"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}