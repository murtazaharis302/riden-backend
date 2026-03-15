// components/Footer.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { subscribeNewsletter } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const columnsRef = useRef([]);
  const socialRefs = useRef([]);
  const newsletterRef = useRef(null);
  const bigLogoRef = useRef(null);
  const privacyLinksRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ message: '', success: false });
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Targets to animate — visible by default, revealed on scroll
    const revealTargets = [
      newsletterRef.current,
      ...columnsRef.current.filter(Boolean),
      privacyLinksRef.current,
    ].filter(Boolean);

    gsap.set(revealTargets, { opacity: 0, y: 35 });
    gsap.set(bigLogoRef.current, { opacity: 0, y: 20 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Reveal newsletter + columns + privacy in stagger
            gsap.to(revealTargets, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
            });
            // Big logo fades in last
            gsap.to(bigLogoRef.current, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              delay: 0.4,
              ease: "power4.out",
            });
            // Ambient sparkle pulse
            gsap.to(".sparkle-icon", {
              scale: 1.1,
              rotate: 5,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 0.8,
            });
            // Ambient logo pulse
            gsap.to(bigLogoRef.current, {
              scale: 1.03,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 1.5,
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      observer.disconnect();
      gsap.killTweensOf([...revealTargets, bigLogoRef.current, ".sparkle-icon"]);
      gsap.set([...revealTargets, bigLogoRef.current], { clearProps: "all" });
    };
  }, [mounted, pathname]);


  // Hover handlers for social icons
  const handleSocialEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.2,
      rotate: 5,
      backgroundColor: "rgba(255,255,255,0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSocialLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotate: 0,
      backgroundColor: "transparent",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Hover handlers for links
  const handleLinkEnter = (e) => {
    gsap.to(e.currentTarget, {
      x: 5,
      color: "#ffffff",
      duration: 0.2,
      ease: "power1.out"
    });
  };

  const handleLinkLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      color: "#9ca3af",
      duration: 0.2,
      ease: "power1.out"
    });
  };

  // Hover handlers for subscribe button
  const handleSubscribeEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(255,255,255,0.2)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSubscribeLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "none",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  if (!mounted) return (
    <footer
      ref={footerRef}
      className="w-full bg-black text-white overflow-hidden relative"
      style={{
        zIndex: 20,
        minHeight: "100vh",
        marginTop: 0,
        paddingTop: "4rem",
        paddingBottom: "2rem"
      }}
    />
  );

  return (
    <footer
      ref={footerRef}
      className="w-full bg-black text-white overflow-hidden relative"
      style={{
        zIndex: 20,
        minHeight: "100vh",
        marginTop: 0,
        paddingTop: "4rem",
        paddingBottom: "2rem"
      }}
    >
      {/* Main Footer Content */}
      <div
        ref={contentRef}
        className="w-full h-full px-6 md:px-20"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Newsletter Section */}
          <div
            ref={newsletterRef}
            className="mb-20 border-b border-gray-800 pb-16"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
              {/* Left: Badge + Title */}
              <div className="flex-shrink-0 max-w-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="sparkle-icon w-5 h-5 text-gray-200" />
                  <span className="font-['Manrope'] text-xs text-gray-100 tracking-wider">NEWSLETTER</span>
                </div>
                <h2 className="font-['Manrope'] font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                  Get the latest tips for social media growth and marketing straight to your inbox!
                </h2>
              </div>

              {/* Right: Form */}
              <div className="flex-shrink-0 w-full lg:max-w-xl">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="jhon@example.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-6 py-4 bg-transparent border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-all duration-300 font-['Manrope'] text-sm hover:border-gray-600"
                  />
                  <button
                    onMouseEnter={handleSubscribeEnter}
                    onMouseLeave={handleSubscribeLeave}
                    onClick={async () => {
                      if (!newsletterEmail) return;
                      setSubscribing(true);
                      const result = await subscribeNewsletter(newsletterEmail);
                      setSubscribing(false);
                      if (result.success) {
                        setNewsletterStatus({ message: 'Subscribed successfully!', success: true });
                        setNewsletterEmail('');
                      } else {
                        setNewsletterStatus({ message: result.error || 'Failed to subscribe', success: false });
                      }
                      setTimeout(() => setNewsletterStatus({ message: '', success: false }), 3000);
                    }}
                    disabled={subscribing}
                    className="subscribe-btn group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-white/10 font-['Manrope'] text-sm font-medium"
                  >
                    <span className="relative z-10">{subscribing ? 'Subscribing...' : 'Subscribe'}</span>
                    <Send className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </button>
                </div>
                {newsletterStatus.message && (
                  <p className={`font-['Manrope'] text-xs mt-2 ${newsletterStatus.success ? 'text-green-400' : 'text-red-400'}`}>
                    {newsletterStatus.message}
                  </p>
                )}
                <p className="font-['Manrope'] text-xs text-gray-300 mt-4">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 mb-16">
            {/* Site Map */}
            <div ref={el => columnsRef.current[0] = el} className="space-y-4">
              <h3 className="font-['Manrope'] text-gray-200 text-xs tracking-wider">SITE MAP</h3>
              <ul className="space-y-2">
                {['Home', 'Services', 'Pricing', 'Blogs', 'Projects'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                      className="footer-link font-['Manrope'] text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div ref={el => columnsRef.current[1] = el} className="space-y-4">
              <h3 className="font-['Manrope'] text-gray-200 text-xs tracking-wider">SUPPORT</h3>
              <ul className="space-y-2">
                {['Contact Us', 'About Us', 'Team Member', 'Login Now', 'Register Now'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                      className="footer-link font-['Manrope'] text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Utilities */}
            <div ref={el => columnsRef.current[2] = el} className="space-y-4">
              <h3 className="font-['Manrope'] text-gray-200 text-xs tracking-wider">UTILITIES</h3>
              <ul className="space-y-2">
                {['Licensing', 'Style Guide', 'Changelog', 'Instructions', '404 Not Found'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                      className="footer-link font-['Manrope'] text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div ref={el => columnsRef.current[3] = el} className="space-y-4">
              <h3 className="font-['Manrope'] text-gray-200 text-xs tracking-wider">CONTACT US</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 group">
                  <Phone className="w-4 h-4 text-gray-100 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" />
                  <a
                    href="tel:+91123456789"
                    onMouseEnter={handleLinkEnter}
                    onMouseLeave={handleLinkLeave}
                    className="footer-link font-['Manrope'] text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    +91 123 456789
                  </a>
                </div>

                <div className="flex items-center gap-3 group">
                  <Mail className="w-4 h-4 text-gray-100 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" />
                  <a
                    href="mailto:hello@domain.com"
                    onMouseEnter={handleLinkEnter}
                    onMouseLeave={handleLinkLeave}
                    className="footer-link font-['Manrope'] text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    hello@domain.com
                  </a>
                </div>

                <div className="flex items-start gap-3 group">
                  <MapPin className="w-4 h-4 text-gray-100 flex-shrink-0 mt-1 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="font-['Manrope'] text-gray-300 text-sm">
                    Springfield 1234 Elmwood Street, IL 62701 USA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar & Privacy Links */}
          <div className="border-t border-gray-800 pt-6 relative z-[60] pointer-events-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <p className="font-['Manrope'] text-xs text-gray-400">
                © {currentYear} RidenTech. All rights reserved.
              </p>

              {/* Privacy Flex */}
              <div
                ref={privacyLinksRef}
                className="flex items-center gap-6"
              >
                <Link
                  href="/privacy"
                  onMouseEnter={handleLinkEnter}
                  onMouseLeave={handleLinkLeave}
                  className="footer-link font-['Manrope'] text-xs text-gray-400 hover:text-white transition-colors duration-300 pointer-events-auto"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  onMouseEnter={handleLinkEnter}
                  onMouseLeave={handleLinkLeave}
                  className="footer-link font-['Manrope'] text-xs text-gray-400 hover:text-white transition-colors duration-300 pointer-events-auto"
                >
                  Terms
                </Link>
                <Link
                  href="/sitemap"
                  onMouseEnter={handleLinkEnter}
                  onMouseLeave={handleLinkLeave}
                  className="footer-link font-['Manrope'] text-xs text-gray-400 hover:text-white transition-colors duration-300 pointer-events-auto"
                >
                  Sitemap
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {[
                  { Icon: FaFacebookF, href: "https://facebook.com", label: "Facebook", hoverColor: "#1877F2" },
                  { Icon: FaXTwitter, href: "https://x.com", label: "X", hoverColor: "#ffffff" },
                  { Icon: FaInstagram, href: "https://instagram.com", label: "Instagram", hoverColor: "#E1306C" },
                  { Icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn", hoverColor: "#0A66C2" },
                  { Icon: FaYoutube, href: "https://youtube.com", label: "YouTube", hoverColor: "#FF0000" },
                ].map(({ Icon, href, label, hoverColor }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="relative z-[60] py-2 px-2 hover:bg-white/5 w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 transition-all duration-300 hover:scale-110 pointer-events-auto"
                    onMouseEnter={e => {
                      e.currentTarget.style.color = hoverColor;
                      e.currentTarget.style.borderColor = hoverColor;
                      e.currentTarget.style.boxShadow = `0 0 10px ${hoverColor}66`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.borderColor = '';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <Icon className="w-5 h-5 pointer-events-none" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={bigLogoRef}
        className="w-full text-center mt-8 pb-4 pointer-events-none overflow-hidden"
      >
        <h1 className="font-['Manrope'] text-[20vw] md:text-[25vw] lg:text-[23vw] font-black uppercase text-white/10 hover:text-white/20 leading-[0.8] tracking-tight select-none transition-all duration-500 hover:scale-105 inline-block">
          RIDEN
        </h1>
      </div>
    </footer>
  );
}