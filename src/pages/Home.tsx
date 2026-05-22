import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import {
  Phone,
  Instagram,
  MapPin,
  Home as HomeIcon,
  Layers,
  Grid3x3,
  Sun,
  Lamp,
  Map,
  Star,
  Wrench,
  PaintBucket,
  Box,
  Square,
} from "lucide-react";
import Nav from "@/components/Nav";
import BrandLogo from "@/components/BrandLogo";

/* ─── Reveal wrapper ─── */
const Reveal = ({ children, delay = 0, className = "", direction = "up" }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const hidden =
    direction === "up" ? { opacity: 0, y: 40 }
      : direction === "left" ? { opacity: 0, x: -40 }
      : { opacity: 0, x: 40 };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : hidden}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Staggered container ─── */
const StaggerParent = ({ children, className = "", delay = 0 }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerChild = ({ children, className = "" }: any) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 32 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Animated counter ─── */
function Counter({ to, suffix = "" }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView || typeof to === "string") return;
    const ctrl = animate(motionVal, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return ctrl.stop;
  }, [isInView, to, motionVal]);

  return <span ref={ref}>{typeof to === "string" ? to : display}{suffix}</span>;
}

/* ─── Section label ─── */
function SectionLabel({ ar, en, light = false }: any) {
  const color = light ? "text-gold-light" : "text-gold";
  const lineColor = light ? "bg-gold-light" : "bg-gold";
  return (
    <div className={`flex items-center gap-4 text-xs font-medium tracking-[0.5em] uppercase mb-6 ${color}`}>
      <div className={`w-10 h-[1px] shrink-0 ${lineColor}`} />
      <span className="ar">{ar}</span>
      <span className="en">{en}</span>
    </div>
  );
}

