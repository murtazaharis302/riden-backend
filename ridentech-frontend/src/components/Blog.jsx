"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle, Calendar, Clock, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

export default function Blog() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const mobileButtonRef = useRef(null);
  const badgeRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const [scrollLength, setScrollLength] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from Laravel Backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
        const data = await res.json();
        // Get latest 6 posts
        const recent = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 6);
        setBlogs(recent);
      } catch (error) {
        console.error("Error fetching blogs for home:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const recentPosts = blogs;

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Calculate scroll width
  useEffect(() => {
    const updateScrollLength = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const containerWidth = isMobile || isTablet ? window.innerWidth - 48 : (stickyRef.current ? sectionRef.current.offsetWidth - stickyRef.current.offsetWidth : sectionRef.current.offsetWidth);
      setScrollLength(trackWidth - containerWidth + (isMobile ? 40 : 60));
      ScrollTrigger.refresh();
    };

    updateScrollLength();
    window.addEventListener("resize", updateScrollLength);
    return () => window.removeEventListener("resize", updateScrollLength);
  }, [isMobile, isTablet, blogs]);

  // Handle side button navigation
  const scrollTo = (direction) => {
    if (!trackRef.current || !scrollContainerRef.current) return;
    const cardWidth = isMobile ? 280 : 300;
    const gap = 16;
    const scrollAmount = cardWidth + gap;
    let newPosition;
    if (direction === 'prev') {
      newPosition = Math.min(currentPosition + scrollAmount, 0);
    } else {
      newPosition = Math.max(currentPosition - scrollAmount, -scrollLength);
    }
    setCurrentPosition(newPosition);
    gsap.to(trackRef.current, { x: newPosition, duration: 0.5, ease: "power2.out" });
  };

  // GSAP animations
  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !trackRef.current) return;

      gsap.from([badgeRef.current, titleRef.current, textRef.current], {
        y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      });

      if (!isMobile && !isTablet && scrollLength > 0) {
        gsap.to(trackRef.current, {
          x: () => -scrollLength,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current, start: "top top", end: () => `+=${scrollLength + 200}`,
            scrub: 1.2, pin: true, anticipatePin: 1, invalidateOnRefresh: true
          }
        });
      }

      if ((isMobile || isTablet) && trackRef.current && scrollContainerRef.current) {
        Draggable.create(trackRef.current, {
          type: "x", edgeResistance: 0.65, bounds: { minX: -scrollLength, maxX: 0 },
          inertia: true, onDrag: function () { setCurrentPosition(this.x); }
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [scrollLength, isMobile, isTablet, loading]);

  const formatDate = (dateString) => {
    if (!dateString) return { day: '00', month: '---', year: '00' };
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleString('default', { month: 'short' }),
      year: date.getFullYear().toString().slice(-2)
    };
  };

  return (
    <section ref={sectionRef} className={`w-full ${isMobile || isTablet ? 'py-16' : 'h-[120vh]'} bg-gradient-to-br from-white to-gray-50 relative overflow-hidden`}>
      {!isMobile && !isTablet && (
        <div className="flex items-center h-full relative z-10">
          <div ref={stickyRef} className="w-[40vw] px-16 sticky left-0 top-0 h-full flex flex-col justify-center bg-white z-20">
            <div ref={badgeRef} className="inline-flex items-center bg-gray-900 text-white rounded-full px-5 py-2.5 mb-6 shadow-lg w-fit">
              <Zap className="w-4 h-4 mr-2" />
              <span className="text-sm font-manrope font-medium tracking-wide">LATEST INSIGHTS</span>
            </div>
            <h2 ref={titleRef} className="font-marcellus text-7xl text-gray-900 mb-6 leading-[0.9]">Blogs &<br /><span className="text-gray-700 italic">Insights</span></h2>
            <p ref={textRef} className="font-instrument text-gray-600 max-w-md mb-10 leading-relaxed text-lg">Discover strategies, ideas, and insights from our team to help your brand grow.</p>
            <Link ref={buttonRef} href="/blogs" className="group relative inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl text-sm font-medium transition-all hover:shadow-xl font-manrope w-fit">
              <span>View All Articles</span>
              <ArrowUpRight className="w-4 h-4 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="flex-1 overflow-hidden h-full flex items-center">
            {loading ? (
              <div className="flex justify-center items-center w-full"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div></div>
            ) : (
              <div ref={trackRef} className="flex gap-8 ml-10 pr-40 items-center">
                {recentPosts.map((post) => (
                  <Link href={`/blogs/${post.slug}`} key={post.id} className="group w-[380px] bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={post.image || "https://placehold.co/800x600?text=Riden+Blog"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/800x600?text=Riden+Tech";
                        }}
                      />
                      <div className="absolute top-4 left-4 z-10"><span className="px-3 py-1.5 bg-white text-gray-900 text-xs font-semibold uppercase rounded-full shadow-lg">{post.category}</span></div>
                      <div className="absolute top-4 right-4 z-10"><span className="px-3 py-1.5 bg-black/80 text-white text-xs rounded-full">{formatDate(post.published_at).day} {formatDate(post.published_at).month}</span></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4 text-gray-500 text-sm font-manrope">
                        <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /><span>{formatDate(post.published_at).day} {formatDate(post.published_at).month}, {formatDate(post.published_at).year}</span></div>
                        <div className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4" /><span>{post.comments || 0}</span></div>
                        <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /><span>{post.readTime || "5 min read"}</span></div>
                      </div>
                      <h3 className="font-marcellus text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                      <p className="font-instrument text-gray-600 text-sm mb-5 line-clamp-2">{post.short_description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <Image src={post.authorImage || "https://randomuser.me/api/portraits/men/32.jpg"} alt={post.author || "Admin"} width={32} height={32} className="rounded-full shadow-sm" />
                          <span className="text-sm font-medium text-gray-700">{post.author || "Riden Admin"}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {(isMobile || isTablet) && (
        <div className="relative z-10 px-4">
          <div className="text-center mb-8">
            <div ref={badgeRef} className="inline-flex items-center bg-gray-900 text-white rounded-full px-5 py-2.5 mb-4 shadow-lg mx-auto w-fit"><Zap className="w-4 h-4 mr-2" /><span>LATEST INSIGHTS</span></div>
            <h2 ref={titleRef} className="font-marcellus text-4xl text-gray-900 mb-2">Blogs & Insights</h2>
            <p ref={textRef} className="font-instrument text-gray-600 mb-6">Discover strategies and ideas from our team.</p>
          </div>

          <div className="relative">
            <button onClick={() => scrollTo('prev')} className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 rounded-full shadow-lg border flex items-center justify-center" disabled={currentPosition >= 0}><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={() => scrollTo('next')} className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 rounded-full shadow-lg border flex items-center justify-center" disabled={currentPosition <= -scrollLength}><ChevronRight className="w-5 h-5" /></button>

            <div ref={scrollContainerRef} className="overflow-hidden">
              <div ref={trackRef} className="flex gap-4 cursor-grab" style={{ transform: `translateX(${currentPosition}px)`, transition: 'transform 0.3s ease', width: 'fit-content' }}>
                {loading ? (
                  <div className="flex justify-center items-center py-10 w-full min-w-[300px]"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div></div>
                ) : recentPosts.map((post) => (
                  <Link href={`/blogs/${post.slug}`} key={post.id} className="group w-[280px] bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden flex-shrink-0">
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={post.image || "https://placehold.co/800x600?text=Riden+Blog"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/800x600?text=Riden+Tech";
                        }}
                      />
                      <div className="absolute top-3 left-3 z-10"><span className="px-2 py-1 bg-white/95 text-gray-800 text-xs rounded-full shadow-sm">{post.category}</span></div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2 text-gray-400 text-xs">
                        <Calendar className="w-3 h-3" /><span>{formatDate(post.published_at).day} {formatDate(post.published_at).month}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" /><span>{post.readTime || "5 min"}</span>
                      </div>
                      <h3 className="font-marcellus text-base font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
                        <div className="flex items-center gap-1.5">
                          <Image src={post.authorImage || "https://randomuser.me/api/portraits/men/32.jpg"} alt="Author" width={20} height={20} className="rounded-full" />
                          <span className="text-xs text-gray-500">{post.author || "Riden Admin"}</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link ref={mobileButtonRef} href="/blogs" className="group inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl text-sm font-medium transition-all hover:bg-gray-800 font-manrope">
              View All Articles
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}