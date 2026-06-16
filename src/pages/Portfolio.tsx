import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
      <span className="ar tracking-normal">{ar}</span>
      <span className="en">{en}</span>
    </div>
  );
}

/* ─── Project Card ─── */
const ProjectCard = ({ src, labelAr, labelEn, onClick }: { src: string; labelAr?: string; labelEn?: string; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="group relative w-[280px] sm:w-[320px] md:w-[380px] aspect-[3/4] overflow-hidden bg-charcoal-dark shrink-0 cursor-zoom-in border border-transparent transition-all duration-500 ease-out hover:border-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]"
  >
    <img src={src} alt={labelEn || "Portfolio Image"} className="w-full h-full object-cover opacity-85 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105" loading="lazy" />
    
    {(labelAr || labelEn) && (
      <>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0907] via-[#0a0907]/10 to-transparent opacity-90 pointer-events-none transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute bottom-0 start-0 w-full p-6 md:p-8 pointer-events-none translate-y-2 transition-transform duration-500 ease-out group-hover:translate-y-0">
          <div className="w-8 h-[1px] bg-gold mb-3 opacity-50 transition-all duration-500 group-hover:w-16 group-hover:opacity-100" />
          <p className="text-white text-base md:text-lg font-medium tracking-wide drop-shadow-md">
            {labelAr && <span className="ar">{labelAr}</span>}
            {labelEn && <span className="en">{labelEn}</span>}
          </p>
        </div>
      </>
    )}
  </div>
);

/* ─── Draggable & Seamless Interactive Marquee ─── */
const InteractiveMarquee = ({ images, speed = 1, reverse = false, onImageClick }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<any>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const duplicatedImages = [...images, ...images, ...images, ...images];

  useEffect(() => {
    if (reverse && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2;
    }
  }, [reverse]);

  useEffect(() => {
    let animationFrameId: number;
    const scrollNode = scrollRef.current;
    if (!scrollNode) return;

    const scroll = () => {
      if (!isPaused && !isDragging) {
        if (reverse) {
          scrollNode.scrollLeft -= speed;
          if (scrollNode.scrollLeft <= 0) scrollNode.scrollLeft = scrollNode.scrollWidth / 2;
        } else {
          scrollNode.scrollLeft += speed;
          if (scrollNode.scrollLeft >= scrollNode.scrollWidth / 2) scrollNode.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isDragging, speed, reverse]);

  const pauseScroll = () => {
    setIsPaused(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const resumeScroll = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsPaused(false), 3000);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragDistance(0);
    pauseScroll();
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeftPos(scrollRef.current?.scrollLeft || 0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    setDragDistance(Math.abs(walk));
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const onMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      resumeScroll();
    }
  };

  const handleCardClick = (img: any) => {
    if (dragDistance < 10) onImageClick(img);
  };

  return (
    <div className="relative w-full overflow-hidden mb-8 md:mb-12" dir="ltr">
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 w-full overflow-x-scroll hide-scrollbar cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpOrLeave}
        onMouseLeave={onMouseUpOrLeave}
        onTouchStart={pauseScroll}
        onTouchEnd={resumeScroll}
      >
        {duplicatedImages.map((image, index) => (
          <ProjectCard 
            key={index} 
            src={image.src} 
            labelAr={image.labelAr} 
            labelEn={image.labelEn} 
            onClick={() => handleCardClick(image)} 
          />
        ))}
      </div>
    </div>
  );
};

export default function PortfolioPage() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; labelAr?: string; labelEn?: string } | null>(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-charcoal">
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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
                alt={selectedImage.labelEn || "Project Image"}
                className="w-auto max-h-[75vh] md:max-h-[85vh] object-contain rounded-sm shadow-2xl border border-white/5"
              />

              {(selectedImage.labelAr || selectedImage.labelEn) && (
                <div className="mt-6 text-center">
                  <p className="text-gold tracking-wide text-sm md:text-base font-medium">
                    {selectedImage.labelAr && <span className="ar">{selectedImage.labelAr}</span>}
                    {selectedImage.labelEn && <span className="en">{selectedImage.labelEn}</span>}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Nav />

      {/* PORTFOLIO SECTION */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-charcoal relative overflow-hidden min-h-[80vh]">
        <div className="max-w-[1300px] mx-auto px-6 mb-16 relative z-10 mt-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8">
            <Reveal direction="left">
              <SectionLabel ar="أهم أعمالنا" en="Our Featured Work" light />
              <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-cream-light leading-[1.3] lg:leading-[1.15]">
                <span className="ar tracking-normal">معرض <em className="not-italic text-gold">الإبداع</em></span>
                <span className="en">Gallery of <em className="italic text-gold">Creativity</em></span>
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="max-w-sm text-start">
              <p className="text-cream/40 font-light text-sm leading-relaxed text-justify">
                <span className="ar tracking-normal">جولة بصرية لا نهائية في أحدث مشاريعنا. اسحب للتصفح، واضغط على أي صورة لتكبيرها واستكشاف دقة التفاصيل وجودة التنفيذ.</span>
                <span className="en">An infinite visual tour of our latest projects. Swipe to explore, and click any image to enlarge.</span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* 1. صف خزائن الخشب */}
        <InteractiveMarquee
          speed={1.2}
          onImageClick={setSelectedImage}
          images={[
            { src: "/خزائن خشب (1).jpeg", labelAr: "خزائن خشب", labelEn: "Wooden Cabinets" },
            { src: "/خزائن خشب (2).jpeg", labelAr: "خزائن خشب", labelEn: "Wooden Cabinets" },
            { src: "/خزائن خشب (3).jpeg", labelAr: "خزائن خشب", labelEn: "Wooden Cabinets" },
            { src: "/خزائن خشب (4).jpeg", labelAr: "خزائن خشب", labelEn: "Wooden Cabinets" },
            { src: "/خزائن خشب (5).jpeg", labelAr: "خزائن خشب", labelEn: "Wooden Cabinets" },
            { src: "/خزائن خشب (6).jpeg", labelAr: "خزائن خشب", labelEn: "Wooden Cabinets" },
            { src: "/خزائن خشب (7).jpeg", labelAr: "خزائن خشب", labelEn: "Wooden Cabinets" },
            { src: "/خزائن خشب (8).jpeg", labelAr: "خزائن خشب", labelEn: "Wooden Cabinets" },
            { src: "/خزائن خشب (9).jpeg", labelAr: "خزائن خشب", labelEn: "Wooden Cabinets" },
          ]}
        />

        {/* 2. صف غرف النوم والإنارة */}
        <InteractiveMarquee
          speed={1}
          reverse={true}
          onImageClick={setSelectedImage}
          images={[
            { src: "/غرفة نوم.jpeg", labelAr: "غرفة نوم رئيسية", labelEn: "Master Bedroom" },
            { src: "/غرفة نوم (2).jpeg", labelAr: "غرف نوم عصرية", labelEn: "Modern Bedrooms" },
            { src: "/ديكور غرفة نوم.jpeg", labelAr: "ديكور غرف النوم", labelEn: "Bedroom Decor" },
            { src: "/تصميم داخلي وإنارة.jpeg", labelAr: "تناغم التصميم والإنارة", labelEn: "Lighting Harmony" },
          ]}
        />

        {/* 3. صف غرف تغيير الملابس */}
        <InteractiveMarquee
          speed={1.2}
          onImageClick={setSelectedImage}
          images={[
            { src: "/غرفة تغيير ملابس (1).jpeg", labelAr: "غرفة تغيير ملابس", labelEn: "Walk-in Closet" },
            { src: "/غرفة تغيير ملابس (2).jpeg", labelAr: "غرفة تغيير ملابس", labelEn: "Walk-in Closet" },
            { src: "/غرفة تغيير ملابس (3).jpeg", labelAr: "غرفة تغيير ملابس", labelEn: "Walk-in Closet" },
            { src: "/غرفة تغيير ملابس (4).jpeg", labelAr: "غرفة تغيير ملابس", labelEn: "Walk-in Closet" },
            { src: "/غرفة تغيير ملابس (5).jpeg", labelAr: "غرفة تغيير ملابس", labelEn: "Walk-in Closet" },
          ]}
        />

        {/* 4. صف الأسقف والجدران */}
        <InteractiveMarquee
          speed={1}
          reverse={true}
          onImageClick={setSelectedImage}
          images={[
            { src: "/ديكور أسقف وجدران (1).jpeg", labelAr: "ديكور أسقف وجدران", labelEn: "Ceiling & Wall Decor" },
            { src: "/ديكور أسقف وجدران (2).jpeg", labelAr: "ديكور أسقف وجدران", labelEn: "Ceiling & Wall Decor" },
            { src: "/ديكور أسقف وجدران (3).jpeg", labelAr: "ديكور أسقف وجدران", labelEn: "Ceiling & Wall Decor" },
            { src: "/ديكور أسقف وجدران (4).jpeg", labelAr: "ديكور أسقف وجدران", labelEn: "Ceiling & Wall Decor" },
            { src: "/ديكور أسقف وجدران (5).jpeg", labelAr: "ديكور أسقف وجدران", labelEn: "Ceiling & Wall Decor" },
            { src: "/ديكور أسقف وجدران (6).jpeg", labelAr: "ديكور أسقف وجدران", labelEn: "Ceiling & Wall Decor" },
          ]}
        />

        {/* 5. صف المداخل */}
        <InteractiveMarquee
          speed={1.2}
          onImageClick={setSelectedImage}
          images={[
            { src: "/ديكور مدخل (1).jpeg", labelAr: "ديكور مدخل", labelEn: "Entrance Decor" },
            { src: "/ديكور مدخل (2).jpeg", labelAr: "ديكور مدخل", labelEn: "Entrance Decor" },
            { src: "/ديكور مدخل (3).jpeg", labelAr: "ديكور مدخل", labelEn: "Entrance Decor" },
            { src: "/ديكور مدخل (4).jpeg", labelAr: "ديكور مدخل", labelEn: "Entrance Decor" },
            { src: "/ديكور مدخل (5).jpeg", labelAr: "ديكور مدخل", labelEn: "Entrance Decor" },
            { src: "/ديكور مدخل (6).jpeg", labelAr: "ديكور مدخل", labelEn: "Entrance Decor" },
            { src: "/ديكور مدخل (7).jpeg", labelAr: "ديكور مدخل", labelEn: "Entrance Decor" },
            { src: "/ديكور مدخل (8).jpeg", labelAr: "ديكور مدخل", labelEn: "Entrance Decor" },
            { src: "/ديكور مدخل (9).jpeg", labelAr: "ديكور مدخل", labelEn: "Entrance Decor" },
            { src: "/ديكور مدخل (10).jpeg", labelAr: "ديكور مدخل", labelEn: "Entrance Decor" },
            { src: "/ديكور مدخل (11).jpeg", labelAr: "ديكور مدخل", labelEn: "Entrance Decor" },
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
