// app/industries/[slug]/page.jsx
"use client";
import { useEffect, useRef, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ChevronLeft, Sparkles, Layers, Zap, Shield, Users, TrendingUp, Clock, Globe, Lock, Cloud, Smartphone, Database, Code, Settings, BarChart, Award, Map,
  Heart
} from "lucide-react";
import {
  FaHeartbeat,
  FaChartLine,
  FaShoppingCart,
  FaTruck,
  FaGraduationCap,
  FaBuilding,
  FaHotel,
  FaHandsHelping,
  FaWifi,
  FaHospital,
  FaUniversity
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Complete industry data with all details
const industries = [

  {
    id: 1,
    number: "01",
    title: "Healthcare & Life Sciences",
    subtitle: "Smart Healthcare Solutions for Better Patient Outcomes",
    description: "We deliver HIPAA-compliant solutions, telemedicine platforms, and medical research tools that transform patient care and streamline clinical workflows. Our technology empowers healthcare providers to focus on what matters most - patient health.",
    icon: <FaHospital className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/7088536/pexels-photo-7088536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    slug: "healthcare",
    align: "right",
    features: [
      { title: "Hospital Information Systems", icon: <Database className="w-4 h-4" />, description: "Integrated healthcare management" },
      { title: "Data Security & Compliance", icon: <Shield className="w-4 h-4" />, description: "HIPAA-compliant infrastructure" },
      { title: "Process Automation", icon: <Zap className="w-4 h-4" />, description: "Streamlined clinical workflows" },
      { title: "Analytics & AI", icon: <BarChart className="w-4 h-4" />, description: "Predictive healthcare insights" }
    ],
    solutions: [
      "EMR/EHR Systems", "Telemedicine Platforms", "Patient Portals",
      "Billing & Claims", "Inventory Management", "Appointment Scheduling",
      "Lab Systems", "Healthcare Analytics", "Mobile Health Apps",
      "Clinical Decision Support", "Remote Patient Monitoring", "Pharmacy Management"
    ],
    stats: [
      { value: 30, suffix: "%", label: "Faster Diagnoses", decimals: 0 },
      { value: 99.9, suffix: "%", label: "Data Accuracy", decimals: 1 },
      { value: 24, suffix: "/7", label: "Patient Access", decimals: 0 }
    ]
  },
  {
    id: 2,
    number: "02",
    title: "Banking & Finance",
    subtitle: "Secure, Scalable Digital Solutions for Financial Institutions",
    description: "We empower banks and financial organizations with secure, compliant, and scalable technology solutions that enhance trust, efficiency, and digital innovation. From core banking to fraud detection, we've got you covered.",
    icon: <FaUniversity className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/6694541/pexels-photo-6694541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/4386328/pexels-photo-4386328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    slug: "banking",
    align: "left",
    features: [
      { title: "Digital Banking Platforms", icon: <Smartphone className="w-4 h-4" />, description: "Modern banking experiences" },
      { title: "Risk & Compliance", icon: <Shield className="w-4 h-4" />, description: "Regulatory compliance automated" },
      { title: "Automation & AI", icon: <Zap className="w-4 h-4" />, description: "Intelligent process automation" },
      { title: "Data Security", icon: <Lock className="w-4 h-4" />, description: "Enterprise-grade protection" }
    ],
    solutions: [
      "Core Banking Systems", "Payment Gateways", "Fraud Detection",
      "Loan Management Systems", "Mobile Banking Apps", "Financial Analytics",
      "Regulatory Reporting", "Customer Identity Management", "Cloud Banking",
      "Wealth Management", "Trading Platforms", "KYC Solutions"
    ],
    stats: [
      { value: 60, suffix: "%", label: "Faster Transactions", decimals: 0 },
      { value: 100, suffix: "%", label: "Compliance", decimals: 0 },
      { value: 99.99, suffix: "%", label: "Uptime", decimals: 2 }
    ]
  },
  {
    id: 3,
    number: "03",
    title: "Retail & E-Commerce",
    subtitle: "Transform Shopping Experiences with Digital Innovation",
    description: "Custom online stores, inventory management, and omnichannel solutions that drive sales and enhance customer experience. We help retailers create seamless shopping journeys across all touchpoints.",
    icon: <FaShoppingCart className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/4498127/pexels-photo-4498127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    slug: "retail-ecommerce",
    align: "right",
    features: [
      { title: "Omnichannel Commerce", icon: <Globe className="w-4 h-4" />, description: "Unified shopping experience" },
      { title: "Inventory Intelligence", icon: <Database className="w-4 h-4" />, description: "Real-time stock management" },
      { title: "Personalization", icon: <Users className="w-4 h-4" />, description: "AI-driven recommendations" },
      { title: "Analytics & Insights", icon: <BarChart className="w-4 h-4" />, description: "Data-driven decisions" }
    ],
    solutions: [
      "E-Commerce Platforms", "POS Systems", "Inventory Management",
      "Customer Analytics", "Loyalty Programs", "Mobile Commerce",
      "Marketplace Integration", "Order Management", "Supply Chain Optimization",
      "AI Recommendations", "Chat Commerce", "Voice Commerce"
    ],
    stats: [
      { value: 45, suffix: "%", label: "Sales Increase", decimals: 0 },
      { value: 60, suffix: "%", label: "Cart Recovery", decimals: 0 },
      { value: 3, suffix: "x", label: "Customer Engagement", decimals: 0 }
    ]
  },
  {
    id: 4,
    number: "04",
    title: "Logistics & Supply Chain",
    subtitle: "Intelligent Solutions for Modern Supply Chains",
    description: "Fleet management, warehouse optimization, and real-time tracking solutions for maximum operational efficiency. We help logistics companies navigate the complexities of modern supply chains.",
    icon: <FaTruck className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    slug: "logistics-supply-chain",
    align: "left",
    features: [
      { title: "Real-time Tracking", icon: <Globe className="w-4 h-4" />, description: "End-to-end visibility" },
      { title: "Route Optimization", icon: <Map className="w-4 h-4" />, description: "AI-powered routing" },
      { title: "Warehouse Automation", icon: <Settings className="w-4 h-4" />, description: "Smart inventory management" },
      { title: "Predictive Analytics", icon: <BarChart className="w-4 h-4" />, description: "Demand forecasting" }
    ],
    solutions: [
      "Fleet Management", "Warehouse Management", "Route Planning",
      "Inventory Optimization", "Last-Mile Delivery", "Supplier Portals",
      "Blockchain Tracking", "IoT Sensors", "Automated Documentation",
      "Cross-border Compliance", "Returns Management", "Carbon Tracking"
    ],
    stats: [
      { value: 35, suffix: "%", label: "Cost Reduction", decimals: 0 },
      { value: 50, suffix: "%", label: "Faster Delivery", decimals: 0 },
      { value: 99, suffix: "%", label: "Accuracy", decimals: 0 }
    ]
  },
  {
    id: 5,
    number: "05",
    title: "Education & EdTech",
    subtitle: "Shaping the Future of Learning",
    description: "Learning management systems, virtual classrooms, and educational platforms that engage students and facilitate modern learning. We're transforming education through technology.",
    icon: <FaGraduationCap className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/5428012/pexels-photo-5428012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    slug: "education-edtech",
    align: "right",
    features: [
      { title: "Virtual Learning", icon: <Globe className="w-4 h-4" />, description: "Engaging online classrooms" },
      { title: "Adaptive Learning", icon: <Zap className="w-4 h-4" />, description: "Personalized education paths" },
      { title: "Assessment Tools", icon: <Award className="w-4 h-4" />, description: "Automated testing & grading" },
      { title: "Analytics Dashboard", icon: <BarChart className="w-4 h-4" />, description: "Student performance insights" }
    ],
    solutions: [
      "Learning Management Systems", "Virtual Classrooms", "Student Portals",
      "Course Authoring", "Assessment Platforms", "Video Learning",
      "Mobile Learning Apps", "Gamification", "Parent Engagement",
      "Administrative Tools", "Library Management", "Career Counseling"
    ],
    stats: [
      { value: 40, suffix: "%", label: "Engagement Boost", decimals: 0 },
      { value: 60, suffix: "%", label: "Cost Savings", decimals: 0 },
      { value: 24, suffix: "/7", label: "Learning Access", decimals: 0 }
    ]
  },
  {
    id: 6,
    number: "06",
    title: "Real Estate & Construction",
    subtitle: "Building Tomorrow with Smart Technology",
    description: "Property management platforms, construction tracking, and real estate marketplaces that streamline operations. We're digitizing the built environment.",
    icon: <FaBuilding className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    slug: "real-estate-construction",
    align: "left",
    features: [
      { title: "Property Management", icon: <Settings className="w-4 h-4" />, description: "Streamlined operations" },
      { title: "Project Tracking", icon: <Clock className="w-4 h-4" />, description: "Real-time construction monitoring" },
      { title: "Marketplace Platform", icon: <Globe className="w-4 h-4" />, description: "Digital property listings" },
      { title: "Tenant Portals", icon: <Users className="w-4 h-4" />, description: "Enhanced resident experience" }
    ],
    solutions: [
      "Property Management Systems", "Construction Management", "CRM for Real Estate",
      "Virtual Tours", "Document Management", "Maintenance Tracking",
      "Lease Management", "Tenant Portals", "Investment Analytics",
      "Smart Building Integration", "Energy Management", "Safety Compliance"
    ],
    stats: [
      { value: 50, suffix: "%", label: "Faster Leasing", decimals: 0 },
      { value: 30, suffix: "%", label: "Cost Reduction", decimals: 0 },
      { value: 99, suffix: "%", label: "Tenant Satisfaction", decimals: 0 }
    ]
  },
  {
    id: 7,
    number: "07",
    title: "Hospitality & Tourism",
    subtitle: "Creating Memorable Guest Experiences",
    description: "Booking engines, property management systems, and guest experience apps for hotels and travel companies. We help hospitality brands delight their guests.",
    icon: <FaHotel className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    slug: "hospitality-tourism",
    align: "right",
    features: [
      { title: "Booking Engine", icon: <Globe className="w-4 h-4" />, description: "Direct booking optimization" },
      { title: "Guest Experience", icon: <Users className="w-4 h-4" />, description: "Personalized service" },
      { title: "Property Management", icon: <Database className="w-4 h-4" />, description: "Streamlined operations" },
      { title: "Revenue Management", icon: <TrendingUp className="w-4 h-4" />, description: "Dynamic pricing" }
    ],
    solutions: [
      "Property Management Systems", "Channel Management", "Booking Engines",
      "Guest Portals", "Loyalty Programs", "Housekeeping Apps",
      "Restaurant Management", "Event Management", "Review Analytics",
      "Concierge Apps", "Mobile Check-in", "Smart Room Controls"
    ],
    stats: [
      { value: 35, suffix: "%", label: "Direct Bookings", decimals: 0 },
      { value: 45, suffix: "%", label: "Guest Satisfaction", decimals: 0 },
      { value: 24, suffix: "/7", label: "Service Access", decimals: 0 }
    ]
  },
  {
    id: 8,
    number: "08",
    title: "Non-Profit & Government",
    subtitle: "Technology for Social Impact",
    description: "Donation platforms, grant management systems, and community engagement tools for social impact. We help organizations amplify their mission through technology.",
    icon: <FaHandsHelping className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    fallbackImage: "https://images.pexels.com/photos/6995222/pexels-photo-6995222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    slug: "non-profit-government",
    align: "left",
    features: [
      { title: "Donation Platforms", icon: <Heart className="w-4 h-4" />, description: "Secure giving experiences" },
      { title: "Grant Management", icon: <Database className="w-4 h-4" />, description: "Streamlined funding" },
      { title: "Community Engagement", icon: <Users className="w-4 h-4" />, description: "Stakeholder connection" },
      { title: "Impact Reporting", icon: <BarChart className="w-4 h-4" />, description: "Transparent outcomes" }
    ],
    solutions: [
      "Donation Management", "Grant Management Systems", "Volunteer Portals",
      "Event Management", "Constituent CRM", "Program Tracking",
      "Impact Analytics", "Compliance Reporting", "Public Portals",
      "Board Management", "Fundraising Tools", "Awareness Campaigns"
    ],
    stats: [
      { value: 50, suffix: "%", label: "Donation Increase", decimals: 0 },
      { value: 40, suffix: "%", label: "Admin Efficiency", decimals: 0 },
      { value: 100, suffix: "%", label: "Transparency", decimals: 0 }
    ]
  }
];

// Helper function to get icon based on feature title
const getFeatureIcon = (featureTitle) => {
  const iconMap = {
    'Network Automation': <Zap className="w-4 h-4" />,
    'AI-Driven Analytics': <BarChart className="w-4 h-4" />,
    'Operational Efficiency': <Settings className="w-4 h-4" />,
    'Customer Experience': <Users className="w-4 h-4" />,
    'Hospital Information Systems': <Database className="w-4 h-4" />,
    'Data Security & Compliance': <Shield className="w-4 h-4" />,
    'Process Automation': <Zap className="w-4 h-4" />,
    'Analytics & AI': <BarChart className="w-4 h-4" />,
    'Digital Banking Platforms': <Smartphone className="w-4 h-4" />,
    'Risk & Compliance': <Shield className="w-4 h-4" />,
    'Automation & AI': <Zap className="w-4 h-4" />,
    'Data Security': <Lock className="w-4 h-4" />,
    'Omnichannel Commerce': <Globe className="w-4 h-4" />,
    'Inventory Intelligence': <Database className="w-4 h-4" />,
    'Personalization': <Users className="w-4 h-4" />,
    'Analytics & Insights': <BarChart className="w-4 h-4" />,
    'Real-time Tracking': <Globe className="w-4 h-4" />,
    'Route Optimization': <Map className="w-4 h-4" />,
    'Warehouse Automation': <Settings className="w-4 h-4" />,
    'Predictive Analytics': <BarChart className="w-4 h-4" />,
    'Virtual Learning': <Globe className="w-4 h-4" />,
    'Adaptive Learning': <Zap className="w-4 h-4" />,
    'Assessment Tools': <Award className="w-4 h-4" />,
    'Analytics Dashboard': <BarChart className="w-4 h-4" />,
    'Property Management': <Settings className="w-4 h-4" />,
    'Project Tracking': <Clock className="w-4 h-4" />,
    'Marketplace Platform': <Globe className="w-4 h-4" />,
    'Tenant Portals': <Users className="w-4 h-4" />,
    'Booking Engine': <Globe className="w-4 h-4" />,
    'Guest Experience': <Users className="w-4 h-4" />,
    'Revenue Management': <TrendingUp className="w-4 h-4" />,
    'Donation Platforms': <Heart className="w-4 h-4" />,
    'Grant Management': <Database className="w-4 h-4" />,
    'Community Engagement': <Users className="w-4 h-4" />,
    'Impact Reporting': <BarChart className="w-4 h-4" />
  };
  return iconMap[featureTitle] || <Layers className="w-4 h-4" />;
};

// Industry data mapping for easy access
const industryData = industries.reduce((acc, industry) => {
  acc[industry.slug] = industry;
  return acc;
}, {});

// Counter component using GSAP
const GSAPCounter = ({ value, suffix, decimals = 0 }) => {
  const counterRef = useRef(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate from 0 to value
          gsap.to({ val: 0 }, {
            val: value,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: function () {
              setCount(this.targets()[0].val);
            }
          });
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={counterRef} className="font-marcellus text-2xl text-black">
      {count.toFixed(decimals)}{suffix}
    </div>
  );
};

export default function IndustryDetailPage({ params }) {
  const { slug } = use(params);

  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredSolution, setHoveredSolution] = useState(null);
  const [activeStat, setActiveStat] = useState(null);

  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef([]);
  const solutionsRef = useRef([]);
  const statsRef = useRef([]);
  const imageRevealRef = useRef(null);
  const contentRevealRef = useRef(null);
  const hoverTl = useRef({});

  // New refs for headings
  const solutionsBadgeRef = useRef(null);
  const solutionsTitleRef = useRef(null);
  const featuresBadgeRef = useRef(null);
  const featuresTitleRef = useRef(null);

  const industry = industryData[slug] || industryData["healthcare"];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Hero content reveal animation
      gsap.fromTo(contentRevealRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Image reveal animation
      gsap.fromTo(imageRevealRef.current,
        { scale: 0.9, opacity: 0, x: 50 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Solutions section heading animations
      gsap.fromTo(solutionsBadgeRef.current,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: solutionsBadgeRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(solutionsTitleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: solutionsBadgeRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Features section heading animations
      gsap.fromTo(featuresBadgeRef.current,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresBadgeRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(featuresTitleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: featuresBadgeRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Features stagger animation
      gsap.fromTo(featuresRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: featuresRef.current[0],
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Solutions stagger animation
      gsap.fromTo(solutionsRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: solutionsRef.current[0],
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats reveal animation
      gsap.fromTo(statsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current[0],
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Continuous floating animation for badge
      gsap.to('.industry-badge', {
        y: -4,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Parallax effect for image
      gsap.to('.industry-image', {
        y: 30,
        scrollTrigger: {
          trigger: '.industry-image',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  // Feature hover handlers
  const handleFeatureMouseEnter = (index) => {
    setHoveredFeature(index);
    const card = featuresRef.current[index];
    if (!card) return;

    if (hoverTl.current[`feature-${index}`]) {
      hoverTl.current[`feature-${index}`].kill();
    }

    const tl = gsap.timeline();
    tl.to(card, {
      scale: 1.05,
      y: -8,
      boxShadow: "0 25px 30px -12px rgba(0, 0, 0, 0.25)",
      borderColor: "#000000",
      duration: 0.4,
      ease: "power2.out"
    });

    hoverTl.current[`feature-${index}`] = tl;
  };

  const handleFeatureMouseLeave = (index) => {
    setHoveredFeature(null);
    const card = featuresRef.current[index];
    if (!card) return;

    if (hoverTl.current[`feature-${index}`]) {
      hoverTl.current[`feature-${index}`].kill();
    }

    const tl = gsap.timeline();
    tl.to(card, {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      borderColor: "#E5E7EB",
      duration: 0.4,
      ease: "power2.out"
    });

    hoverTl.current[`feature-${index}`] = tl;
  };

  // Solution hover handlers - Updated for better scale
  const handleSolutionMouseEnter = (index) => {
    setHoveredSolution(index);
    const card = solutionsRef.current[index];
    if (!card) return;

    if (hoverTl.current[`solution-${index}`]) {
      hoverTl.current[`solution-${index}`].kill();
    }

    // Additional GSAP animations for elements inside the card
    const tl = gsap.timeline();
    tl.to(card.querySelector('p'), {
      x: 4,
      duration: 0.4,
      ease: "power2.out"
    }, 0)
      .to(card.querySelector('.w-3.h-3.bg-black'), {
        scale: 1.5,
        duration: 0.4,
        ease: "back.out(1.2)"
      }, 0);

    hoverTl.current[`solution-${index}`] = tl;
  };

  const handleSolutionMouseLeave = (index) => {
    setHoveredSolution(null);
    const card = solutionsRef.current[index];
    if (!card) return;

    if (hoverTl.current[`solution-${index}`]) {
      hoverTl.current[`solution-${index}`].kill();
    }

    const tl = gsap.timeline();
    tl.to(card.querySelector('p'), {
      x: 0,
      duration: 0.3,
      ease: "power2.out"
    }, 0)
      .to(card.querySelector('.w-3.h-3.bg-black'), {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      }, 0);

    hoverTl.current[`solution-${index}`] = tl;
  };

  // Stat hover handlers
  const handleStatMouseEnter = (index) => {
    setActiveStat(index);
    const card = statsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: 1.05,
      y: -4,
      backgroundColor: "#F3F4F6",
      borderColor: "#000000",
      boxShadow: "0 15px 20px -8px rgba(0, 0, 0, 0.15)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleStatMouseLeave = (index) => {
    setActiveStat(null);
    const card = statsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: 1,
      y: 0,
      backgroundColor: "#F9FAFB",
      borderColor: "#E5E7EB",
      boxShadow: "none",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button with enhanced animation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/industries"
          className="group inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors font-manrope relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-10"></span>
          <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
          Back to Industries
        </Link>
      </div>

      {/* Hero Section - Premium Monochrome */}
      <section ref={sectionRef} className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Content */}
            <div ref={contentRevealRef} className="relative">
              {/* Industry Badge with floating animation */}
              <div className="industry-badge inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6 border border-gray-300">
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white p-1 mr-2">
                  {industry.icon}
                </div>
                <span className="text-sm font-manrope text-gray-800 tracking-wide">INDUSTRY EXPERTISE</span>
              </div>

              {/* Title */}
              <div className="relative inline-block mb-4 group">
                <h1 className="font-marcellus text-5xl md:text-6xl lg:text-7xl text-gray-900">
                  {industry.title}
                </h1>
              </div>

              {/* Subtitle */}
              <h2 className="font-manrope text-xl text-gray-700 mb-6 leading-relaxed">
                {industry.subtitle}
              </h2>

              {/* Description */}
              <p className="font-instrument text-gray-600 leading-relaxed text-lg">
                {industry.description}
              </p>

              {/* Stats Section with GSAP Counters */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {industry.stats.map((stat, index) => (
                  <div
                    key={index}
                    ref={el => statsRef.current[index] = el}
                    className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-300 cursor-default hover:bg-gray-100"
                    onMouseEnter={() => handleStatMouseEnter(index)}
                    onMouseLeave={() => handleStatMouseLeave(index)}
                  >
                    <GSAPCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                    />
                    <div className="font-manrope text-xs text-gray-600 uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-20 -right-10 w-40 h-40 bg-gray-200 rounded-full filter blur-3xl opacity-30"></div>
              <div className="absolute -z-10 bottom-20 -left-10 w-40 h-40 bg-gray-300 rounded-full filter blur-3xl opacity-20"></div>
            </div>

            {/* Right Column - Premium Image with reveal */}
            <div ref={imageRevealRef} className="relative group">
              <div className="relative h-[300px] md:h-[600px] w-[300px] md:w-[600px]  rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={() => setImageError(true)}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black opacity-10 mix-blend-multiply"></div>

                {/* Animated overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Decorative patterns */}
                <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                  <div className="absolute top-10 left-10 w-20 h-20 border border-white/30 rounded-full"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/20 rounded-full"></div>
                </div>
              </div>

              {/* Floating icon with animation */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-300 transform group-hover:rotate-12 transition-transform duration-500">
                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white">
                  {industry.icon}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section - Premium Interactive Grid with Enhanced Scale */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Badge with reveal */}
            <div
              ref={solutionsBadgeRef}
              className="inline-flex items-center bg-white rounded-full px-4 py-2 mb-4 border border-gray-300"
            >
              <Layers className="w-4 h-4 mr-2 text-gray-700" />
              <span className="text-sm font-manrope text-gray-800 tracking-wide">WHAT WE OFFER</span>
            </div>

            {/* Title with reveal */}
            <h2
              ref={solutionsTitleRef}
              className="font-marcellus text-4xl md:text-5xl text-gray-900 mb-4"
            >
              Our <span className="text-gray-400 italic">Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industry.solutions.map((solution, index) => (
              <div
                key={index}
                ref={el => solutionsRef.current[index] = el}
                className="group relative bg-white p-6 rounded-xl border border-gray-200 transition-all duration-500 cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-black/10"
                onMouseEnter={() => handleSolutionMouseEnter(index)}
                onMouseLeave={() => handleSolutionMouseLeave(index)}
                style={{
                  transform: hoveredSolution === index ? 'scale(1.02) translateY(-4px)' : 'scale(1) translateY(0)',
                }}
              >
                {/* Animated background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Scale overlay from center */}
                <div className="absolute inset-0 bg-black transform scale-0 group-hover:scale-100 transition-transform duration-700 ease-out rounded-xl opacity-0 group-hover:opacity-5"></div>

                {/* Content with enhanced animations */}
                <div className="flex items-center gap-4 relative z-10">
                  {/* Animated dot with pulse effect */}
                  <div className="relative">
                    <div className="w-3 h-3 bg-black rounded-full group-hover:scale-150 group-hover:bg-gray-800 transition-all duration-500"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-black rounded-full animate-ping opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  </div>

                  {/* Text with scale and color transition */}
                  <p className="font-manrope text-gray-800 group-hover:text-gray-900 transition-all duration-500 group-hover:translate-x-1 text-base md:text-lg">
                    {solution}
                  </p>

                  {/* Subtle arrow on hover */}
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-500 text-gray-700" />
                </div>

                {/* Bottom border animation */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Premium Interactive Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Badge with reveal */}
            <div
              ref={featuresBadgeRef}
              className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4 border border-gray-300"
            >
              <Sparkles className="w-4 h-4 mr-2 text-gray-700" />
              <span className="text-sm font-manrope text-gray-800 tracking-wide">KEY CAPABILITIES</span>
            </div>

            {/* Title with reveal */}
            <h2
              ref={featuresTitleRef}
              className="font-marcellus text-4xl md:text-5xl text-gray-900 mb-4"
            >
              What Makes Us <span className="text-gray-400 italic">Different</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industry.features.map((feature, index) => (
              <div
                key={index}
                ref={el => featuresRef.current[index] = el}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 cursor-default group relative overflow-hidden"
                onMouseEnter={() => handleFeatureMouseEnter(index)}
                onMouseLeave={() => handleFeatureMouseLeave(index)}
              >
                {/* Subtle background animation */}
                <div className="absolute inset-0 bg-gray-50 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <div className="text-black">
                      {getFeatureIcon(feature.title)}
                    </div>
                  </div>
                  <h3 className="font-manrope font-semibold text-lg text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-instrument text-sm text-gray-600">
                    {feature.description}
                  </p>
                  <div className="w-0 h-0.5 bg-black mt-4 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}