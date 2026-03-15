// components/Team.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Johnathan Reynolds",
    role: "Founder / CEO",
    description: "Leads the company's vision and direction while contributing as a full-stack developer. Ensures high technical standards and delivers top-quality solutions.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    description: "Builds scalable web applications with a focus on smooth user experiences and reliable, high-quality solutions that meet client needs.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Marcus Williams",
    role: "Creative Director",
    description: "Develops custom software solutions to improve business efficiency, with a focus on reliability, performance, and client satisfaction.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Priya Patel",
    role: "Head of Product",
    description: "Oversees projects from planning to delivery, ensuring smooth team coordination, timely execution, and consistent communication with clients.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  }
];

export default function Team() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      // Create a timeline for section entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      // Badge animation (like About section)
      tl.fromTo(badgeRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Title animation (like About section)
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

      // Cards stagger animation
      tl.fromTo(cardsRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        },
        "-=0.2"
      );

      // Floating animation for badge
      gsap.to(badgeRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill(true);
      });
    };
  }, [mounted]);

  if (!mounted) return <section ref={sectionRef} className="w-full bg-gradient-to-br from-black to-[#0A0A0A] py-24 px-6 md:px-20 relative overflow-hidden" />;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-br from-black to-[#0A0A0A] py-24 px-6 md:px-20 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-0 w-96 h-96 bg-gray-800/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-gray-800/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Matching About section style */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full px-5 py-2.5 mb-6 shadow-lg border border-gray-700"
          >
            <span className="text-sm font-manrope font-medium tracking-wide">OUR TEAM</span>
          </div>

          {/* Title */}
          <h2
            ref={titleRef}
            className="font-marcellus text-5xl md:text-6xl text-white mb-4"
          >
            Meet the <span className="text-gray-500 italic">Experts</span>
          </h2>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-instrument text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Passionate professionals dedicated to bringing your vision to life
          </p>
        </div>

        {/* Team Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group relative cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full h-[400px] overflow-hidden rounded-2xl border border-gray-800 transition-all duration-500 group-hover:border-gray-600 group-hover:shadow-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={index === 0}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content - Left Aligned */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  {/* Name - Left Aligned */}
                  <h3 className="font-marcellus text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>

                  {/* Role - Left Aligned */}
                  <p className="font-manrope text-sm text-gray-300 mb-3">
                    {member.role}
                  </p>

                  {/* Description - Appears on hover */}
                  <div className="overflow-hidden max-h-0 group-hover:max-h-32 transition-all duration-500">
                    <p className="font-instrument text-sm text-gray-300 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>

                {/* Subtle accent line on hover */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}