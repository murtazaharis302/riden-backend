
import Hero from '@/components/Hero'
// import About from '@/components/About';
import Services from '@/components/Services';
// import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import FAQ from '@/components/FAQ';
import MarqueeSection from '@/components/MarqueeSection';
import ImageSection from '@/components/ImageSection';

export default function Home() {
  return (
 <>
 <Hero/>
 <MarqueeSection/>
 <ImageSection/>
 {/* <About/> */}
<Services/>
{/* <Testimonials/> */}
<Blog/>
<FAQ/>

    </>
  );
}
