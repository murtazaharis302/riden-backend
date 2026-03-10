// components/About.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, Users, Clock, Target, CheckCircle, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef([]);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);
  const ctaRef = useRef(null);
  const borderLineRef = useRef(null);
  const [clipPath, setClipPath] = useState("");

  useEffect(() => {
    // Set responsive clip path based on screen size
    const updateClipPath = () => {
      if (window.innerWidth < 768) {
        // Mobile clip path - smaller version
        setClipPath("path('M 10,20 L 100,20 A 10,10 0,0,0 110,10 L 110,10 A 10,10 0,0,1 120,0 L 260,0 A 10,10 0,0,1 270,10 L 270,235 A 10,10 0,0,1 260,245 L 10,245 A 10,10 0,0,1 0,235 L 0,30 A 10,10 0,0,1 10,20 Z')");
      } else if (window.innerWidth < 1024) {
        // Tablet clip path - medium version
        setClipPath("path('M 15,30 L 150,30 A 15,15 0,0,0 165,15 L 165,15 A 15,15 0,0,1 180,0 L 390,0 A 15,15 0,0,1 405,15 L 405,352 A 15,15 0,0,1 390,367 L 15,367 A 15,15 0,0,1 0,352 L 0,45 A 15,15 0,0,1 15,30 Z')");
      } else {
        // Desktop clip path - original version
        setClipPath("path('M 20,40 L 200,40 A 20,20 0,0,0 220,20 L 220,20 A 20,20 0,0,1 240,0 L 520,0 A 20,20 0,0,1 540,20 L 540,470 A 20,20 0,0,1 520,490 L 20,490 A 20,20 0,0,1 0,470 L 0,60 A 20,20 0,0,1 20,40 Z')");
      }
    };

    updateClipPath();
    window.addEventListener('resize', updateClipPath);

    const ctx = gsap.context(() => {
      // Initial animations with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Badge animation - fade in and slide down
      tl.fromTo(badgeRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Title and subtitle animation with stagger
      tl.fromTo([titleRef.current, subtitleRef.current],
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.9, 
          stagger: 0.2, 
          ease: "power4.out" 
        },
        "-=0.4"
      );

      // Heading animation
      tl.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // Image animation with shape reveal and scale
      tl.fromTo(imageRef.current,
        { 
          opacity: 0,
          scale: 0.9,
          rotation: 2
        },
        { 
          opacity: 1, 
          scale: 1,
          rotation: 0,
          duration: 1.4, 
          ease: "power3.out" 
        },
        "-=0.6"
      );

      // Description animation with fade and slide
      tl.fromTo(descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Stats animation with scale and stagger
      const validStats = statsRef.current.filter(el => el);
      if (validStats.length > 0) {
        tl.fromTo(validStats,
          { scale: 0.5, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.7, 
            stagger: 0.15, 
            ease: "back.out(1.4)" 
          },
          "-=0.4"
        );
      }

      // Border line animation
      tl.fromTo(borderLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.2"
      );

      // CTA button animation
      tl.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "back.out(1.2)" },
        "-=0.2"
      );

      // Continuous floating animation for badge
      gsap.to(badgeRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Subtle pulse animation for stats on hover
      validStats.forEach(stat => {
        stat.addEventListener('mouseenter', () => {
          gsap.to(stat, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        stat.addEventListener('mouseleave', () => {
          gsap.to(stat, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Parallax effect for background elements
      gsap.to('.about-bg-1', {
        y: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to('.about-bg-2', {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Subtle floating animation for image (only on desktop)
      if (window.innerWidth >= 1024) {
        gsap.to(imageRef.current, {
          y: 8,
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
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
      {/* Background decorative elements with parallax */}
      <div className="about-bg-1 absolute top-40 right-0 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>
      <div className="about-bg-2 absolute bottom-20 left-20 w-72 h-72 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {/* Floating Badge */}
          <div 
            ref={badgeRef} 
            className="inline-flex items-center bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full px-5 py-2.5 mb-6 shadow-lg"
          >
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm font-manrope font-medium tracking-wide">ABOUT RIDEN TECH</span>
          </div>
          
          {/* Titles with animation */}
          <h2 ref={titleRef} className="font-marcellus text-5xl md:text-6xl text-gray-900 mb-4">
            We're on a Mission to
          </h2>
          <h2 ref={subtitleRef} className="font-marcellus text-5xl md:text-6xl text-gray-900 mb-6">
            <span className="relative">
              Transform Digital
            </span>
          </h2>
          
          {/* Heading with animation */}
          <p ref={headingRef} className="font-instrument text-xl text-gray-600 max-w-2xl mx-auto">
            We're not just developers — we're partners in your success, bringing together 
            strategy, design, and technology to create exceptional digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Image with Responsive Clip Path */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] w-full max-w-[320px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[600px] mx-auto">
              <div
                ref={imageRef}
                className="absolute inset-0 w-full h-full shadow-2xl"
                style={{
                  clipPath: clipPath,
                }}
              >
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Description Text */}
            <div ref={descriptionRef} className="space-y-4">
              <p className="font-instrument text-lg text-gray-600 leading-relaxed">
                With over years of experience, Riden Tech is a passionate, driven, and attentive team 
                offering creative talent and technical expertise. We specialize in transforming complex 
                challenges into seamless digital solutions that resonate with users and drive business growth.
              </p>
              <p className="font-instrument text-lg text-gray-600 leading-relaxed">
                Our attentive team offers creative talent and expert technical skills, ensuring every project 
                we undertake exceeds expectations and delivers measurable results.
              </p>
            </div>

            {/* Stats Row with hover animations */}
            <div className="grid grid-cols-3 gap-4">
              <div ref={el => statsRef.current[0] = el} className="text-center cursor-pointer">
                <div className="font-marcellus text-3xl text-gray-900">50+</div>
                <div className="font-instrument text-xs text-gray-500">Team Members</div>
              </div>
              <div ref={el => statsRef.current[1] = el} className="text-center cursor-pointer">
                <div className="font-marcellus text-3xl text-gray-900">200+</div>
                <div className="font-instrument text-xs text-gray-500">Projects Done</div>
              </div>
              <div ref={el => statsRef.current[2] = el} className="text-center cursor-pointer">
                <div className="font-marcellus text-3xl text-gray-900">98%</div>
                <div className="font-instrument text-xs text-gray-500">Happy Clients</div>
              </div>
            </div>

            {/* Border Line with animation */}
            <div ref={borderLineRef} className="w-full h-px bg-gray-200 origin-left"></div>

            {/* CTA with animation */}
            <div ref={ctaRef} className="pt-2">
              <Link
                href="/about"
                className="group inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-lg font-manrope"
              >
                <span>More About Us</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;