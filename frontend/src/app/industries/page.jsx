// app/industries/page.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  FaHeartbeat,
  FaChartLine,
  FaShoppingCart,
  FaTruck,
  FaGraduationCap,
  FaBuilding,
  FaHotel,
  FaHandsHelping
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from '@/components/HeroSection';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    id: 1,
    number: "01",
    title: "Healthcare & Life Sciences",
    description: "We deliver HIPAA-compliant solutions, telemedicine platforms, and medical research tools that transform patient care and streamline clinical workflows.",
    icon: <FaHeartbeat className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/7088536/pexels-photo-7088536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "from-blue-900 to-blue-700",
    slug: "healthcare-life-sciences",
    align: "left"
  },
  {
    id: 2,
    number: "02",
    title: "Finance & Legal",
    description: "Secure banking platforms, fintech solutions, and compliance tools with enterprise-grade security for financial institutions and law firms.",
    icon: <FaChartLine className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/6694541/pexels-photo-6694541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/4386328/pexels-photo-4386328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "from-emerald-900 to-emerald-700",
    slug: "finance-legal",
    align: "right"
  },
  {
    id: 3,
    number: "03",
    title: "Retail & E-Commerce",
    description: "Custom online stores, inventory management, and omnichannel solutions that drive sales and enhance customer experience.",
    icon: <FaShoppingCart className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/4498127/pexels-photo-4498127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "from-purple-900 to-purple-700",
    slug: "retail-ecommerce",
    align: "left"
  },
  {
    id: 4,
    number: "04",
    title: "Logistics & Supply Chain",
    description: "Fleet management, warehouse optimization, and real-time tracking solutions for maximum operational efficiency.",
    icon: <FaTruck className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "from-amber-900 to-amber-700",
    slug: "logistics-supply-chain",
    align: "right"
  },
  {
    id: 5,
    number: "05",
    title: "Education & EdTech",
    description: "Learning management systems, virtual classrooms, and educational platforms that engage students and facilitate modern learning.",
    icon: <FaGraduationCap className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/5428012/pexels-photo-5428012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "from-indigo-900 to-indigo-700",
    slug: "education-edtech",
    align: "left"
  },
  {
    id: 6,
    number: "06",
    title: "Real Estate & Construction",
    description: "Property management platforms, construction tracking, and real estate marketplaces that streamline operations.",
    icon: <FaBuilding className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "from-orange-900 to-orange-700",
    slug: "real-estate-construction",
    align: "right"
  },
  {
    id: 7,
    number: "07",
    title: "Hospitality & Tourism",
    description: "Booking engines, property management systems, and guest experience apps for hotels and travel companies.",
    icon: <FaHotel className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "from-rose-900 to-rose-700",
    slug: "hospitality-tourism",
    align: "left"
  },
  {
    id: 8,
    number: "08",
    title: "Non-Profit & Government",
    description: "Donation platforms, grant management systems, and community engagement tools for social impact.",
    icon: <FaHandsHelping className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/6995222/pexels-photo-6995222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "from-teal-900 to-teal-700",
    slug: "non-profit-government",
    align: "right"
  }
];

