// app/blog/[slug]/page.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, MessageCircle, Clock, Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import { fetchBlogBySlug } from "@/lib/api";
import { blogPosts } from "@/app/data/blogData"; // Fallback

gsap.registerPlugin(ScrollTrigger);

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      setLoading(true);
      const data = await fetchBlogBySlug(slug);
      if (data && data.id) {
        const date = new Date(data.published_at);
        setPost({
          id: data.id,
          slug: data.slug,
          category: data.category,
          title: data.title,
          excerpt: data.short_description,
          content: data.content,
          image: data.image || "https://images.unsplash.com/photo-1541976844346-f18aeac57b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          day: String(date.getDate()).padStart(2, '0'),
          month: date.toLocaleString('en-US', { month: 'short' }),
          year: String(date.getFullYear()).slice(-2),
          readTime: `${Math.max(2, Math.ceil((data.content || '').length / 1000))} min read`,
          comments: 0,
          author: "Riden Tech",
          authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
          authorBio: "The Riden Tech team delivers innovative software solutions.",
          authorRole: "Team",
        });
      } else {
        // Fallback to static data
        const staticPost = blogPosts.find(p => p.slug === slug);
        setPost(staticPost || null);
      }
      setLoading(false);
    }
    loadBlog();
  }, [slug]);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const authorRef = useRef(null);
  const shareRef = useRef(null);
  
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!post) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, metaRef.current, imageRef.current, contentRef.current, authorRef.current, shareRef.current], {
        opacity: 0,
        y: 30
      });

      // Title animation
      gsap.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Meta info animation
      gsap.to(metaRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      // Image animation
      gsap.to(imageRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });

      // Content animation
      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none"
        }
      });

      // Author section animation
      gsap.to(authorRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none none"
        }
      });

      // Share section animation
      gsap.to(shareRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none none"
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [post]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
  
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="font-marcellus text-4xl text-gray-900 mb-4">Post Not Found</h1>
            <Link href="/blogs" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-manrope transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
    
    );
  }

  return (
 

        <section ref={sectionRef} className="py-16 bg-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back button */}
            <div className="mb-8">
              <Link 
                href="/blogs" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-manrope transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Link>
            </div>

            {/* Category */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm font-manrope font-semibold uppercase tracking-wider rounded-full">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 ref={titleRef} className="font-marcellus text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta info */}
            <div ref={metaRef} className="flex flex-wrap items-center gap-6 mb-8 text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-manrope">{post.day} {post.month}, {post.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-manrope">{post.comments} Comments</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-manrope">{post.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div ref={imageRef} className="relative h-[400px] w-full mb-12 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div 
              ref={contentRef}
              className="prose prose-lg max-w-none font-instrument text-gray-700 mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Section */}
            <div ref={authorRef} className="flex items-start gap-6 p-8 bg-gray-50 rounded-2xl mb-12">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-marcellus text-xl font-bold text-gray-900 mb-1">{post.author}</h3>
                <p className="font-manrope text-sm text-gray-600 mb-3">{post.authorRole}</p>
                <p className="font-instrument text-gray-600 text-sm leading-relaxed">
                  {post.authorBio}
                </p>
              </div>
            </div>

            {/* Share Section */}
            <div ref={shareRef} className="flex items-center justify-between pt-8 border-t border-gray-200">
              <span className="font-manrope text-sm font-medium text-gray-700">Share this article:</span>
              <div className="flex items-center gap-3">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-gray-700" />
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-gray-700" />
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-gray-700" />
                </a>
                <button 
                  onClick={handleCopyLink}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-700" />}
                </button>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="w-full mt-16 h-px bg-gray-200"></div>
          </div>
        </section>
   
  );
}