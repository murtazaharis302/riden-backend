// components/VideoSection.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Zap, Play, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 50, suffix: "+", label: "Team Members" },
  { value: 200, suffix: "+", label: "Projects Done" },
  { value: 98, suffix: "%", label: "Happy Clients" },
];

const ImageSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [clipPath, setClipPath] = useState("");
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [displayValues, setDisplayValues] = useState(STATS.map(stat => 0));

  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const headingRef = useRef(null);
  const labelRef = useRef(null);
  const imageRef = useRef(null);
  const statsContainerRef = useRef(null);
  const statsRef = useRef([]);
  const playButtonRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth * 0.9;
      const h = 510;
      setDims({ w, h });
      setClipPath(
        `path('M 20,60 L 150,60 L 210,0 L ${w - 20},0 A 20,20 0,0,1 ${w},20 L ${w},${h - 20} A 20,20 0,0,1 ${w - 20},${h} L 20,${h} A 20,20 0,0,1 0,${h - 20} L 0,80 A 20,20 0,0,1 20,60 Z')`
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Badge
      gsap.fromTo(badgeRef.current,
        { opacity: 0, y: -20, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)",
          scrollTrigger: { trigger: badgeRef.current, start: "top 80%" },
        }
      );

      // Titles staggered
      gsap.fromTo([titleRef.current, subtitleRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        }
      );

      // Paragraph
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.3,
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );

      // Label
      gsap.fromTo(labelRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: labelRef.current, start: "top 80%" },
        }
      );

      // Image container
      gsap.fromTo(imageRef.current,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: imageRef.current, start: "top 80%" },
        }
      );

      // Stats cards
      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: {
            trigger: statsContainerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

    });

    return () => ctx.revert();
  }, []);

  // Counter animation - start immediately on mount
  useEffect(() => {
    const counters = STATS.map((stat, i) => {
      return gsap.to({ val: 0 }, {
        val: stat.value,
        duration: 2,
        ease: "power2.out",
        delay: i * 0.2,
        onUpdate: function () {
          setDisplayValues(prev => {
            const updated = [...prev];
            updated[i] = Math.round(this.targets()[0].val);
            return updated;
          });
        },
      });
    });

    return () => {
      counters.forEach(counter => counter.kill());
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-16 px-5 bg-white">
      <div className="relative w-[90vw] max-w-7xl">

        {/* Top Section */}
        <div className="text-center mb-12">

          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full px-5 py-2.5 mb-6 shadow-lg"
          >
            <Zap className="w-4 h-4 mr-2 text-gray-100" />
            <span className="text-sm font-manrope font-medium tracking-wide">
              ABOUT RIDEN TECH
            </span>
          </div>

          {/* Titles */}
          <h2
            ref={titleRef}
            className="font-manrope font-bold text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-2"
          >
            We're on a Mission to
          </h2>
          <h2
            ref={subtitleRef}
            className="font-manrope font-bold text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-6"
          >
            Transform <span className="text-gray-400 ">Digital</span>
          </h2>

          {/* Subheading */}
          <p
            ref={headingRef}
            className="font-instrument text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            We're not just developers we're partners in your success, bringing together
            strategy, design, and technology to create exceptional digital experiences.
          </p>
        </div>

        {/* Label */}
        <div ref={labelRef} className="flex items-center gap-2.5 mb-3.5 pl-0.5 absolute top-1/3 -mt-2 left-3">
          <div className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
          <span className="text-xs font-manrope tracking-[0.2em] text-gray-500 uppercase">
            Our Workspace
          </span>
        </div>

        {/* Image Container */}
        <div
          ref={(el) => { containerRef.current = el; imageRef.current = el; }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative overflow-hidden cursor-pointer group"
          style={{
            width: dims.w || "90vw",
            height: dims.h || 510,
            clipPath: clipPath,
            boxShadow: isHovered
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              : "0 10px 40px -12px rgba(0, 0, 0, 0.15)",
            transition: "box-shadow 0.4s ease",
          }}
        >
          {/* Image - Web Dev/Office related */}
          <Image
            src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Modern office workspace with developers"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority
          />

          {/* Dark overlay */}
          <div
            className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500"
          />

          {/* Bottom gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/60 to-transparent"
          />



          {/* Image caption */}
          <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-manrope border border-white/20">
            Modern Development Studio
          </div>
        </div>

        {/* Stats Cards */}
        <div ref={statsContainerRef} className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, index) => (
            <div
              key={index}
              ref={el => statsRef.current[index] = el}
              className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-400 transition-all duration-300 group"
            >
              <div
                className="font-manrope text-5xl md:text-6xl text-gray-900 mb-2"
              >
                {displayValues[index]}{stat.suffix}
              </div>
              <div
                className="font-manrope text-sm text-gray-500 uppercase tracking-wider"
              >
                {stat.label}
              </div>

              {/* Decorative line on hover */}
              <div className="w-0 h-0.5 bg-black mt-4 mx-auto group-hover:w-16 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="group inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-xl font-manrope">
            <span>Learn More About Us</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ImageSection;