/* ─── HORIZONTAL PROJECT MARQUEE COMPONENT (Premium & Mobile Optimized) ─── */
const ProjectMarquee = ({ titleAr, titleEn, location, items, reverse = false }: any) => {
  // تكرار العناصر لضمان استمرارية الحركة الانسيابية بدون تقطيع
  const duplicatedItems = [...items, ...items];

  return (
    <div className="mb-28 last:mb-0">
      {/* رأس المشروع */}
      <div className="max-w-[1300px] mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <Reveal direction="right">
          <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight">
            <span className="ar">{titleAr}</span>
          </h3>
          <p className="text-gold/80 text-xs md:text-sm tracking-[0.2em] uppercase font-light">
            <span className="ar">{location} | </span><span className="en">{titleEn}</span>
          </p>
        </Reveal>
      </div>

      {/* شريط الصور المتحرك */}
      <div className="relative flex overflow-x-hidden py-4">
        <motion.div
          className="flex gap-6 px-3 min-w-max touch-pan-y"
          animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
        >
          {duplicatedItems.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative w-[280px] sm:w-[320px] md:w-[380px] aspect-[4/5] overflow-hidden bg-charcoal-dark shrink-0 cursor-pointer border border-transparent transition-all duration-500 ease-out hover:border-gold/40 hover:shadow-[0_0_25px_rgba(212,175,55,0.12)]"
            >
              {/* الصورة مع تأثير التقريب الناعم */}
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover opacity-85 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* تدرج لوني غني لبروز النص */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0907] via-[#0a0907]/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90 pointer-events-none" />
              
              {/* محتوى النص */}
              <div className="absolute bottom-0 start-0 w-full p-6 md:p-8 pointer-events-none translate-y-2 transition-transform duration-500 ease-out group-hover:translate-y-0">
                <div className="w-8 h-[1px] bg-gold mb-4 opacity-50 transition-all duration-500 group-hover:w-16 group-hover:opacity-100" />
                <p className="text-white text-base md:text-lg font-medium tracking-wide drop-shadow-md">
                  <span className="ar">{item.label}</span>
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-charcoal">
      <Nav />

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="relative h-[100dvh] bg-charcoal flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[40%] -end-[15%] w-[700px] h-[700px] rounded-full border border-gold/20" />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.5 }} className="absolute -top-[25%] -end-[5%] w-[480px] h-[480px] rounded-full border border-gold/12" />
          <motion.div animate={{ scale: [1, 1.04, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -top-[55%] -end-[25%] w-[900px] h-[900px] rounded-full border border-gold/8" />
          <div className="absolute inset-0 bg-gradient-to-tr from-gold/4 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6 flex flex-col items-center">
          <motion.div initial={{ scale: 0.88, opacity: 0.6 }} animate={{ scale: 1, opacity: 0.88 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="mb-7">
            <BrandLogo className="w-28 h-20 text-cream-light" />
          </motion.div>

          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} style={{ transformOrigin: "top" }} className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gold to-transparent mx-auto mb-7" />

          <motion.p initial={{ y: 14, opacity: 0.3 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }} className="font-sans font-extralight text-xs md:text-sm tracking-[0.45em] text-gold-light uppercase mb-5">
            <span className="ar">خالد دياب</span><span className="en">Khaled Diab</span>
          </motion.p>

          <motion.h1 initial={{ y: 22, opacity: 0.2 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }} className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream-light leading-[1.1] -tracking-[0.02em] mb-3">
            Future Design
          </motion.h1>
          <motion.h1 initial={{ y: 22, opacity: 0.2 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }} className="font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gold leading-[1.1] -tracking-[0.02em] mb-10">
            Decore
          </motion.h1>

          <motion.p initial={{ y: 16, opacity: 0.25 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }} className="font-sans font-light text-xs sm:text-sm md:text-base text-cream/55 tracking-[0.2em] uppercase mb-12 leading-loose">
            <span className="ar">تصميم داخلي · تنفيذ احترافي · إبداع لا حدود له</span>
            <span className="en tracking-[0.12em]">Interior Design · Professional Execution · Limitless Creativity</span>
          </motion.p>

          <motion.div initial={{ y: 14, opacity: 0.3 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}>
            <a href="#design-services" className="group relative inline-flex items-center gap-3 px-10 py-4 border border-gold/40 text-gold-light font-sans text-xs tracking-[0.3em] uppercase overflow-hidden transition-colors duration-300 hover:text-charcoal">
              <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10"><span className="ar">استكشف خدماتنا</span><span className="en">Explore Services</span></span>
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
          <motion.div animate={{ y: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-1">
            <div className="w-[1px] h-8 bg-gradient-to-b from-gold to-transparent" />
            <div className="w-1 h-1 rounded-full bg-gold/50" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. ABOUT
      ══════════════════════════════════════════ */}
      <section id="about" className="py-32 lg:py-40 px-6 bg-cream-light relative">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 items-center">
          <Reveal direction="left">
            <SectionLabel ar="من نحن" en="About Us" />
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-charcoal leading-[1.15] mb-8">
              <span className="ar">نحوّل <em className="not-italic text-gold-dark">المساحات</em><br />إلى تحف فنية</span>
              <span className="en">We Transform <em className="italic text-gold-dark">Spaces</em><br />into Masterpieces</span>
            </h2>
            <div className="space-y-5 text-text-muted font-light text-base md:text-lg leading-[2]">
              <p className="ar">في فيوتشر ديزاين ديكور، نؤمن بأن كل مساحة تروي قصة. بقيادة المصمم خالد دياب، نجمع بين الفخامة والوظيفة لنبتكر تصاميم داخلية تعكس شخصية عملائنا وترتقي بأسلوب حياتهم.</p>
              <p className="ar">نقدم حلولاً متكاملة من التصميم على الورق حتى التسليم النهائي، مع اهتمام استثنائي بأدق التفاصيل وأعلى معايير الجودة.</p>
              <p className="en">At Future Design Decore, we believe every space tells a story. Led by designer Khaled Diab, we combine luxury with functionality to create interior designs that reflect our clients' personalities.</p>
              <p className="en">We provide end-to-end solutions from initial concept to final delivery, with exceptional attention to the finest details and the highest quality standards.</p>
            </div>
          </Reveal>

          <Reveal delay={0.2} direction="right">
            <div className="relative">
              <div className="absolute -top-3 -end-3 -bottom-3 start-3 border border-gold/50 pointer-events-none" />
              <div className="bg-charcoal p-12 lg:p-16 relative">
                <StaggerParent className="grid grid-cols-2 gap-0">
                  {[
                    { val: "2D", label_ar: "تصميم بالمقاسات", label_en: "Scaled Design" },
                    { val: "3D", label_ar: "مجسمات واقعية", label_en: "Realistic Renders" },
                    { val: 13, suffix: "+", label_ar: "خدمة متكاملة", label_en: "Integrated Services" },
                    { val: 100, suffix: "%", label_ar: "رضا العملاء", label_en: "Client Satisfaction" },
                  ].map((stat, i) => (
                    <StaggerChild key={i}>
                      <div className={`py-8 px-6 text-center ${i % 2 === 0 ? "border-e border-gold/15" : ""} ${i < 2 ? "border-b border-gold/15" : ""}`}>
                        <div className="font-serif text-4xl lg:text-5xl text-gold mb-3 leading-none"><Counter to={stat.val} suffix={stat.suffix} /></div>
                        <div className="text-[11px] font-light tracking-widest text-cream/45 uppercase leading-tight"><span className="ar block">{stat.label_ar}</span><span className="en block">{stat.label_en}</span></div>
                      </div>
                    </StaggerChild>
                  ))}
                </StaggerParent>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. MARQUEE STRIP
      ══════════════════════════════════════════ */}
      <div className="bg-gold py-5 overflow-hidden" dir="ltr">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee-scroll 25s linear infinite" }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {["Interior Design", "Future Design Decore", "تصميم داخلي", "ديكور عصري", "تنفيذ احترافي", "جبسية وخشب", "إنارة مدروسة", "خرائط تنفيذية"].map((item, j) => (
                <span key={j} className="inline-flex items-center">
                  <span className="font-serif italic text-charcoal/80 px-8 text-sm tracking-wider">{item}</span>
                  <span className="text-charcoal/30 text-[5px]">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          4. DESIGN SERVICES
      ══════════════════════════════════════════ */}
      <section id="design-services" className="py-32 lg:py-40 px-6 bg-charcoal text-cream-light relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -start-32 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-gold/5" />
          <div className="absolute -end-20 bottom-20 w-96 h-96 rounded-full border border-gold/5" />
        </div>

        <div className="max-w-[1300px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-20 gap-8">
            <Reveal direction="left">
              <SectionLabel ar="خدمات التصميم" en="Design Services" light />
              <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-cream-light leading-[1.15]">
                <span className="ar">من الفكرة<br /><em className="not-italic text-gold">إلى المخطط</em></span>
                <span className="en">From Concept<br /><em className="italic text-gold">to Blueprint</em></span>
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="max-w-xs text-start">
              <p className="text-cream/35 font-light text-sm leading-relaxed">
                <span className="ar">نقدم خدمات تصميم داخلي شاملة تبدأ من التصورات الأولى وتصل إلى أدق تفاصيل التنفيذ.</span>
                <span className="en">Comprehensive interior design services from initial concepts down to the finest execution details.</span>
              </p>
            </Reveal>
          </div>

          <StaggerParent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-gold/10 border border-gold/10">
            {[
              { num: "01", icon: Grid3x3, ar: "تصميم 2D", en: "2D Design", arDesc: "مخططات دقيقة بالأبعاد الفعلية وتوزيع أمثل للأثاث.", enDesc: "Precise 2D layouts with exact dimensions and optimal furniture placement." },
              { num: "02", icon: Layers, ar: "تصميم 3D", en: "3D Design", arDesc: "تصور واقعي للمساحة قبل التنفيذ باستخدام أحدث التقنيات.", enDesc: "Ultra-realistic 3D visualization before execution using cutting-edge tools." },
              { num: "03", icon: Box, ar: "حصر الكميات", en: "Bill of Quantities", arDesc: "جداول دقيقة للكميات تُسهل ضبط الميزانية وتفادي المفاجآت.", enDesc: "Accurate quantity schedules for effective budget control." },
              { num: "04", icon: Sun, ar: "المواد والألوان", en: "Materials & Colors", arDesc: "اختيار متناسق للخامات والألوان المتاحة في السوق المحلي.", enDesc: "Harmonious selection of locally available materials and colors." },
              { num: "05", icon: Lamp, ar: "توزيع الإنارة", en: "Lighting Setup", arDesc: "إضاءة مدروسة لإبراز جماليات كل مساحة وخلق الأجواء المطلوبة.", enDesc: "Thoughtful lighting design to highlight space aesthetics and create ambiance." },
              { num: "06", icon: Map, ar: "مخططات تنفيذية", en: "Executive Plans", arDesc: "خرائط هندسية تفصيلية تتضمن كل القياسات اللازمة للتنفيذ.", enDesc: "Detailed engineering blueprints with all measurements for on-site execution." },
            ].map((svc, idx) => (
              <StaggerChild key={idx}>
                <div className="group relative bg-charcoal p-10 xl:p-12 h-full cursor-default overflow-hidden transition-colors duration-500 hover:bg-charcoal-light">
                  <div className="absolute bottom-0 start-0 h-[2px] w-0 bg-gold group-hover:w-full transition-all duration-500" />
                  <span className="absolute top-8 start-8 font-serif text-[11px] text-gold/20 tracking-widest">{svc.num}</span>
                  <div className="mb-8 mt-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-gold-light">
                    <svc.icon strokeWidth={1.2} className="w-11 h-11 text-gold/70" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-cream-light mb-3 leading-snug"><span className="ar">{svc.ar}</span><span className="en">{svc.en}</span></h3>
                  <p className="text-sm font-light text-cream/35 leading-[1.9]"><span className="ar">{svc.arDesc}</span><span className="en">{svc.enDesc}</span></p>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. EXECUTION SERVICES
      ══════════════════════════════════════════ */}
      <section id="execution-services" className="py-32 lg:py-40 px-6 bg-cream-light relative overflow-hidden">
        <div className="absolute end-0 top-1/2 -translate-y-1/2 font-serif text-[200px] font-bold text-charcoal/3 leading-none pointer-events-none select-none hidden xl:block">KD</div>

        <div className="max-w-[1300px] mx-auto relative z-10">
          <Reveal>
            <SectionLabel ar="خدمات التنفيذ" en="Execution Services" />
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-charcoal leading-[1.15] mb-20">
              <span className="ar">من المخطط<br /><em className="not-italic text-gold-dark">إلى الواقع</em></span>
              <span className="en">From Blueprint<br /><em className="italic text-gold-dark">To Reality</em></span>
            </h2>
          </Reveal>

          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 border border-charcoal/8">
            {[
              { icon: HomeIcon, num: "01", ar: "أعمال التصميم الديكوري", en: "Decor Design Works", arDesc: "مجالس · غرف معيشة · مطابخ · حمامات · غرف نوم", enDesc: "Majlis · Living Rooms · Kitchens · Bathrooms · Bedrooms" },
              { icon: Wrench, num: "02", ar: "أعمال النجارة", en: "Carpentry Works", arDesc: "ديكورات خشبية · خزائن · مطابخ مدمجة", enDesc: "Wooden Decors · Wardrobes · Built-in Kitchens" },
              { icon: Square, num: "03", ar: "أعمال الجبس", en: "Gypsum Works", arDesc: "جدران · أسقف · ديكورات جبسية متنوعة", enDesc: "Walls · Ceilings · Various Gypsum Decorations" },
              { icon: Layers, num: "04", ar: "أسمنت بورد", en: "Cement Board", arDesc: "قواطع داخلية · واجهات خارجية", enDesc: "Internal Walls · External Facades" },
              { icon: Grid3x3, num: "05", ar: "الحجر وبدائله", en: "Stone & Alternatives", arDesc: "تكسية جدران داخلية · واجهات خارجية", enDesc: "Internal Wall Cladding · External Facades" },
              { icon: Star, num: "06", ar: "لوحات ثلاثية الأبعاد", en: "3D Panels", arDesc: "لوحات 3D مضيئة بأشكال وتصاميم متعددة", enDesc: "Illuminated 3D panels with multiple shapes and designs" },
              { icon: PaintBucket, num: "07", ar: "أعمال الدهانات", en: "Painting Works", arDesc: "دهانات متنوعة · تشطيبات ملمسية", enDesc: "Various paint types · Texture finishes" },
            ].map((item, idx) => (
              <StaggerChild key={idx}>
                <div className={`group flex items-start gap-7 p-10 xl:p-12 transition-colors duration-400 hover:bg-cream-dark/40 border-b border-charcoal/8 ${idx % 2 === 0 ? "md:border-e md:border-charcoal/8" : ""}`}>
                  <div className="w-14 h-14 bg-charcoal shrink-0 flex items-center justify-center transition-all duration-400 group-hover:bg-gold">
                    <item.icon strokeWidth={1.3} className="w-6 h-6 text-gold group-hover:text-charcoal transition-colors duration-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2"><span className="font-serif text-[11px] text-charcoal/20 tracking-widest">{item.num}</span></div>
                    <h3 className="font-sans font-bold text-base md:text-lg text-charcoal mb-2 leading-snug"><span className="ar">{item.ar}</span><span className="en">{item.en}</span></h3>
                    <p className="text-sm font-light text-text-muted leading-relaxed"><span className="ar">{item.arDesc}</span><span className="en">{item.enDesc}</span></p>
                  </div>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5.5 PORTFOLIO (HORIZONTAL ANIMATED MARQUEE)
      ══════════════════════════════════════════ */}
      <section id="portfolio" className="py-32 lg:py-40 bg-charcoal relative overflow-hidden">
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
              <p className="text-cream/40 font-light text-sm leading-relaxed">
                <span className="ar">جولة بصرية في أحدث مشاريعنا المتميزة، حيث يمثل كل صف تجربة متكاملة لمشروع فريد تم تنفيذه بدقة.</span>
                <span className="en">A visual tour of our latest projects designed and executed with the highest standards of precision and luxury.</span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* المشروع الأول: استراحة مهنا */}
        <ProjectMarquee 
          titleAr="استراحة مهنا" 
          titleEn="Muhanna Rest House"
          location="صحار"
          reverse={false}
          items={[
            { src: "/work-1.jpeg", label: "المجلس الرئيسي" },
            { src: "/work-2.jpeg", label: "التصميم الداخلي" },
            { src: "/work-3.jpeg", label: "غرف النوم" },
            { src: "/work-4.jpeg", label: "الممرات والمداخل" },
            { src: "/work-5.jpeg", label: "الجلسات الخارجية" },
            { src: "/work-6.jpeg", label: "منطقة الطعام" },
            { src: "/work-7.jpeg", label: "أعمال الإنارة" },
            { src: "/work-8.jpeg", label: "التشطيبات الخشبية" },
            { src: "/work-9.jpeg", label: "اللمسات النهائية" },
          ]}
        />
        
        {/* المشروع الثاني: تصميم وتنفيذ المغاسل */}
        <ProjectMarquee 
          titleAr="تصميم وتنفيذ مغاسل" 
          titleEn="Premium Washbasins"
          location="مسقط"
          reverse={true} // اتجاه معاكس لحركة انسيابية متقاطعة
          items={[
            { src: "/marble-1.jpeg", label: "رخام فاخر" },
            { src: "/marble-2.jpeg", label: "كوارتز عالي الجودة" },
            { src: "/marble-3.jpeg", label: "جرانيت صلب" },
            { src: "/marble-4.jpeg", label: "بورسلين أنيق" },
            { src: "/marble-5.jpeg", label: "تصاميم عصرية" },
            { src: "/marble-6.jpeg", label: "تشطيبات دقيقة" },
          ]}
        />
      </section>

      {/* ══════════════════════════════════════════
          6. CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-32 lg:py-40 px-6 bg-charcoal-mid relative overflow-hidden text-cream-light">
        <div className="absolute -bottom-12 -start-8 font-serif text-[280px] font-bold text-gold/4 leading-none pointer-events-none select-none hidden md:block">KD</div>

        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center relative z-10">
          <Reveal direction="left">
            <SectionLabel ar="تواصل مع المكتب" en="Contact the Studio" light />
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-cream-light leading-[1.15] mb-6">
              <span className="ar">دعنا نتحدث<br /><em className="not-italic text-gold">عن مشروعك</em></span>
              <span className="en">Let's Discuss<br /><em className="italic text-gold">Your Project</em></span>
            </h2>
            <p className="text-cream/50 font-light text-base mb-12 leading-[1.9]">
              <span className="ar">نحن هنا لتحويل أفكارك إلى حقيقة. تواصل معنا للحصول على استشارتك المجانية.</span>
              <span className="en">We are here to turn your ideas into reality. Reach out for your free consultation.</span>
            </p>

            <div className="space-y-4">
              {[
                { icon: Phone, labelAr: "الهاتف / واتساب", labelEn: "Phone / WhatsApp", valAr: "+968 7753 3603", valEn: "+968 7753 3603", link: "https://wa.link/gitycp", forceLtr: true },
                { icon: Instagram, labelAr: "إنستغرام", labelEn: "Instagram", valAr: "@future_design_decor", valEn: "@future_design_decor", link: "https://www.instagram.com/future_design_decor", forceLtr: true },
                { icon: MapPin, labelAr: "الموقع", labelEn: "Location", valAr: "سلطنة عُمان", valEn: "Sultanate of Oman", link: "#", forceLtr: false },
              ].map((c, i) => (
                <motion.a key={i} href={c.link} target="_blank" rel="noopener noreferrer" whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="group flex items-center gap-6 p-5 border border-gold/12 bg-white/3 hover:bg-gold/8 hover:border-gold/40 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-full bg-gold/10 shrink-0 flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                    <c.icon className="w-5 h-5 text-gold group-hover:text-charcoal transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] text-gold/60 uppercase mb-1"><span className="ar">{c.labelAr}</span><span className="en">{c.labelEn}</span></div>
                    <div className="text-base font-medium text-cream/90" dir={c.forceLtr ? "ltr" : undefined}><span className="ar">{c.valAr}</span><span className="en">{c.valEn}</span></div>
                  </div>
                </motion.a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2} direction="right">
            <div className="relative group">
              <div className="absolute -top-4 -end-4 -bottom-4 start-4 border border-gold/20 pointer-events-none transition-all duration-500 group-hover:top-[-20px] group-hover:-end-[20px]" />
              <div className="relative text-center py-20 px-10 bg-gradient-to-br from-white/3 to-white/6 border border-gold/15 flex flex-col items-center justify-center backdrop-blur-sm">
                <BrandLogo className="w-28 h-20 text-gold mb-10" />
                <div className="w-16 h-[1px] bg-gold/30 mb-8" />
                <div className="font-sans font-light text-xl tracking-[0.5em] uppercase text-cream/85 mb-3">Khaled Diab</div>
                <div className="font-sans font-light text-xs tracking-[0.4em] uppercase text-gold/60">Future Design Decore</div>
                <div className="mt-8 text-[11px] tracking-[0.25em] uppercase text-cream/30"><span className="ar">سلطنة عُمان</span><span className="en">Sultanate of Oman</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. FOOTER
      ══════════════════════════════════════════ */}
      <footer className="bg-charcoal border-t border-gold/10 py-8 px-6">
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo className="w-7 h-5 text-gold/60" />
            <p className="text-xs font-light text-cream/35 tracking-wider">© 2026 Future Design Decore — All rights reserved</p>
          </div>
          <div className="flex gap-8">
            <a href="https://www.instagram.com/future_design_decor" target="_blank" rel="noopener noreferrer" className="text-xs tracking-[0.25em] text-cream/45 hover:text-gold uppercase transition-colors duration-300">Instagram</a>
            <a href="https://wa.link/gitycp" target="_blank" rel="noopener noreferrer" className="text-xs tracking-[0.25em] text-cream/45 hover:text-gold uppercase transition-colors duration-300">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
