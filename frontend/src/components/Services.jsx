// components/Services.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ArrowDownRight, Code2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Custom Software Development",
    description: [
      "Tailored software solutions built with modern frameworks like React, Next.js, and Node.js.",
      "Scalable architecture that grows with your business and user base.",
      "Clean code, best practices, and comprehensive testing for reliable performance."
    ]
  },
  {
    title: "Web & PWA Engineering",
    description: [
      "Progressive Web Apps that work offline and load instantly on any device.",
      "Responsive designs that provide a native app-like experience in the browser.",
      "Cross-platform compatibility without the need for separate codebases."
    ]
  },
  {
    title: "Mobile App Development",
    description: [
      "Native and cross-platform mobile applications for iOS and Android.",
      "Seamless user experiences with smooth animations and intuitive interfaces.",
      "Integration with device features like camera, GPS, and push notifications."
    ]
  },
  {
    title: "API & Systems Integration",
    description: [
      "Connect your applications with third-party services and internal systems.",
      "RESTful and GraphQL APIs designed for scalability and security.",
      "Seamless data flow between your existing tools and new solutions."
    ]
  },
  {
    title: "AI & Machine Learning",
    description: [
      "Integrate powerful AI features into your applications.",
      "Custom machine learning models tailored to your specific business needs.",
      "Automate workflows, generate content, and analyze data intelligently."
    ]
  },
  {
    title: "Cloud Architecture",
    description: [
      "Scalable cloud infrastructure on AWS, Google Cloud, or Azure.",
      "Cost-effective solutions that grow with your business.",
      "High availability, disaster recovery, and global distribution."
    ]
  },
  {
    title: "DevOps & Automation",
    description: [
      "Streamlined development pipelines for faster deployments.",
      "Automated testing and continuous integration/continuous deployment.",
      "Infrastructure as code for consistent and reliable environments."
    ]
  },
  {
    title: "UI/UX Design",
    description: [
      "Beautiful, intuitive designs that users love to interact with.",
      "User-centered design approach focused on conversion and engagement.",
      "Rapid prototyping in Figma to visualize your ideas before development."
    ]
  },
  {
    title: "E-Commerce Solutions",
    description: [
      "Custom online stores with secure payment processing.",
      "Inventory management, order tracking, and customer accounts.",
      "Optimized for conversions and mobile shopping experiences."
    ]
  },
  {
    title: "Database Architecture",
    description: [
      "Efficient database design for optimal performance and scalability.",
      "SQL and NoSQL solutions based on your data requirements.",
      "Data migration, optimization, and maintenance services."
    ]
  }
];



