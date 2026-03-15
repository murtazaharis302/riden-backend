// components/MarqueeService.jsx (Simplified)
"use client";
import { useEffect, useRef } from "react";
import { ArrowRight, Star } from "lucide-react";

const MarqueeService = () => {
  const marqueeRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let startTime = null;
    const speed = 0.005;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const translateX = -(25 + (elapsed * speed) % 25);
      
      marquee.style.transform = `translate3d(${translateX}%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const items = [
    "Web Design",
    "UI/UX Design",
    "Product Design", 
    "Digital Marketing",
    "Brand Strategy",
    "Mobile Development"
  ];

  return (
    <section className="w-full bg-black py-2 overflow-hidden">
   
      <div className="relative overflow-hidden">
        <div 
          ref={marqueeRef}
          className="flex whitespace-nowrap will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Duplicate items 3 times for seamless loop */}
          {[...Array(3)].map((_, copyIndex) => (
            <div key={copyIndex} className="flex items-center">
              {items.map((item, index) => (
                <div key={`${copyIndex}-${index}`} className="flex items-center mx-2">
                  {/* Rounded button */}
                  <div className="group relative">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-4 px-6 cursor-pointer">
                      <span className="text-white font-medium text-lg   tracking-wide ">
                        {item}
                      </span>
                    </div>
                    
                    
                    
                    </div>
                   <div className="bg-white/10  border-white/20  backdrop-blur-sm border -rotate-45  rounded-full p-4">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>

                  {/* Star separator */}
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-white/40 mx-4 md:mx-6" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeService;