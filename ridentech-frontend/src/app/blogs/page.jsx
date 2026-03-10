// app/blog/page.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Calendar, Clock, Search } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import { blogPosts, categories } from "@/app/data/blogData"; // Import shared data

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const filterRef = useRef(null);
  const rowsRef = useRef([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from Laravel Backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    // GSAP animations (only if not loading)
    if (loading) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, filterRef.current], {
        opacity: 0,
        y: 50
      });

      // Badge animation
      gsap.fromTo(badgeRef.current,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Title animation
      gsap.fromTo(titleRef.current,
        { y: 200, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

      // Filter bar animation
      gsap.fromTo(filterRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none"
          }
        }
      );

      // Set initial opacity for all rows to 0
      rowsRef.current.forEach(row => {
        if (row) {
          gsap.set(row.children, {
            opacity: 0,
            y: 50
          });
        }
      });

      // Animate each row when it comes into view
      rowsRef.current.forEach((row, index) => {
        if (row) {
          gsap.to(row.children, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none none"
            }
          });
        }
      });

      // Continuous bounce animation for badge
      gsap.to(badgeRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  // Filter posts based on category and search
  const filteredPosts = (blogs || []).filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const itemTitle = post.title || "";
    const itemDesc = post.short_description || "";
    const matchesSearch = itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      itemDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Helper to format date from DB
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleString('default', { month: 'short' }),
      year: date.getFullYear().toString().slice(-2)
    };
  };

  // Group posts into rows (3 per row for desktop)
  const getRows = (posts) => {
    const rows = [];
    for (let i = 0; i < posts.length; i += 3) {
      rows.push(posts.slice(i, i + 3));
    }
    return rows;
  };

  const rows = getRows(filteredPosts);

  return (
    <section ref={sectionRef} className="py-16 bg-white relative overflow-hidden min-h-screen">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div ref={badgeRef} className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-gray-900 rounded-full mr-2"></span>
            <span className="text-sm font-manrope text-gray-700 tracking-wide">OUR BLOG</span>
          </div>

          {/* Large Title */}
          <div className="relative mb-6 flex justify-center">
            <h1
              ref={titleRef}
              className="font-manrope text-[13vw] md:text-[13vw] lg:text-[13vw] font-black uppercase text-gray-900 leading-[0.85] tracking-tight"
            >
              NEWS & BLOG
            </h1>
          </div>

          <p ref={subtitleRef} className="font-instrument text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, stories, and updates from our team
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div ref={filterRef} className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-manrope font-medium transition-all duration-300 ${activeCategory === category
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 font-manrope text-gray-900"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Blog Grid - Rows */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="space-y-8 mt-16">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                ref={el => rowsRef.current[rowIndex] = el}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {row.map((post) => (
                  <Link
                    href={`/blogs/${post.slug}`}
                    key={post.id}
                    className="group bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-gray-400"
                  >
                    {/* Featured Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.image || "https://placehold.co/800x600?text=Riden+Blog"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/800x600?text=Riden+Tech";
                        }}
                      />
                      {/* Category Overlay */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-manrope font-semibold uppercase tracking-wider rounded-full shadow-lg">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Date and Comments */}
                      <div className="flex items-center gap-4 mb-3 text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-manrope">
                            {formatDate(post.published_at).day} {formatDate(post.published_at).month}, {formatDate(post.published_at).year}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm font-manrope">{post.comments || 0} Comments</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-manrope">{post.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-marcellus text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="font-instrument text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.short_description}
                      </p>

                      {/* Author and Read More */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                            <Image
                              src={post.authorImage || "https://randomuser.me/api/portraits/men/32.jpg"}
                              alt={post.author || "Riden Admin"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-manrope text-sm font-medium text-gray-700">{post.author || "Riden Admin"}</span>
                        </div>

                        <div className="flex items-center gap-1 text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                          <span className="font-manrope text-sm font-medium">Read More</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-instrument text-xl text-gray-500">No articles found matching your criteria.</p>
          </div>
        )}

        {/* Bottom accent line */}
        <div className="w-full mt-16 h-px bg-gray-200"></div>
      </div>
    </section>
  );
}