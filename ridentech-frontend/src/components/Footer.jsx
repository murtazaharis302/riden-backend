// components/Footer.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, Youtube, Sparkles, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  // Settings State
  const [settings, setSettings] = useState({
    phone: "+91 123 456789",
    email: "hello@domain.com",
    address: "Springfield 1234 Elmwood Street, IL 62701 USA"
  });

  // Newsletter State
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Company Settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`);
        if (res.ok) {
          const data = await res.json();
          // Data is an associative object from pluck('value', 'key')
          setSettings(prev => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  // Handle Newsletter Submission
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", message: "Successfully subscribed! Thank you." });
        setEmail("");
      } else {
        setStatus({ type: "error", message: data.message || "Failed to subscribe. Please try again." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Server error. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states for all elements
      gsap.set([contentRef.current, newsletterRef.current, ...columnsRef.current, ...socialRefs.current, bigLogoRef.current, privacyLinksRef.current], {
        opacity: 0,
        y: 50
      });

      // Create master timeline with scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // 1. Content container fade in
      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      });

      // 2. Newsletter section with bounce
      tl.to(newsletterRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.6");

      // 3. Columns stagger with rotation and fade
      tl.to(columnsRef.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      }, "-=0.4");

      // 4. Social icons pop with rotation
      tl.to(socialRefs.current, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.3");

      // 5. Big logo dramatic reveal
      tl.to(bigLogoRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power4.out"
      }, "-=0.2");

      // 6. Privacy links fade in
      tl.to(privacyLinksRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");

      // Add continuous subtle animations

      // Sparkle icon pulse
      gsap.to(".sparkle-icon", {
        scale: 1.1,
        rotate: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Big logo subtle pulse
      gsap.to(bigLogoRef.current, {
        scale: 1.05,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2
      });

      // Add hover animations for interactive elements

      // Social icons hover
      socialRefs.current.forEach((icon) => {
        if (!icon) return;
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.2,
            rotate: 5,
            backgroundColor: "rgba(255,255,255,0.1)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            backgroundColor: "transparent",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

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
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="sparkle-icon w-5 h-5 text-gray-200" />
              <span className="font-['Manrope'] text-xs text-gray-100 tracking-wider">NEWSLETTER</span>
            </div>
            <h2 className="font-['Marcellus'] text-3xl md:text-4xl lg:text-5xl text-white mb-8 max-w-3xl leading-tight">
              Get the latest tips for social media growth and marketing straight to your inbox!
            </h2>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-2xl">
              <input
                type="email"
                placeholder="jhon@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="flex-1 px-6 py-4 bg-transparent border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-all duration-300 font-['Manrope'] text-sm hover:border-gray-600 disabled:opacity-50"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="subscribe-btn group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-white/10 font-['Manrope'] text-sm font-medium disabled:opacity-50"
              >
                <span className="relative z-10">{isSubmitting ? "Subscribing..." : "Subscribe"}</span>
                {!isSubmitting && <Send className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
            </form>
            {status.message && (
              <p className={`font-['Manrope'] text-sm mt-4 ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {status.message}
              </p>
            )}
            <p className="font-['Manrope'] text-xs text-gray-300 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 mb-16">
            {/* Site Map */}
            <div ref={el => columnsRef.current[0] = el} className="space-y-4">
              <h3 className="font-['Manrope'] text-gray-200 text-xs tracking-wider">SITE MAP</h3>
              <ul className="space-y-2">
                {['Home', 'Services', 'Pricing', 'Blogs', 'Projects'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="footer-link font-['Manrope'] text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block">
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
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="footer-link font-['Manrope'] text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block">
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
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="footer-link font-['Manrope'] text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block">
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
                  <a href={`tel:${settings.phone}`} className="footer-link font-['Manrope'] text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                    {settings.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3 group">
                  <Mail className="w-4 h-4 text-gray-100 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" />
                  <a href={`mailto:${settings.email}`} className="footer-link font-['Manrope'] text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                    {settings.email}
                  </a>
                </div>

                <div className="flex items-start gap-3 group">
                  <MapPin className="w-4 h-4 text-gray-100 flex-shrink-0 mt-1 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="font-['Manrope'] text-gray-300 text-sm">
                    {settings.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-['Manrope'] text-xs text-gray-100 order-2 md:order-1">
                © {currentYear} RidenTech. All rights reserved.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  { icon: <Facebook className="w-4 h-4" />, href: "#", label: "FB" },
                  { icon: <Twitter className="w-4 h-4" />, href: "#", label: "TW" },
                  { icon: <Instagram className="w-4 h-4" />, href: "#", label: "IG" },
                  { icon: <Linkedin className="w-4 h-4" />, href: "#", label: "LI" },
                  { icon: <Youtube className="w-4 h-4" />, href: "#", label: "YT" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    ref={el => socialRefs.current[index] = el}
                    className="w-10 h-10 border bg-white border-gray-800 hover:border-gray-600 rounded-full flex items-center justify-center text-gray-900 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Large RIDEN Logo */}
          <div
            ref={bigLogoRef}
            className="w-full text-center my-8 flex flex-col items-center justify-center p-8 bg-white/5 rounded-3xl"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <Layers className="w-10 h-10 text-black px-1" />
            </div>
            <h1 className="font-['Marcellus'] text-[10vw] font-black uppercase text-white leading-none tracking-tight select-none">
              RIDEN<span className="text-gray-500 font-light lowercase text-[5vw]">Tech</span>
            </h1>
          </div>

          {/* Privacy Links */}
          <div
            ref={privacyLinksRef}
            className="flex justify-center gap-6"
          >
            <Link href="/privacy" className="footer-link font-['Manrope'] text-xs text-gray-100 hover:text-white transition-colors duration-300">
              Privacy
            </Link>
            <Link href="/terms" className="footer-link font-['Manrope'] text-xs text-gray-100 hover:text-white transition-colors duration-300">
              Terms
            </Link>
            <Link href="/sitemap" className="footer-link font-['Manrope'] text-xs text-gray-100 hover:text-white transition-colors duration-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>

  );
}