export default function Services() {
  const [expanded, setExpanded] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const bottomSpanRef = useRef(null);
  const serviceItemsRef = useRef([]);
  const descriptionsRef = useRef({});
  const arrowsRef = useRef({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      // Header animations - play once
      gsap.fromTo(badgeRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true
          }
        }
      );

      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true
          }
        }
      );

      gsap.fromTo(subtitleRef.current,
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
            once: true
          }
        }
      );

      // Bottom span animation - play once
      gsap.fromTo(bottomSpanRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true
          }
        }
      );

      // Service items stagger animation - play once
      gsap.fromTo(serviceItemsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true
          }
        }
      );

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill(true);
      });
    };
  }, [mounted]);



  // Handle hover-based expansion
  const handleMouseEnter = (idx) => {
    setHoveredIndex(idx);

    if (expanded !== idx) {
      // Close previous
      if (expanded !== null && expanded !== idx) {
        const prevDesc = descriptionsRef.current[expanded];
        const prevArrow = arrowsRef.current[expanded];
        const prevItem = serviceItemsRef.current[expanded];

        if (prevDesc) {
          gsap.to(prevDesc, { height: 0, opacity: 0, duration: 0.45, ease: "power2.inOut" });
        }

        if (prevArrow) {
          gsap.to(prevArrow, { rotation: 0, duration: 0.3, ease: "power3.inOut" });
        }

        if (prevItem) {
          gsap.to(prevItem, {
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            duration: 0.3,
            ease: "power3.inOut",
          });
        }
      }

      // Open new
      const newDesc = descriptionsRef.current[idx];
      const newArrow = arrowsRef.current[idx];
      const newItem = serviceItemsRef.current[idx];

      if (newDesc) {
        newDesc.style.display = "block";
        newDesc.style.height = "auto";
        const height = newDesc.scrollHeight;
        newDesc.style.height = "0px";

        gsap.to(newDesc, {
          height: height,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          onComplete: () => (newDesc.style.height = "auto"),
        });

        const lines = newDesc.querySelectorAll(".description-line");
        gsap.fromTo(lines, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.2, ease: "power3.out" });
      }

      if (newArrow) {
        gsap.to(newArrow, { rotation: 180, duration: 0.3, ease: "power3.inOut" });
      }

      if (newItem) {
        gsap.to(newItem, {
          paddingTop: "2.5rem",
          paddingBottom: "2.5rem",
          duration: 0.3,
          ease: "power3.out",
        });
      }

      setExpanded(idx);
    }
  };
  const handleMouseLeave = () => {
    setHoveredIndex(null);

    if (expanded !== null) {
      const currentDesc = descriptionsRef.current[expanded];
      const currentArrow = arrowsRef.current[expanded];
      const currentItem = serviceItemsRef.current[expanded];

      if (currentDesc) {
        gsap.to(currentDesc, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power3.inOut",
          onComplete: () => { currentDesc.style.display = "none"; }
        });
      }

      if (currentArrow) {
        gsap.to(currentArrow, {
          rotation: 0,
          duration: 0.3,
          ease: "power3.inOut"
        });
      }

      if (currentItem) {
        gsap.to(currentItem, {
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          duration: 0.3,
          ease: "power3.inOut"
        });
      }

      setExpanded(null); // Close any open item
    }
  };
  return (
    <section ref={sectionRef} className="w-full bg-black text-white py-16 px-6 md:px-20 overflow-hidden relative">
      {/* Header */}
      <div ref={headerRef} className="text-center mb-16">
        <div
          ref={badgeRef}
          className="inline-flex items-center bg-gray-50 text-gray-700 rounded-full px-4 py-2 mb-6 border border-gray-200"
        >
          <Code2 className="w-4 h-4 mr-2 text-gray-500" />
          <span className="text-xs font-manrope tracking-wider">Expertise</span>
        </div>

        <h2
          ref={titleRef}
          className="font-manrope font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-tight"
        >
          Your Needs, <span className="text-gray-400 ">Our Expertise</span>
        </h2>

        <p
          ref={subtitleRef}
          className="font-instrument text-gray-400 max-w-2xl mx-auto text-lg"
        >
          Comprehensive solutions tailored to your business needs
        </p>
      </div>

      {/* Tags */}
      <div
        ref={bottomSpanRef}
        className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 w-full mt-8 pt-8 border-t border-gray-800"
      >
        <span className="font-['Manrope'] text-xs md:text-sm text-gray-400 font-bold uppercase tracking-wide hover:text-white transition-colors duration-300 cursor-default">UX/UI Design</span>
        <span className="font-['Manrope'] text-xs md:text-sm text-gray-400 font-bold uppercase tracking-wide hover:text-white transition-colors duration-300 cursor-default">Brand Identity</span>
        <span className="font-['Manrope'] text-xs md:text-sm text-gray-400 font-bold uppercase tracking-wide hover:text-white transition-colors duration-300 cursor-default">Web Development</span>
        <span className="font-['Manrope'] text-xs md:text-sm text-gray-400 font-bold uppercase tracking-wide hover:text-white transition-colors duration-300 cursor-default">App Development</span>
        <span className="font-['Manrope'] text-xs md:text-sm text-gray-400 font-bold uppercase tracking-wide hover:text-white transition-colors duration-300 cursor-default">Marketing</span>
      </div>

      {/* Service List */}
      <div className="max-w-7xl mx-auto mt-16 relative z-10">
        {SERVICES.map((service, idx) => {
          const isOpen = expanded === idx;
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={idx}
              ref={el => serviceItemsRef.current[idx] = el}
              className={`group flex flex-col md:flex-row items-start md:items-center px-0  transition-all duration-500 cursor-pointer border-b border-gray-800/50 ${isOpen ? "bg-gradient-to-r from-white/5 to-transparent md:px-3 py-4 md:py-5 " : " md:px-4 py-6 md:py-8"
                }`}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col items-start justify-start md:w-2/12 w-full text-left mb-2 md:mb-0">
                <span
                  className={`font-['manrope'] text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest transition-all duration-500 ${isOpen ? "text-white scale-110" : isHovered ? "text-gray-300" : "text-gray-700"
                    }`}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-col justify-center md:w-6/12 w-full pl-0 md:pl-4 pr-0 md:pr-8">
                <span
                  className={`font-['Instrument_Sans'] text-xl md:text-2xl lg:text-3xl font-medium w-full transition-all duration-500 ${isOpen ? "text-white" : isHovered ? "text-gray-200" : "text-gray-400"
                    }`}
                >
                  {service.title}
                </span>
              </div>

              <div className="flex flex-col items-end justify-start md:w-4/12 w-full mt-2 md:mt-0">
                <div className="flex flex-col items-end w-full">
                  <div
                    ref={el => arrowsRef.current[idx] = el}
                    className="mb-3 transform-gpu"
                    style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
                  >
                    {isOpen ? (
                      <ArrowUpRight className={`w-6 h-6 transition-all duration-300 ${isOpen ? "text-white" : "text-gray-600"
                        }`} />
                    ) : (
                      <ArrowDownRight className={`w-6 h-6 transition-all duration-300 ${isOpen ? "text-white" : isHovered ? "text-gray-400" : "text-gray-600"
                        }`} />
                    )}
                  </div>

                  <div
                    ref={el => descriptionsRef.current[idx] = el}
                    className="w-full overflow-hidden"
                    style={{
                      height: isOpen ? "auto" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="flex flex-col gap-2 mt-2">
                      {service.description.map((desc, i) => (
                        <p
                          key={i}
                          className="description-line font-['Manrope'] text-gray-400 text-xs md:text-sm leading-relaxed text-left"
                        >
                          {desc}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>




    </section>
  );
}