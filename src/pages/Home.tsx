import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Instagram, MapPin, X, Layers, Grid3x3, Lamp, Wrench, PaintBucket, Box, Square, Home as HomeIcon, Star, Map, Sun } from "lucide-react";
import Nav from "@/components/Nav";
import BrandLogo from "@/components/BrandLogo";

/* ─── Reveal wrapper ─── */
const Reveal = ({ children, delay = 0, className = "" }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

/* ─── Infinite Marquee الاحترافي (مستقل عن اللغة) ─── */
const InfiniteMarquee = ({ images, duration, reverse = false, onImageClick }: any) => {
  return (
    // الحاوية هنا لها dir="ltr" ثابت، لن تتأثر بتبديل اللغة في الموقع
    <div className="relative w-full overflow-hidden py-10" dir="ltr">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none" />
      
      <motion.div 
        className="flex gap-6 px-3 w-max"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: duration, ease: "linear", repeat: Infinity }}
      >
        {[...images, ...images, ...images].map((img, i) => (
          <div 
            key={i} 
            onClick={() => onImageClick(img)}
            className="relative w-[320px] md:w-[400px] aspect-[4/5] shrink-0 cursor-zoom-in overflow-hidden border border-gold/10 group hover:border-gold/50 transition-colors"
          >
            <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <p className="text-white text-sm tracking-widest uppercase font-medium">{img.label}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  return (
    <div className="bg-charcoal min-h-screen text-white overflow-x-hidden">
      <Nav />
      
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-6 backdrop-blur-sm cursor-zoom-out">
             <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={selectedImage.src} className="max-w-full max-h-[90vh] object-contain shadow-2xl" />
             <button onClick={() => setSelectedImage(null)} className="absolute top-10 right-10 text-white/50 hover:text-white transition"><X size={40}/></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="h-[80vh] flex flex-col items-center justify-center text-center px-6">
         <Reveal><BrandLogo className="w-32 h-24 text-gold mb-8" /></Reveal>
         <Reveal delay={0.2}><h1 className="text-5xl md:text-8xl font-serif mb-6">Future Design</h1></Reveal>
         <Reveal delay={0.4}><p className="text-gold tracking-[0.5em] uppercase text-sm">Decore & Interior Architecture</p></Reveal>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 container mx-auto">
        <Reveal><h2 className="text-4xl md:text-5xl font-serif mb-12">نحوّل المساحات إلى تحف فنية</h2></Reveal>
        <div className="grid md:grid-cols-2 gap-12 text-white/70 leading-relaxed text-lg">
           <p className="ar">في فيوتشر ديزاين ديكور، نؤمن بأن كل مساحة تروي قصة. بقيادة المصمم خالد دياب، نجمع بين الفخامة والوظيفة لنبتكر تصاميم داخلية تعكس شخصية عملائنا.</p>
           <p className="en">At Future Design Decore, we believe every space tells a story. Led by designer Khaled Diab, we combine luxury with functionality to create interior designs that reflect our clients' personalities.</p>
        </div>
      </section>

      {/* Portfolio Section - "قسم محصن" برمجياً */}
      <section id="portfolio" className="py-24 bg-[#0a0907] w-full">
        <div className="container mx-auto px-6 mb-12">
            <Reveal><h2 className="text-4xl font-serif">معرض الإبداع</h2></Reveal>
        </div>
        
        <InfiniteMarquee 
          duration={50} 
          onImageClick={setSelectedImage}
          images={[
            { src: "/work-1.jpeg", label: "المجلس الرئيسي" },
            { src: "/work-2.jpeg", label: "التصميم الداخلي" },
            { src: "/work-3.jpeg", label: "غرف النوم" },
            { src: "/marble-1.jpeg", label: "مغاسل رخام" },
            { src: "/marble-2.jpeg", label: "كوارتز" },
            { src: "/marble-3.jpeg", label: "جرانيت" },
          ]}
        />
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 container mx-auto">
         <div className="grid md:grid-cols-2 gap-12 items-center">
             <Reveal>
                <h2 className="text-4xl font-serif mb-10">تواصل معنا</h2>
                <div className="space-y-8">
                   <a href="https://wa.link/gitycp" className="flex items-center gap-4 text-xl hover:text-gold transition"><Phone /> +968 7753 3603</a>
                   <a href="#" className="flex items-center gap-4 text-xl hover:text-gold transition"><MapPin /> سلطنة عُمان</a>
                </div>
             </Reveal>
         </div>
      </section>
      
      <footer className="py-10 text-center text-white/30 text-sm border-t border-white/10">© 2026 Future Design Decore</footer>
    </div>
  );
}
