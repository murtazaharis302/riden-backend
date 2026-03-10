// components/FAQ.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, HelpCircle, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "What services does Riden Tech offer?",
    answer: "We offer a comprehensive range of software development services including Custom Software Development, Web & PWA Engineering, Mobile App Development, API Integration, AI & Machine Learning, Cloud Architecture, DevOps, UI/UX Design, E-Commerce Solutions, and Database Architecture."
  },
  {
    question: "How long does it take to develop a project?",
    answer: "Project timelines vary based on complexity and requirements. A simple MVP can be delivered in 4-6 weeks, while more complex enterprise solutions may take 3-6 months. We provide detailed timelines during our initial consultation."
  },
  {
    question: "What is your development process?",
    answer: "We follow an agile methodology with these phases: Discovery & Planning, Design & Prototyping, Development & Sprints, Testing & QA, Deployment, and Ongoing Support. We maintain transparent communication throughout."
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Yes, we offer 30 days of free support after launch, plus flexible maintenance packages for ongoing updates, improvements, and technical support."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "We specialize in modern technologies including React, Next.js, Node.js, Python, TypeScript, AWS, Google Cloud, MongoDB, PostgreSQL, and various AI/ML frameworks."
  },
  {
    question: "How do you handle project pricing?",
    answer: "We offer flexible pricing models including fixed-price for well-defined projects, time & materials for evolving requirements, and dedicated team models for long-term partnerships."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const faqItemsRef = useRef([]);
  const answersRef = useRef({});
  const ctaRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a master timeline for the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none none"
        }
      });

      // Set initial states
      gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, ...faqItemsRef.current, ctaRef.current], {
        opacity: 0,
        y: 50
      });

      // Badge animation - fade in from top with bounce
      tl.fromTo(badgeRef.current,
        { y: -50, opacity: 0, scale: 0.8 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1, 
          ease: "back.out(1.7)"
        }
      );

      // Title animation - dramatic reveal
      tl.fromTo(titleRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.2, 
          ease: "power4.out"
        },
        "-=0.6"
      );

      // Subtitle animation - slide up
      tl.fromTo(subtitleRef.current,
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out"
        },
        "-=0.4"
      );

      // FAQ items stagger animation with entrance effects
      tl.fromTo(faqItemsRef.current,
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
          stagger: 0.15, 
          ease: "power3.out"
        },
        "-=0.2"
      );

      // CTA animation with pop effect
      tl.fromTo(ctaRef.current,
        { y: 40, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8, 
          ease: "back.out(1.4)"
        },
        "-=0.2"
      );

      // Continuous floating animation for badge
      gsap.to(badgeRef.current, {
        y: -5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.5
      });

      // Parallax effect for background elements
      gsap.to('.faq-bg-1', {
        y: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to('.faq-bg-2', {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index) => {
    const newOpenIndex = openIndex === index ? null : index;
    const prevOpenIndex = openIndex;
    const currentItem = faqItemsRef.current[index];
    const currentArrow = currentItem?.querySelector('.chevron-icon');

    // Close previous if open
    if (prevOpenIndex !== null && prevOpenIndex !== index) {
      const prevAnswer = answersRef.current[prevOpenIndex];
      const prevItem = faqItemsRef.current[prevOpenIndex];
      const prevArrow = prevItem?.querySelector('.chevron-icon');
      
      if (prevAnswer) {
        // Animate answer closing
        gsap.to(prevAnswer, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.inOut",
          onComplete: () => {
            prevAnswer.style.display = "none";
          }
        });
      }
      
      // Animate arrow rotation
      if (prevArrow) {
        gsap.to(prevArrow, {
          rotation: 0,
          duration: 0.4,
          ease: "power3.inOut"
        });
      }

      // Remove highlight from previous item
      gsap.to(prevItem, {
        borderColor: "#e5e7eb",
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        duration: 0.3
      });
    }

    // Open new if not null
    if (newOpenIndex !== null) {
      const newAnswer = answersRef.current[newOpenIndex];
      const newItem = faqItemsRef.current[newOpenIndex];
      
      if (newAnswer) {
        newAnswer.style.display = "block";
        newAnswer.style.height = "auto";
        const height = newAnswer.scrollHeight;
        newAnswer.style.height = "0px";

        // Animate answer opening with bounce
        gsap.to(newAnswer, {
          height: height,
          opacity: 1,
          duration: 0.6,
          ease: "power4.out",
          onComplete: () => {
            newAnswer.style.height = "auto";
          }
        });

        // Animate answer content lines
        const lines = newAnswer.querySelectorAll('p');
        gsap.fromTo(lines,
          { y: 10, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.4, 
            stagger: 0.05,
            delay: 0.2,
            ease: "power2.out"
          }
        );
      }
      
      // Animate arrow rotation
      if (currentArrow) {
        gsap.to(currentArrow, {
          rotation: 180,
          duration: 0.4,
          ease: "power3.inOut"
        });
      }

      // Highlight current item
      gsap.to(currentItem, {
        borderColor: "#9ca3af",
        boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)",
        duration: 0.3
      });

      // Pulse effect on open
      gsap.fromTo(currentItem,
        { scale: 1 },
        { 
          scale: 1.02, 
          duration: 0.2, 
          yoyo: true, 
          repeat: 1,
          ease: "power2.out"
        }
      );
    } else {
      // If closing the current item, remove highlight
      gsap.to(currentItem, {
        borderColor: "#e5e7eb",
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        duration: 0.3
      });
    }

    setOpenIndex(newOpenIndex);
  };

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 px-6 md:px-20 overflow-hidden relative">
      {/* Background decorative elements with parallax */}
      <div className="faq-bg-1 absolute top-40 right-0 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-30 pointer-events-none"></div>
      <div className="faq-bg-2 absolute bottom-40 left-1/3 w-72 h-72 bg-gray-100 rounded-full filter blur-3xl opacity-20 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          {/* Badge */}
          <div 
            ref={badgeRef}
            className="inline-flex items-center bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full px-5 py-2.5 mb-6 shadow-lg"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            <span className="text-sm font-manrope font-medium tracking-wide">Questions</span>
          </div>

          {/* Title */}
          <h2 
            ref={titleRef}
            className="font-marcellus text-5xl md:text-6xl text-gray-900 mb-4 leading-tight"
          >
            Frequently Asked <br />
            <span className="text-gray-700 italic">Questions</span>
          </h2>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="font-instrument text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Everything you need to know about working with us
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mt-12">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                ref={el => faqItemsRef.current[index] = el}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
                style={{
                  transform: isOpen ? 'scale(1.02)' : 'scale(1)',
                  transition: 'transform 0.3s ease'
                }}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left group"
                >
                  <span className={`font-manrope font-semibold text-gray-900 pr-8 transition-all duration-300 ${isOpen ? 'text-gray-900' : 'group-hover:text-gray-700'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`chevron-icon w-5 h-5 text-gray-500 transition-all duration-500 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-gray-900' : ''
                    }`}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  />
                </button>

                {/* Answer */}
                <div
                  ref={el => answersRef.current[index] = el}
                  className="overflow-hidden"
                  style={{ 
                    height: isOpen ? "auto" : "0px",
                    opacity: isOpen ? 1 : 0,
                    display: isOpen ? "block" : "none"
                  }}
                >
                  <div className="px-6 pb-6">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>
                    <p className="font-instrument text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}