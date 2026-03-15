// components/Technologies.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiPhp,
  SiFigma,
  SiFlutter,
  SiPython
} from 'react-icons/si';
import { TbBrandJavascript } from 'react-icons/tb';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-gray-900" },
  { name: "JavaScript", icon: TbBrandJavascript, color: "text-[#FFCA28]" },

  { name: "PHP", icon: SiPhp, color: "text-[#777BB4]" },
  { name: "Laravel", icon: SiLaravel, color: "text-[#FF2D20]" },
  { name: "Flutter", icon: SiFlutter, color: "text-[#02569B]" },
  { name: "MySQL", icon: SiMysql, color: "text-[#4479A1]" },

  { name: "Figma", icon: SiFigma, color: "text-[#F24E1E]" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-[#06B6D4]" },
];

export default function Technologies() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const iconsContainerRef = useRef(null);
  const iconRefs = useRef([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      // ... same logic ...
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      // Badge animation
      tl.fromTo(badgeRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Title animation
      tl.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
        "-=0.4"
      );

      // Subtitle animation
      tl.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // Icons stagger animation with bounce effect
      tl.fromTo(iconRefs.current,
        {
          scale: 0.5,
          opacity: 0,
          y: 40
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.7)"
        },
        "-=0.2"
      );


    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill(true);
      });
    };
  }, [mounted]);

  if (!mounted) return <section ref={sectionRef} className="py-20 bg-white overflow-hidden relative" />;

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white overflow-hidden relative"
    >
      {/* Background Elements - Subtle gray */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gray-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gray-100 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div
            className="inline-flex items-center bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full px-5 py-2.5 mb-6 shadow-lg"
          >
            {/* <Zap className="w-4 h-4 mr-2 text-gray-100" /> */}
            <span className="text-sm font-manrope font-medium tracking-wide">
              TECHNOLOGIES
            </span>
          </div>


          {/* Title */}
          <h2
            ref={titleRef}
            className="font-manrope font-bold text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-4"
          >
            Our Tech <span className="text-gray-400 ">Stack</span>
          </h2>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-manrope text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Modern tools and frameworks we use to build exceptional digital experiences
          </p>
        </div>

        {/* Icons Grid */}
        <div
          ref={iconsContainerRef}
          className="flex flex-wrap justify-center gap-8 md:gap-10 max-w-5xl mx-auto"
        >
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <div
                key={index}
                ref={el => iconRefs.current[index] = el}
                className="flex flex-col items-center justify-center cursor-pointer group"
              >
                <div className={`text-4xl md:text-5xl ${tech.color} transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2`}>
                  <IconComponent />
                </div>
                <span className="text-gray-500 text-xs mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}