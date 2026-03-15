// components/Navbar.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import gsap from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Refs for GSAP animations
  const navbarRef = useRef(null);
  const navLinksRef = useRef([]);
  const ctaButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const dropdownRefs = useRef({});
  const underlineRefs = useRef({});
  const mobileDropdownRefs = useRef({});
  const logoRef = useRef(null);
  const accentLineRef = useRef(null);
  
  // Timeout ref for hover delay
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Run animations after mounted
  useEffect(() => {
    if (!mounted) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Navbar slide down
      tl.fromTo(navbarRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      );
      
      // Accent line animation
      tl.fromTo(accentLineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.5, ease: "power4.out" },
        "-=0.8"
      );
      
      // Logo fade in
      if (logoRef.current) {
        tl.fromTo(logoRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );
      }
      
      // Nav links fade in one by one
      const validNavLinks = navLinksRef.current.filter(el => el);
      if (validNavLinks.length > 0) {
        tl.fromTo(validNavLinks,
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: 0.6, 
            stagger: 0.1, 
            ease: "power2.out"
          },
          "-=0.4"
        );
      }
      
      // CTA button fade in
      if (ctaButtonRef.current) {
        tl.fromTo(ctaButtonRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
      }
    });

    return () => ctx.revert();
  }, [mounted]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
        gsap.to(navbarRef.current, {
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 1)",
          backdropFilter: isScrolled ? "blur(8px)" : "blur(0px)",
          duration: 0.6,
          ease: "power3.inOut"
        });
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Animate mobile menu
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" }
      );
      
      gsap.fromTo(
        mobileMenuRef.current.children,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  // Animate desktop dropdown
  useEffect(() => {
    if (window.innerWidth >= 1024 && activeDropdown && dropdownRefs.current[activeDropdown]) {
      const dropdown = dropdownRefs.current[activeDropdown];
      
      gsap.fromTo(dropdown,
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      
      gsap.fromTo(
        dropdown.querySelectorAll('.dropdown-item'),
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.03, delay: 0.1, ease: "power2.out" }
      );
    }
  }, [activeDropdown]);

  // Animate mobile dropdown expand/collapse
  useEffect(() => {
    Object.keys(mobileExpanded).forEach((key) => {
      const element = mobileDropdownRefs.current[key];
      if (element) {
        if (mobileExpanded[key]) {
          element.style.height = 'auto';
          const height = element.scrollHeight;
          element.style.height = '0px';
          element.offsetHeight;
          
          gsap.to(element, {
            height: height,
            opacity: 1,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => {
              element.style.height = 'auto';
            }
          });
        } else {
          const height = element.scrollHeight;
          element.style.height = height + 'px';
          element.offsetHeight;
          
          gsap.to(element, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in"
          });
        }
      }
    });
  }, [mobileExpanded]);

  // Animate underline on hover
  const handleUnderlineHover = (key, isHovering) => {
    if (underlineRefs.current[key]) {
      gsap.to(underlineRefs.current[key], {
        scaleX: isHovering ? 1 : 0,
        duration: 0.5,
        ease: "power3.out"
      });
    }
  };

  // Clear any existing hover timeout
  const clearHoverTimeout = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  // Handle mouse enter on nav item
  const handleNavItemEnter = (title) => {
    clearHoverTimeout();
    if (window.innerWidth >= 1024) {
      if (activeDropdown !== title) {
        if (activeDropdown) {
          handleUnderlineHover(`${activeDropdown}-desktop`, false);
        }
        setActiveDropdown(title);
        handleUnderlineHover(`${title}-desktop`, true);
      }
    }
  };

  // Handle mouse leave from nav item
  const handleNavItemLeave = () => {
    clearHoverTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      if (window.innerWidth >= 1024 && activeDropdown) {
        const dropdown = dropdownRefs.current[activeDropdown];
        if (!dropdown || !dropdown.matches(':hover')) {
          handleUnderlineHover(`${activeDropdown}-desktop`, false);
          setActiveDropdown(null);
        }
      }
      hoverTimeoutRef.current = null;
    }, 100);
  };

  // Handle mouse enter on dropdown
  const handleDropdownEnter = (title) => {
    clearHoverTimeout();
    if (window.innerWidth >= 1024) {
      if (activeDropdown !== title) {
        if (activeDropdown) {
          handleUnderlineHover(`${activeDropdown}-desktop`, false);
        }
        setActiveDropdown(title);
        handleUnderlineHover(`${title}-desktop`, true);
      }
    }
  };

  // Handle mouse leave from dropdown
  const handleDropdownLeave = (title) => {
    clearHoverTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      if (window.innerWidth >= 1024 && activeDropdown === title) {
        const navItem = document.querySelector(`[data-navitem="${title}"]`);
        if (!navItem || !navItem.matches(':hover')) {
          handleUnderlineHover(`${title}-desktop`, false);
          setActiveDropdown(null);
        }
      }
      hoverTimeoutRef.current = null;
    }, 100);
  };

  // Handle click on nav item with dropdown
  const handleNavItemClick = (e, item) => {
    if (item.href) {
      // Navigate to the main page
      window.location.href = item.href;
    }
  };

  // Handle click on dropdown link
  const handleDropdownLinkClick = () => {
    handleUnderlineHover(`${activeDropdown}-desktop`, false);
    setActiveDropdown(null);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const navItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
      dropdown: [
        { title: "Our Expertise", href: "/about/expertise", description: "Discover our core competencies and specialized skills" },
        { title: "Team", href: "/about/team", description: "Meet the experienced professionals behind our success" },
        { title: "Testimonials", href: "/about/testimonials", description: "Read what our clients say about working with us" }
      ]
    },
    {
      title: "Services",
      href: "/services",
      dropdown: [
        { title: "Custom Software Development", href: "/services/custom-software", category: "Development" },
        { title: "Social Media Management", href: "/services/social-media", category: "Marketing" },
        { title: "Cloud Architecture", href: "/services/cloud-architecture", category: "Cloud" },
        { title: "Database Architecture", href: "/services/database", category: "Data" },
        { title: "Web & PWA Engineering", href: "/services/web-pwa", category: "Development" },
        { title: "Mobile App Development", href: "/services/mobile-app", category: "Development" },
        { title: "API & Systems Integration", href: "/services/api-integration", category: "Integration" },
        { title: "AI & Machine Learning", href: "/services/ai-ml", category: "AI & ML" },
        { title: "DevOps & Automation", href: "/services/devops", category: "DevOps" },
        { title: "UI/UX Design", href: "/services/ui-ux", category: "Design" },
        { title: "Performance Marketing", href: "/services/performance-marketing", category: "Marketing" },
        { title: "SEO & Growth Strategy", href: "/services/seo", category: "Marketing" },
        { title: "Business Process Outsourcing", href: "/services/bpo", category: "Outsourcing" },
        { title: "Managed IT Services", href: "/services/managed-it", category: "IT Services" },
        { title: "Cloud Workspace Management", href: "/services/cloud-workspace", category: "Cloud" },
        { title: "E-Commerce Solutions", href: "/services/ecommerce", category: "E-Commerce" },
        { title: "Strategic Content Writing", href: "/services/content-writing", category: "Content" },
        { title: "Data Lifecycle Management", href: "/services/data-lifecycle", category: "Data" }
      ]
    },
    {
      title: "Industries",
      href: "/industries",
      dropdown: [
        { title: "Healthcare & Life Sciences", href: "/industries/healthcare-life-sciences" },
        { title: "Finance & Legal", href: "/industries/finance-legal" },
        { title: "Retail & E-Commerce", href: "/industries/retail-ecommerce" },
        { title: "Logistics & Supply Chain", href: "/industries/logistics-supply-chain" },
        { title: "Education & EdTech", href: "/industries/education-edtech" },
        { title: "Real Estate & Construction", href: "/industries/real-estate-construction" },
        { title: "Hospitality & Tourism", href: "/industries/hospitality-tourism" },
        { title: "Non-Profit & Government", href: "/industries/non-profit-government" }
      ]
    },
    {
      title: "Blogs",
      href: "/blogs"
    },
    {
      title: "Contact",
      href: "/contact"
    }
  ];

  // Group services by category
  const groupedServices = navItems.find(item => item.title === "Services")?.dropdown.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  // Toggle mobile dropdown
  const toggleMobileDropdown = (title) => {
    setMobileExpanded(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <nav
      ref={navbarRef}
      className={`fixed w-full z-50 top-0 transition-shadow duration-700 ${
        scrolled ? "shadow-lg border-b border-gray-100" : "border-b border-gray-100"
      }`}
      style={{ backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 1)", backdropFilter: scrolled ? "blur(8px)" : "none" }}
    >
      {/* Premium accent line */}
      <div 
        ref={accentLineRef}
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900"
        style={{ transform: "scaleX(0)", transformOrigin: "left" }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with Marcellus font */}
          <div className="flex-shrink-0" ref={logoRef} style={{ opacity: 0 }}>
            <Link href="/" className="font-marcellus text-2xl tracking-wide text-gray-900">
              Riden<span className="text-gray-500 ml-1 text-lg font-light">Tech</span>
            </Link>
          </div>

          {/* Desktop Menu - Only visible on large screens (lg) */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1 gap-5">
            {navItems.map((item, index) => (
              <div
                key={item.title}
                className="relative"
                ref={el => navLinksRef.current[index] = el}
                style={{ opacity: 0 }}
                data-navitem={item.title}
                onMouseEnter={() => handleNavItemEnter(item.title)}
                onMouseLeave={handleNavItemLeave}
              >
                {item.dropdown ? (
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className=" py-2 text-sm font-medium relative group font-manrope text-gray-600 hover:text-gray-900"
                      onClick={() => handleDropdownLinkClick()}
                    >
                      {item.title}
                    </Link>
                    <button
                      className="py-2"
                      onMouseEnter={() => handleNavItemEnter(item.title)}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    
                    {/* Hover underline effect */}
                    <span
                      ref={el => underlineRefs.current[`${item.title}-desktop`] = el}
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform scale-x-0"
                    ></span>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="relative px-0 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 group inline-block font-manrope"
                    onMouseEnter={() => {
                      if (window.innerWidth >= 1024) {
                        handleUnderlineHover(`${item.title}-desktop`, true);
                      }
                    }}
                    onMouseLeave={() => handleUnderlineHover(`${item.title}-desktop`, false)}
                  >
                    {item.title}
                    <span
                      ref={el => underlineRefs.current[`${item.title}-desktop`] = el}
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform scale-x-0"
                    ></span>
                  </Link>
                )}

                {/* Full Width Dropdown Menu - Only for desktop */}
                {item.dropdown && activeDropdown === item.title && window.innerWidth >= 1024 && (
                  <div
                    ref={el => dropdownRefs.current[item.title] = el}
                    className="fixed left-0 right-0 top-20 w-screen bg-white border-t border-gray-100 shadow-xl z-50"
                    style={{ left: 0, right: 0 }}
                    onMouseEnter={() => handleDropdownEnter(item.title)}
                    onMouseLeave={() => handleDropdownLeave(item.title)}
                  >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                      {item.title === "Services" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8">
                          {Object.entries(groupedServices).map(([category, services]) => (
                            <div key={category} className="mb-6">
                              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 font-manrope">
                                {category}
                              </h3>
                              <div className="flex flex-col space-y-1">
                                {services.map((service) => (
                                  <Link
                                    key={service.title}
                                    href={service.href}
                                    className="group/link dropdown-item"
                                    onClick={handleDropdownLinkClick}
                                  >
                                    <div className="flex items-center justify-between py-1.5 hover:bg-gray-50 px-2 -mx-2 rounded-sm transition-all duration-300">
                                      <span className="text-sm text-gray-700 group-hover/link:text-gray-900 font-instrument">
                                        {service.title}
                                      </span>
                                      <ArrowRight className="w-3 h-3 text-gray-400 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : item.title === "Industries" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6">
                          {item.dropdown.map((industry) => (
                            <Link
                              key={industry.title}
                              href={industry.href}
                              className="group dropdown-item"
                              onClick={handleDropdownLinkClick}
                            >
                              <div className="flex items-center justify-between py-1.5 hover:bg-gray-50 px-2 -mx-2 rounded-sm transition-all duration-300">
                                <span className="text-sm text-gray-700 group-hover:text-gray-900 font-instrument">
                                  {industry.title}
                                </span>
                                <ArrowRight className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                          {item.dropdown.map((dropItem) => (
                            <Link
                              key={dropItem.title}
                              href={dropItem.href}
                              className="group dropdown-item"
                              onClick={handleDropdownLinkClick}
                            >
                              <div className="py-1.5 hover:bg-gray-50 px-2 -mx-2 rounded-sm transition-all duration-300">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900 group-hover:text-gray-700 font-instrument">
                                      {dropItem.title}
                                    </div>
                                    {dropItem.description && (
                                      <div className="text-xs text-gray-500 font-instrument">
                                        {dropItem.description}
                                      </div>
                                    )}
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 ml-2 mt-0.5" />
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA Button - Only visible on large screens */}
          <div className="hidden lg:block" ref={ctaButtonRef} style={{ opacity: 0 }}>
            <Link
              href="/contact"
              className="relative group inline-flex items-center space-x-2 bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-gray-900/20 font-manrope"
              onMouseEnter={() => handleUnderlineHover('cta', true)}
              onMouseLeave={() => handleUnderlineHover('cta', false)}
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </Link>
          </div>

          {/* Mobile/Tablet menu button - Visible up to lg breakpoint */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none transition-all duration-300"
            >
              {isOpen ? <X className="w-6 h-6 transition-transform duration-300 rotate-90" /> : <Menu className="w-6 h-6 transition-transform duration-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu with Collapsible Dropdowns - Visible up to lg breakpoint */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden bg-white border-t border-gray-100 shadow-xl"
        >
          <div className="px-4 py-6 max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.title} className="mb-3">
                {item.dropdown ? (
                  <div>
                    {/* Mobile category header */}
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="py-3 px-0 text-sm font-medium text-gray-600 hover:text-gray-900 transition-all duration-300 font-manrope"
                        onClick={() => {
                          setIsOpen(false);
                          setMobileExpanded({});
                        }}
                      >
                        {item.title}
                      </Link>
                      <button
                        onClick={() => toggleMobileDropdown(item.title)}
                        className="p-2"
                      >
                        <ChevronDown
                          className={`w-4 h-4 text-gray-500 transition-all duration-500 ${
                            mobileExpanded[item.title] ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    
                    {/* Collapsible dropdown items */}
                    <div
                      ref={el => mobileDropdownRefs.current[item.title] = el}
                      className="overflow-hidden"
                      style={{ height: 0, opacity: 0 }}
                    >
                      <div className="space-y-1 pt-3 pl-4">
                        {item.dropdown.map((dropItem) => (
                          <Link
                            key={dropItem.title}
                            href={dropItem.href}
                            className="flex items-center justify-between py-2 pl-5 pr-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 font-instrument"
                            onClick={() => {
                              setIsOpen(false);
                              setMobileExpanded({});
                            }}
                          >
                            <span>{dropItem.title}</span>
                            <ArrowRight className="w-3 h-3 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="relative block py-3 px-0 text-sm font-medium text-gray-600 hover:text-gray-900 transition-all duration-300 font-manrope group w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile CTA Button */}
            <div className="pt-6 mt-3 border-t border-gray-100">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full space-x-2 bg-gray-900 text-white px-6 py-3.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300 font-manrope"
                onClick={() => setIsOpen(false)}
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;