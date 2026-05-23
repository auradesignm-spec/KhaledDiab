import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";
import Nav from "@/components/Nav";
import BrandLogo from "@/components/BrandLogo";

/* ─── Reveal wrapper ─── */
const Reveal = ({ children, delay = 0, className = "", direction = "up" }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hidden = direction === "up" ? { opacity: 0, y: 40 } : direction === "left" ? { opacity: 0, x: -40 } : { opacity: 0, x: 40 };
  return (
    <motion.div ref={ref} initial={hidden} animate={isInView ? { opacity: 1, y: 0, x: 0 } : hidden} transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

/* ─── Section label ─── */
function SectionLabel({ ar, en, light = false }: any) {
  const color = light ? "text-gold-light" : "text-gold";
  const lineColor = light ? "bg-gold-light" : "bg-gold";
  return (
    <div className={`flex items-center gap-4 text-xs font-medium tracking-[0.5em] uppercase mb-6 ${color}`}>
      <div className={`w-12 h-[1px] shrink-0 ${lineColor} opacity-70`} />
      <span className="ar">{ar}</span>
      <span className="en">{en}</span>
    </div>
  );
}

/* ─── Project Card (Hover & Click to Zoom) ─── */
const ProjectCard = ({ src, label, onClick }: { src: string; label: string; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="group relative w-[280px] sm:w-[320px] md:w-[380px] aspect-[3/4] overflow-hidden bg-charcoal-dark shrink-0 cursor-zoom-in border border-transparent transition-all duration-500 ease-out hover:border-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]"
  >
    <img src={src} alt={label} className="w-full h-full object-cover opacity-85 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0907] via-[#0a0907]/10 to-transparent opacity-90 pointer-events-none transition-opacity duration-500 group-hover:opacity-100" />
    <div className="absolute bottom-0 start-0 w-full p-6 md:p-8 pointer-events-none translate-y-2 transition-transform duration-500 ease-out group-hover:translate-y-0">
      <div className="w-8 h-[1px] bg-gold mb-3 opacity-50 transition-all duration-500 group-hover:w-16 group-hover:opacity-100" />
      <p className="text-white text-base md:text-lg font-medium tracking-wide drop-shadow-md"><span className="ar">{label}</span></p>
    </div>
  </div>
);

/* ─── Flawless CSS Infinite Marquee ─── */
const InfiniteSeamlessMarquee = ({ images, duration, reverse, onImageClick }: { images: any[]; duration: number; reverse?: boolean; onImageClick: (img: any) => void }) => {
  const duplicatedImages = [...images, ...images, ...images, ...images];
  const animationClass = reverse ? "animate-marquee-right" : "animate-marquee-left";

  return (
    <div className="relative w-full overflow-hidden mb-16">
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none" />

      <div
        className={`flex gap-4 sm:gap-6 w-max ${animationClass} hover:animation-paused`}
        style={{ animationDuration: `${duration}s` }}
      >
        {duplicatedImages.map((image, index) => (
          <ProjectCard key={index} src={image.src} label={image.label} onClick={() => onImageClick(image)} />
        ))}
      </div>
    </div>
  );
};

export default function PortfolioPage() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; label: string } | null>(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-charcoal">
      
      {/* ─── CSS Animations Injected ─── */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left { animation: marquee-left linear infinite; }
        .animate-marquee-right { animation: marquee-right linear infinite; }
        .hover\\:animation-paused:hover { animation-play-state: paused; }
      `}</style>

      {/* ─── Lightbox Modal ─── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0a0907]/95 backdrop-blur-md p-4 sm:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center justify-center max-w-5xl w-full cursor-default"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 md:-right-12 p-2 text-white/50 hover:text-gold transition-colors duration-300"
              >
                <X className="w-8 h-8" strokeWidth={1.5} />
              </button>

              <img
                src={selectedImage.src}
                alt={selectedImage.label}
                className="w-auto max-h-[75vh] md:max-h-[85vh] object-contain rounded-sm shadow-2xl border border-white/5"
              />

              <div className="mt-6 text-center">
                <p className="text-gold tracking-[0.2em] uppercase text-sm md:text-base font-medium">
                  {selectedImage.label}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Nav />

      {/* ══════════════════════════════════════════
          PORTFOLIO SECTION
      ══════════════════════════════════════════ */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-charcoal relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-6 mb-16 relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8">
            <Reveal direction="left">
              <SectionLabel ar="أهم أعمالنا" en="Our Featured Work" light />
              <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-cream-light leading-[1.15]">
                <span className="ar">معرض <em className="not-italic text-gold">الإبداع</em></span>
                <span className="en">Gallery of <em className="italic text-gold">Creativity</em></span>
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="max-w-sm text-start">
              <p className="text-cream/40 font-light text-sm leading-relaxed text-justify">
                <span className="ar">جولة بصرية لا نهائية في أحدث مشاريعنا. اضغط على أي صورة لتكبيرها واستكشاف دقة التفاصيل وجودة التنفيذ.</span>
                <span className="en">An infinite visual tour of our latest projects. Click any image to enlarge and explore the precision of our execution.</span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* LOOP 1 */}
        <InfiniteSeamlessMarquee
          duration={80}
          onImageClick={setSelectedImage}
          images={[
            { src: "/work-1.jpeg", label: "صحار | المجلس الرئيسي" },
            { src: "/work-2.jpeg", label: "صحار | التصميم الداخلي" },
            { src: "/work-3.jpeg", label: "صحار | غرف النوم" },
            { src: "/work-4.jpeg", label: "صحار | الممرات والمداخل" },
            { src: "/work-5.jpeg", label: "صحار | الجلسات الخارجية" },
            { src: "/work-6.jpeg", label: "صحار | منطقة الطعام" },
            { src: "/work-7.jpeg", label: "صحار | أعمال الإنارة" },
            { src: "/work-8.jpeg", label: "صحار | التشطيبات الخشبية" },
            { src: "/work-9.jpeg", label: "صحار | اللمسات النهائية" },
          ]}
        />

        {/* LOOP 2 */}
        <InfiniteSeamlessMarquee
          duration={65}
          reverse={true}
          onImageClick={setSelectedImage}
          images={[
            { src: "/marble-1.jpeg", label: "مسقط | مغاسل رخام فاخرة" },
            { src: "/marble-2.jpeg", label: "مسقط | كوارتز عالي الجودة" },
            { src: "/marble-3.jpeg", label: "مسقط | جرانيت صلب" },
            { src: "/marble-4.jpeg", label: "مسقط | بورسلين أنيق" },
            { src: "/marble-5.jpeg", label: "مسقط | تصاميم عصرية" },
            { src: "/marble-6.jpeg", label: "مسقط | تشطيبات دقيقة" },
          ]}
        />
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal border-t border-gold/10 py-10 px-6 mt-auto">
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <BrandLogo className="w-8 h-6 text-gold/50" />
            <p className="text-xs font-light text-cream/30 tracking-wider">© 2026 Future Design Decore — All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
