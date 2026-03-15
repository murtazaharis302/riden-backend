// app/contact/page.jsx
"use client";

import React, { useEffect, useRef, useCallback, forwardRef, useState } from "react";
import { submitContact } from "@/lib/api";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/HeroSection";
import {
  FiMail, FiPhone, FiMapPin, FiClock, FiSend,
  FiGithub, FiTwitter, FiLinkedin, FiInstagram,
  FiCheckCircle
} from "react-icons/fi";
import { BsCalendarCheck } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const socialRefs = useRef([]);
  const footerRef = useRef(null);
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await submitContact({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'N/A',
      budget: formData.budget || '',
      inquiry: formData.message,
    });
    setSubmitting(false);

    if (result.success) {
      setFormStatus({ submitted: true, success: true, message: 'Thank you! We\'ll get back to you soon.' });
      setTimeout(() => {
        setFormStatus({ submitted: false, success: false, message: '' });
        setFormData({ name: '', email: '', phone: '', budget: '', message: '' });
      }, 3000);
    } else {
      setFormStatus({ submitted: true, success: false, message: result.error || 'Something went wrong. Please try again.' });
      setTimeout(() => {
        setFormStatus({ submitted: false, success: false, message: '' });
      }, 3000);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title and subtitle animations
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      headerTl.fromTo([titleRef.current, subtitleRef.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );

      // Form animation
      gsap.fromTo(formRef.current,
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Contact cards animations
      gsap.fromTo(cardRefs.current,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Social icons animation
      gsap.fromTo(socialRefs.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Footer animation
      gsap.fromTo(footerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, [sectionRef, formRef, cardsContainerRef, footerRef]);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        title="CONTACT US"
        subtitle="Building a legacy of innovation and trust"
        imageSrc="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
        overlayColor="bg-white"
      />

      {/* Contact Form Section */}
      <section id="contact-form" ref={sectionRef} className="py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div ref={titleRef} className="text-center mb-12">
            <h2 className="font-['Marcellus'] text-3xl md:text-4xl text-gray-900 mb-4">
              Send Us a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                Message
              </span>
            </h2>

            <p ref={subtitleRef} className="font-['Manrope'] text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <div
            ref={formRef}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-2xl mx-auto"
          >
            <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-700">
              <div className="flex items-center gap-3">
                <FiSend className="w-6 h-6 text-white" />
                <h3 className="font-['Marcellus'] text-xl text-white">
                  Get in Touch
                </h3>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 bg-gray-50">
              {formStatus.submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-['Manrope'] font-semibold text-xl text-gray-900 mb-2">Message Sent!</h3>
                  <p className="font-['Instrument_Sans'] text-gray-600">{formStatus.message}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-['Manrope'] text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-white text-gray-900"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block font-['Manrope'] text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-white text-gray-900"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block font-['Manrope'] text-sm font-medium text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-white text-gray-900 resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-4 rounded-lg font-['Manrope'] font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>Send Message</span>
                    <FiSend className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards & Social Links */}
      <section className="py-20 bg-white">
        <div ref={cardsContainerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Marcellus'] text-3xl md:text-4xl text-gray-900 mb-4">
              Other Ways to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                Connect
              </span>
            </h2>
            <p className="font-['Manrope'] text-gray-600 max-w-2xl mx-auto">
              Choose the channel that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <ContactCard
              ref={el => cardRefs.current[0] = el}
              icon={<FiMail />}
              title="Email"
              text="hello@riden.tech"
              link="mailto:hello@riden.tech"
            />

            <ContactCard
              ref={el => cardRefs.current[1] = el}
              icon={<FiPhone />}
              title="Call"
              text="+1 (555) 123-4567"
              link="tel:+15551234567"
            />

            <ContactCard
              ref={el => cardRefs.current[2] = el}
              icon={<FiMapPin />}
              title="Visit"
              text="San Francisco, CA"
            />
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center">
            <h3 className="font-['Marcellus'] text-xl text-gray-900 mb-6">Follow Us</h3>
            <div className="flex gap-4">
              {[
                { icon: <FiGithub />, href: "#", label: "GitHub" },
                { icon: <FiTwitter />, href: "#", label: "Twitter" },
                { icon: <FiLinkedin />, href: "#", label: "LinkedIn" },
                { icon: <FiInstagram />, href: "#", label: "Instagram" }
              ].map((social, index) => (
                <a
                  key={index}
                  ref={el => socialRefs.current[index] = el}
                  href={social.href}
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer ref={footerRef} className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo & Description */}
            <div>
              <h3 className="font-['Marcellus'] text-2xl mb-4">Riden<span className="text-gray-400">Tech</span></h3>
              <p className="font-['Manrope'] text-sm text-gray-400">
                Building innovative digital solutions for forward-thinking businesses.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-['Marcellus'] text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="font-['Manrope'] text-sm text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/services" className="font-['Manrope'] text-sm text-gray-400 hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/work" className="font-['Manrope'] text-sm text-gray-400 hover:text-white transition-colors">Work</Link></li>
                <li><Link href="/blog" className="font-['Manrope'] text-sm text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-['Marcellus'] text-lg mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="font-['Manrope'] text-sm text-gray-400 flex items-center gap-2">
                  <FiMail className="w-4 h-4" /> hello@riden.tech
                </li>
                <li className="font-['Manrope'] text-sm text-gray-400 flex items-center gap-2">
                  <FiPhone className="w-4 h-4" /> +1 (555) 123-4567
                </li>
                <li className="font-['Manrope'] text-sm text-gray-400 flex items-center gap-2">
                  <FiMapPin className="w-4 h-4" /> San Francisco, CA
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="font-['Manrope'] text-xs text-gray-500">
              © {new Date().getFullYear()} RidenTech. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Contact Card Component with forwarded ref */
const ContactCard = forwardRef(({ icon, title, text, link }, ref) => {
  const cardRef = useRef(null);
  const hoverTl = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Hover animation
    const handleMouseEnter = () => {
      if (hoverTl.current) hoverTl.current.kill();

      hoverTl.current = gsap.timeline();
      hoverTl.current.to(card, {
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        duration: 0.3,
        ease: "power2.out"
      });

      // Animate icon
      const iconContainer = card.querySelector('.contact-icon');
      gsap.to(iconContainer, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    const handleMouseLeave = () => {
      if (hoverTl.current) hoverTl.current.kill();

      gsap.to(card, {
        y: 0,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        duration: 0.3,
        ease: "power2.out"
      });

      const iconContainer = card.querySelector('.contact-icon');
      gsap.to(iconContainer, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Pass ref back to parent
    if (ref) {
      if (typeof ref === 'function') ref(card);
      else ref.current = card;
    }

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  const content = (
    <div
      ref={cardRef}
      className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-lg cursor-pointer"
    >
      <div className="contact-icon w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-4 text-gray-700 text-xl">
        {icon}
      </div>

      <h3 className="font-['Marcellus'] text-lg font-bold mb-1 text-gray-900">
        {title}
      </h3>

      <p className="font-['Manrope'] text-gray-600 text-sm">{text}</p>

      {link && (
        <div className="mt-3 text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Click to {title === 'Email' ? 'send email' : title === 'Call' ? 'call now' : 'view location'} →
        </div>
      )}
    </div>
  );

  return link ? <a href={link} className="block">{content}</a> : content;
});

ContactCard.displayName = 'ContactCard';