export default function IndustriesPage() {
  const [mounted, setMounted] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [activeHoverIndex, setActiveHoverIndex] = useState(null);
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const hoverTl = useRef({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageError = (industryId) => {
    setImageErrors(prev => ({
      ...prev,
      [industryId]: true
    }));
  };

  const getImageSource = (industry) => {
    if (imageErrors[industry.id]) {
      return industry.fallbackImage;
    }
    return industry.image;
  };

  // Function to reset all cards to default state
  const resetAllCards = (excludeIndex = null) => {
    itemsRef.current.forEach((card, idx) => {
      if (excludeIndex !== null && idx === excludeIndex) return;
      if (!card) return;

      const image = card.querySelector('.card-image');
      const icon = card.querySelector('.industry-icon');
      const number = card.querySelector('.industry-number');
      const content = card.querySelector('.card-content');
      const title = card.querySelector('.industry-title');
      const description = card.querySelector('.industry-description');
      const button = card.querySelector('.explore-button');
      const arrow = card.querySelector('.arrow-icon');

      // Kill any ongoing animations for this card
      if (hoverTl.current[idx]) {
        hoverTl.current[idx].kill();
      }

      // Create new timeline for reset
      const tl = gsap.timeline();

      if (image) tl.to(image, { scale: 1, duration: 0.3, ease: "power2.out" }, 0);
      if (icon) tl.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" }, 0);
      if (number) tl.to(number, { opacity: 0.2, scale: 1, duration: 0.3, ease: "power2.out" }, 0);
      if (content) tl.to(content, { y: 0, duration: 0.3, ease: "power2.out" }, 0);
      if (title) tl.to(title, { color: "#111827", duration: 0.3, ease: "power1.out" }, 0);
      if (button) tl.to(button, { backgroundColor: "#111827", scale: 1, duration: 0.3, ease: "power2.out" }, 0);
      if (arrow) tl.to(arrow, { x: 0, duration: 0.3, ease: "power2.out" }, 0);

      tl.to(card, {
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        borderColor: "#E5E7EB",
        duration: 0.3,
        ease: "power2.out"
      }, 0);

      hoverTl.current[idx] = tl;
    });
  };

  const handleMouseEnter = (index) => {
    // Reset all other cards first
    resetAllCards(index);
    setActiveHoverIndex(index);

    const card = itemsRef.current[index];
    if (!card) return;

    const image = card.querySelector('.card-image');
    const icon = card.querySelector('.industry-icon');
    const number = card.querySelector('.industry-number');
    const content = card.querySelector('.card-content');
    const title = card.querySelector('.industry-title');
    const description = card.querySelector('.industry-description');
    const button = card.querySelector('.explore-button');
    const arrow = card.querySelector('.arrow-icon');

    // Kill any existing animation for this card
    if (hoverTl.current[index]) {
      hoverTl.current[index].kill();
    }

    const tl = gsap.timeline();

    if (image) tl.to(image, { scale: 1.15, duration: 0.5, ease: "power2.out" }, 0);
    if (icon) tl.to(icon, { scale: 1.2, duration: 0.4, ease: "back.out(1.7)" }, 0);
    if (number) tl.to(number, { opacity: 0.3, scale: 1.1, duration: 0.4, ease: "power2.out" }, 0);
    if (content) tl.to(content, { y: -5, duration: 0.4, ease: "power2.out" }, 0);
    if (title) tl.to(title, { color: "#4B5563", duration: 0.3, ease: "power1.out" }, 0);
    if (button) tl.to(button, { backgroundColor: "#1F2937", scale: 1.05, duration: 0.3, ease: "back.out(1.2)" }, 0.1);
    if (arrow) tl.to(arrow, { x: 5, duration: 0.3, ease: "power2.out" }, 0.1);

    tl.to(card, {
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      borderColor: "#9CA3AF",
      duration: 0.3,
      ease: "power2.out"
    }, 0);

    hoverTl.current[index] = tl;
  };

  const handleMouseLeave = (index) => {
    // Don't reset immediately - we'll let the next hover handle it
    // But if we want to reset when mouse leaves completely, uncomment below
    /*
    if (hoverTl.current[index]) {
      hoverTl.current[index].kill();
    }
    resetAllCards();
    setActiveHoverIndex(null);
    */
  };

  useEffect(() => {
    if (!mounted) return;

    // First set all items to visible
    gsap.set(itemsRef.current, { opacity: 1, y: 0 });

    const ctx = gsap.context(() => {
      // Industries items stagger animation
      gsap.fromTo(itemsRef.current,
        { y: 60, opacity: 1 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        title="INDUSTRIES WE SERVE"
        subtitle="Deep domain expertise across sectors delivering tailored solutions for your unique challenges"
        imageSrc="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
        overlayColor="bg-white"
      />

      {/* Industries List - Responsive */}
      <section ref={sectionRef} className="-mt-16 pb-24  px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
            {industries.map((industry, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={industry.id}
                  ref={el => itemsRef.current[index] = el}
                  className={`group relative bg-white rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg border border-gray-200 cursor-pointer transition-all duration-300 ${activeHoverIndex === index ? 'z-10' : 'z-0'
                    }`}
                  onClick={() => window.location.href = `/industries/${industry.slug}`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  {/* Mobile: Stacked layout always */}
                  {/* Desktop: Alternating layout */}
                  <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Image Side - Responsive height */}
                    <div className="relative w-full lg:w-1/2 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={getImageSource(industry)}
                        alt={industry.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
                        className="card-image object-cover object-center"
                        onError={() => handleImageError(industry.id)}
                        priority={index < 2}
                      />

                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${industry.color} opacity-60 mix-blend-multiply`}></div>

                      {/* Number Badge - Responsive sizing */}
                      <div className={`industry-number absolute bottom-3 md:bottom-4 lg:bottom-6 ${isEven ? 'right-3 md:right-4 lg:right-6' : 'left-3 md:left-4 lg:left-6'}`}>
                        <span className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-marcellus font-black text-white/20">
                          {industry.number}
                        </span>
                      </div>

                      {/* Icon - Responsive positioning and size */}
                      <div className={`industry-icon absolute top-3 md:top-4 lg:top-6 ${isEven ? 'right-3 md:right-4 lg:right-6' : 'left-3 md:left-4 lg:left-6'} bg-black/30 backdrop-blur-sm p-2 md:p-2.5 lg:p-3 rounded-lg md:rounded-xl text-white border border-white/20`}>
                        <div className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7">
                          {industry.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content Side - Responsive padding */}
                    <div className="card-content w-full lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-center bg-white">
                      {/* Title - Responsive font sizes */}
                      <h3 className="industry-title font-marcellus text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 mb-3 md:mb-4">
                        {industry.title}
                      </h3>

                      {/* Description - Responsive text */}
                      <p className="industry-description font-instrument text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
                        {industry.description}
                      </p>

                      {/* Divider */}
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4 md:mb-6" />

                      {/* Learn More Link - Responsive */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                        <span className="text-xs sm:text-sm text-gray-500 font-manrope order-2 sm:order-1">
                          Click to learn more
                        </span>
                        <div className="explore-button flex items-center gap-2  font-semibold text-xs sm:text-sm bg-gray-900 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full order-1 sm:order-2">
                          <span className="font-manrope whitespace-nowrap">Explore Industry</span>
                          <div className="arrow-icon w-5 h-5 sm:w-6 sm:h-6 bg-white  rounded-full flex items-center justify-center flex-shrink-0">
                            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-900" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}