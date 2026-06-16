import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import WhatsAppButton from "@/components/WhatsAppButton";
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

/* ─── الفاصل المعماري المتحرك (Breathing Wave Divider) ─── */
const AnimatedDivider = ({ colorClass }: { colorClass: string }) => (
  // تم تقليل z-index هنا ليكون خلف المحتوى دائماً
  <div className="absolute left-0 w-full overflow-hidden leading-[0] h-[50px] md:h-[70px] lg:h-[100px] pointer-events-none z-10" style={{ bottom: '-2px' }}>
    <motion.svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={`absolute bottom-0 left-0 w-full h-full ${colorClass} opacity-30`}>
      <motion.path fill="currentColor"
        animate={{
          d: [
            "M0,60 C480,0 960,120 1440,60 L1440,120 L0,120 Z",
            "M0,60 C480,120 960,0 1440,60 L1440,120 L0,120 Z",
            "M0,60 C480,0 960,120 1440,60 L1440,120 L0,120 Z"
          ]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
    <motion.svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={`absolute bottom-0 left-0 w-full h-full ${colorClass}`}>
      <motion.path fill="currentColor"
        animate={{
          d: [
            "M0,80 C360,120 1080,0 1440,40 L1440,120 L0,120 Z",
            "M0,40 C360,0 1080,120 1440,80 L1440,120 L0,120 Z",
            "M0,80 C360,120 1080,0 1440,40 L1440,120 L0,120 Z"
          ]
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  </div>
);

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

/* ─── Staggered container for services ─── */
const StaggerParent = ({ children, className = "", delay = 0 }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: delay } } }} className={className}>
      {children}
    </motion.div>
  );
};

const StaggerChild = ({ children, className = "" }: any) => (
  <motion.div variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className={className}>
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
    const ctrl = animate(motionVal, to, { duration: 1.8, ease: "easeOut", onUpdate: (v) => setDisplay(Math.round(v).toString()) });
    return ctrl.stop;
  }, [isInView, to, motionVal]);
  return <span ref={ref}>{typeof to === "string" ? to : display}{suffix}</span>;
}

/* ─── Section label ─── */
function SectionLabel({ ar, en, light = false }: any) {
  const color = light ? "text-gold-light" : "text-gold";
  const lineColor = light ? "bg-gold-light" : "bg-gold";
  return (
    <div className={`flex items-center gap-4 text-xs font-medium uppercase mb-8 ${color}`}>
      <div className={`w-12 h-[1px] shrink-0 ${lineColor} opacity-70`} />
      <span className="ar tracking-normal">{ar}</span>
      <span className="en tracking-[0.5em]">{en}</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-charcoal">
      <Nav />

  {/* ══════════════════════════════════════════
           1. HERO SECTION (الحل النهائي الجذري للمسافات)
         ══════════════════════════════════════════ */}
      <section className="relative h-[100dvh] min-h-[650px] w-full bg-charcoal flex flex-col items-center justify-center overflow-hidden pt-[80px] pb-[130px] lg:pt-[120px] lg:pb-[160px]">
        
        {/* طبقة الخلفية */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[40%] -end-[15%] w-[700px] h-[700px] rounded-full border border-gold/20" />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.5 }} className="absolute -top-[25%] -end-[5%] w-[480px] h-[480px] rounded-full border border-gold/12" />
          <div className="absolute inset-0 bg-gradient-to-tr from-gold/4 via-transparent to-transparent opacity-80" />
        </div>

        {/* 
          تمت إزالة الـ translate بالكامل. 
          الآن المتصفح يرى الحشوة السفلية pb-[160px] ويرفع المحتوى تلقائياً ليبتعد عن الموجة بأمان تام.
        */}
        <div className="relative z-30 text-center max-w-4xl px-6 flex flex-col items-center w-full">
          
          <motion.div initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="mb-0 md:mb-1">
            <motion.div
              animate={{ 
                y: [0, -6, 0],
                filter: [
                  "drop-shadow(0px 0px 0px rgba(212,175,55,0))",
                  "drop-shadow(0px 0px 12px rgba(212,175,55,0.5))",
                  "drop-shadow(0px 0px 0px rgba(212,175,55,0))"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative px-3 py-2 flex items-center justify-center"
            >
              <BrandLogo className="relative z-10 w-20 h-14 md:w-24 md:h-16 lg:w-26 lg:h-18 text-cream-light" />
            </motion.div>
          </motion.div>
          
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} style={{ transformOrigin: "top" }} className="w-[1px] h-8 md:h-10 lg:h-12 bg-gradient-to-b from-transparent via-gold to-transparent mx-auto mb-3 lg:mb-5" />
          
          <motion.p initial={{ y: 14, opacity: 0.3 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }} className="font-sans font-medium text-[11px] md:text-xs uppercase mb-2 lg:mb-4 text-gold-light">
            <span className="ar tracking-normal">خالد دياب</span>
            <span className="en tracking-[0.45em] ml-2">Khaled Diab</span>
          </motion.p>
          
          <motion.h1 initial={{ y: 22, opacity: 0.2 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }} className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-cream-light leading-none -tracking-[0.02em] mb-1">
            Future Design
          </motion.h1>
          <motion.h1 initial={{ y: 22, opacity: 0.2 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }} className="font-serif italic text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gold leading-none -tracking-[0.02em] mb-4 md:mb-8">
            Decore
          </motion.h1>
          
          <motion.div initial={{ y: 16, opacity: 0.25 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }} className="max-w-2xl mx-auto mb-6 md:mb-10">
            <p className="font-sans font-light text-[11px] md:text-sm text-cream/60 uppercase leading-loose md:leading-loose">
              <span className="ar tracking-normal block md:inline">تصميم داخلي · تنفيذ احترافي · إبداع لا حدود له</span>
              <span className="en tracking-[0.15em] block md:inline">Interior Design · Professional Execution · Limitless Creativity</span>
            </p>
          </motion.div>
          
          <motion.div initial={{ y: 14, opacity: 0.3 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }} className="mb-0">
            <a href="/portfolio" className="group relative inline-flex items-center gap-3 px-10 py-4 border border-gold/40 text-gold-light font-sans text-[11px] md:text-xs uppercase overflow-hidden transition-colors duration-300 hover:text-charcoal">
              <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 font-medium">
                <span className="ar tracking-normal"> استكشف أعـمـالـنـا الإبداعية</span>
                <span className="en tracking-[0.3em]">Explore Our Creativity</span>
              </span>
            </a>
          </motion.div>
        </div>

        <AnimatedDivider colorClass="text-cream-light" />
      </section>

      {/* ══════════════════════════════════════════
           2. ABOUT SECTION
         ══════════════════════════════════════════ */}
      <section id="about" className="pt-24 pb-36 lg:pt-36 lg:pb-52 px-6 bg-cream-light relative">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-32 items-center relative z-10">
          <Reveal direction="left">
            <SectionLabel ar="من نحن" en="About Us" />
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-[1.3] lg:leading-[1.2] mb-10">
              <span className="ar tracking-normal">نحوّل <em className="not-italic text-gold-dark">المساحات</em><br />إلى تحف فنية</span>
              <span className="en">We Transform <em className="italic text-gold-dark">Spaces</em><br />into Masterpieces</span>
            </h2>
            <div className="space-y-8 text-text-muted font-light text-base md:text-lg leading-[2.2] text-justify">
              <p>
                <span className="ar tracking-normal">في فيوتشر ديزاين ديكور، نؤمن بأن كل مساحة تروي قصة. بقيادة المصمم خالد دياب، نجمع بين الفخامة والوظيفة لنبتكر تصاميم داخلية تعكس شخصية عملائنا وترتقي بأسلوب حياتهم.</span>
                <span className="en">At Future Design Decore, we believe every space tells a story. Led by designer Khaled Diab, we blend luxury with function to craft interiors that reflect our clients' personalities and elevate their lifestyle.</span>
              </p>
              <p>
                <span className="ar tracking-normal">نقدم حلولاً متكاملة من التصميم على الورق حتى التسليم النهائي، مع اهتمام استثنائي بأدق التفاصيل وأعلى معايير الجودة.</span>
                <span className="en">We deliver end-to-end solutions from initial design concepts to final handover, with exceptional attention to detail and the highest quality standards.</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2} direction="right">
            <div className="relative mt-12 lg:mt-0">
              <div className="absolute -top-4 -end-4 -bottom-4 start-4 border border-gold/40 opacity-60 pointer-events-none" />
              <div className="bg-charcoal p-10 lg:p-16 xl:p-20 relative shadow-2xl">
                <StaggerParent className="grid grid-cols-2 gap-0">
                  {[
                    { val: "2D", label_ar: "تصميم بالمقاسات", label_en: "Scaled Design" },
                    { val: "3D", label_ar: "مجسمات واقعية", label_en: "Realistic Renders" },
                    { val: 13, suffix: "+", label_ar: "خدمة متكاملة", label_en: "Integrated Services" },
                    { val: 100, suffix: "%", label_ar: "رضا العملاء", label_en: "Client Satisfaction" },
                  ].map((stat, i) => (
                    <StaggerChild key={i}>
                      <div className={`py-10 px-6 text-center ${i % 2 === 0 ? "border-e border-gold/15" : ""} ${i < 2 ? "border-b border-gold/15" : ""}`}>
                        <div className="font-serif text-5xl lg:text-6xl text-gold mb-4 leading-none"><Counter to={stat.val} suffix={stat.suffix} /></div>
                        <div className="text-xs font-light text-cream/50 uppercase leading-relaxed mt-2">
                          <span className="ar block tracking-normal">{stat.label_ar}</span>
                          <span className="en block tracking-[0.2em] mt-1">{stat.label_en}</span>
                        </div>
                      </div>
                    </StaggerChild>
                  ))}
                </StaggerParent>
              </div>
            </div>
          </Reveal>
        </div>

        <AnimatedDivider colorClass="text-charcoal" />
      </section>

      {/* ══════════════════════════════════════════
           3. DESIGN SERVICES SECTION
         ══════════════════════════════════════════ */}
      <section id="design-services" className="pt-24 pb-36 lg:pt-36 lg:pb-52 px-6 bg-charcoal text-cream-light relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -start-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gold/5" />
          <div className="absolute -end-20 bottom-20 w-[600px] h-[600px] rounded-full border border-gold/5 opacity-80" />
        </div>

        <div className="max-w-[1300px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-20 gap-8">
            <Reveal direction="left">
              <SectionLabel ar="خدمات التصميم" en="Design Services" light />
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream-light leading-[1.3] lg:leading-[1.2]">
                <span className="ar tracking-normal">من الفكرة<br /><em className="not-italic text-gold">إلى المخطط</em></span>
                <span className="en">From Concept<br /><em className="italic text-gold">to Blueprint</em></span>
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="max-w-sm text-start">
              <p className="text-cream/50 font-light text-base leading-loose text-justify">
                <span className="ar tracking-normal">نقدم خدمات تصميم داخلي شاملة تبدأ من التصورات الأولى وتصل إلى أدق تفاصيل التنفيذ.</span>
                <span className="en">Comprehensive interior design services from initial concepts down to the finest execution details.</span>
              </p>
            </Reveal>
          </div>

          <StaggerParent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-gold/15 border border-gold/15 shadow-2xl relative z-10">
            {[
              { num: "01", icon: Grid3x3, ar: "تصميم 2D", en: "2D Design", arDesc: "مخططات دقيقة بالأبعاد الفعلية وتوزيع أمثل للأثاث.", enDesc: "Precise 2D layouts with exact dimensions and optimal furniture placement." },
              { num: "02", icon: Layers, ar: "تصميم 3D", en: "3D Design", arDesc: "تصور واقعي للمساحة قبل التنفيذ باستخدام أحدث التقنيات.", enDesc: "Ultra-realistic 3D visualization before execution using cutting-edge tools." },
              { num: "03", icon: Box, ar: "حصر الكميات", en: "Bill of Quantities", arDesc: "جداول دقيقة للكميات تُسهل ضبط الميزانية وتفادي المفاجآت.", enDesc: "Accurate quantity schedules for effective budget control." },
              { num: "04", icon: Sun, ar: "المواد والألوان", en: "Materials & Colors", arDesc: "اختيار متناسق للخامات والألوان المتاحة في السوق المحلي.", enDesc: "Harmonious selection of locally available materials and colors." },
              { num: "05", icon: Lamp, ar: "توزيع الإنارة", en: "Lighting Setup", arDesc: "إضاءة مدروسة لإبراز جماليات كل مساحة وخلق الأجواء المطلوبة.", enDesc: "Thoughtful lighting design to highlight space aesthetics and create ambiance." },
              { num: "06", icon: Map, ar: "مخططات تنفيذية", en: "Executive Plans", arDesc: "خرائط هندسية تفصيلية تتضمن كل القياسات اللازمة للتنفيذ.", enDesc: "Detailed engineering blueprints with all measurements for on-site execution." },
            ].map((svc, idx) => (
              <StaggerChild key={idx}>
                <div className="group relative bg-charcoal p-10 lg:p-12 xl:p-14 h-full cursor-default overflow-hidden transition-colors duration-500 hover:bg-charcoal-light">
                  <div className="absolute bottom-0 start-0 h-[3px] w-0 bg-gold group-hover:w-full transition-all duration-700 ease-out" />
                  <span className="absolute top-8 start-8 font-serif text-[13px] text-gold/30 tracking-widest">{svc.num}</span>
                  
                  <div className="mb-8 mt-6 transition-transform duration-500 group-hover:-translate-y-2 group-hover:text-gold-light">
                    <svc.icon strokeWidth={1} className="w-12 h-12 text-gold/80" />
                  </div>
                  
                  <h3 className="font-sans font-bold text-xl text-cream-light mb-4 leading-snug">
                    <span className="ar tracking-normal">{svc.ar}</span>
                    <span className="en tracking-[0.1em]">{svc.en}</span>
                  </h3>
                  <p className="text-base font-light text-cream/50 leading-[2.2] text-justify">
                    <span className="ar tracking-normal">{svc.arDesc}</span>
                    <span className="en">{svc.enDesc}</span>
                  </p>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>

        <AnimatedDivider colorClass="text-cream-light" />
      </section>

      {/* ══════════════════════════════════════════
           4. EXECUTION SERVICES SECTION
         ══════════════════════════════════════════ */}
      <section id="execution-services" className="pt-24 pb-36 lg:pt-36 lg:pb-52 px-6 bg-cream-light relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute end-0 top-1/2 -translate-y-1/2 font-serif text-[280px] font-bold text-charcoal/3 leading-none hidden xl:block">KD</div>
        </div>

        <div className="max-w-[1300px] mx-auto relative z-10">
          <Reveal>
            <SectionLabel ar="خدمات التنفيذ" en="Execution Services" />
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-[1.3] lg:leading-[1.2] mb-20 lg:mb-24">
              <span className="ar tracking-normal">من المخطط<br /><em className="not-italic text-gold-dark">إلى الواقع</em></span>
              <span className="en">From Blueprint<br /><em className="italic text-gold-dark">To Reality</em></span>
            </h2>
          </Reveal>

          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 border border-charcoal/10 bg-white/60 backdrop-blur-md shadow-2xl relative z-10">
            {[
              { icon: HomeIcon, num: "01", ar: "أعمال التصميم الديكوري", en: "Decor Design Works", arDesc: "مجالس · غرف معيشة · مطابخ · حمامات · غرف نوم", enDesc: "Majlis · Living Rooms · Kitchens · Bathrooms · Bedrooms" },
              { icon: Wrench, num: "02", ar: "أعمال النجارة", en: "Carpentry Works", arDesc: "ديكورات خشبية · خزائن · مطابخ مدمجة", enDesc: "Wooden Decor · Wardrobes · Built-in Kitchens" },
              { icon: Square, num: "03", ar: "أعمال الجبس", en: "Gypsum Works", arDesc: "جدران · أسقف · ديكورات جبسية متنوعة", enDesc: "Walls · Ceilings · Various Gypsum Decorations" },
              { icon: Layers, num: "04", ar: "أسمنت بورد", en: "Cement Board", arDesc: "قواطع داخلية · واجهات خارجية", enDesc: "Interior Partitions · Exterior Facades" },
              { icon: Grid3x3, num: "05", ar: "الحجر وبدائله", en: "Stone & Alternatives", arDesc: "تكسية جدران داخلية · واجهات خارجية", enDesc: "Interior Wall Cladding · External Facades" },
              { icon: Star, num: "06", ar: "لوحات ثلاثية الأبعاد", en: "3D Panels", arDesc: "لوحات 3D مضيئة بأشكال وتصاميم متعددة", enDesc: "Illuminated 3D panels in various shapes and designs" },
              { icon: PaintBucket, num: "07", ar: "أعمال الدهانات", en: "Painting Works", arDesc: "دهانات متنوعة · تشطيبات ملمسية", enDesc: "Various Paints · Textured Finishes" },
            ].map((item, idx) => (
              <StaggerChild key={idx}>
                <div className={`group flex items-start gap-6 lg:gap-8 p-10 lg:p-12 xl:p-14 transition-colors duration-500 hover:bg-white/90 border-b border-charcoal/10 ${idx % 2 === 0 ? "md:border-e md:border-charcoal/10" : ""}`}>
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-charcoal shrink-0 flex items-center justify-center transition-all duration-500 group-hover:bg-gold shadow-md">
                    <item.icon strokeWidth={1.2} className="w-6 h-6 lg:w-7 lg:h-7 text-gold group-hover:text-charcoal transition-colors duration-500" />
                  </div>
                  <div className="flex-1 mt-1">
                    <div className="flex items-center gap-3 mb-3"><span className="font-serif text-[12px] text-charcoal/30 tracking-widest">{item.num}</span></div>
                    <h3 className="font-sans font-bold text-lg md:text-xl text-charcoal mb-3 leading-snug">
                      <span className="ar tracking-normal">{item.ar}</span>
                      <span className="en tracking-wide">{item.en}</span>
                    </h3>
                    <p className="text-base font-light text-text-muted leading-loose text-justify">
                      <span className="ar tracking-normal">{item.arDesc}</span>
                      <span className="en">{item.enDesc}</span>
                    </p>
                  </div>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>

        <AnimatedDivider colorClass="text-charcoal-mid" />
      </section>

      {/* ══════════════════════════════════════════
           5. CONTACT SECTION
         ══════════════════════════════════════════ */}
      <section id="contact" className="py-28 lg:py-48 px-6 bg-charcoal-mid relative text-cream-light">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -bottom-12 -start-8 font-serif text-[350px] font-bold text-gold/3 leading-none hidden md:block">KD</div>
        </div>

        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 items-center relative z-10">
          <Reveal direction="left">
            <SectionLabel ar="تواصل مع المكتب" en="Contact the Studio" light />
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream-light leading-[1.3] lg:leading-[1.2] mb-8">
              <span className="ar tracking-normal">دعنا نتحدث<br /><em className="not-italic text-gold">عن مشروعك</em></span>
              <span className="en">Let's Talk<br /><em className="italic text-gold">About Your Project</em></span>
            </h2>
            <p className="text-cream/60 font-light text-base lg:text-lg mb-14 leading-[2.2] text-justify max-w-lg">
              <span className="ar tracking-normal">نحن هنا لتحويل أفكارك إلى حقيقة. تواصل معنا للحصول على استشارتك المجانية ومناقشة تفاصيل مشروعك.</span>
              <span className="en">We are here to turn your ideas into reality. Contact us for a free consultation and to discuss the details of your project.</span>
            </p>

            <div className="space-y-5 max-w-md">
              {[
                { icon: Phone, labelAr: "الهاتف / واتساب", labelEn: "Phone / WhatsApp", valAr: "+968 7753 3603", valEn: "+968 7753 3603", link: "https://wa.link/gitycp", forceLtr: true },
                { icon: Instagram, labelAr: "إنستغرام", labelEn: "Instagram", valAr: "@future_design_decor", valEn: "@future_design_decor", link: "https://www.instagram.com/future_design_decor", forceLtr: true },
                { icon: MapPin, labelAr: "الموقع", labelEn: "Location", valAr: "سلطنة عُمان", valEn: "Sultanate of Oman", link: "#", forceLtr: false },
              ].map((c, i) => (
                <motion.a key={i} href={c.link} target="_blank" rel="noopener noreferrer" whileHover={{ y: -4, x: 5 }} transition={{ duration: 0.3 }} className="group flex items-center gap-6 p-6 lg:p-7 border border-gold/20 bg-white/5 hover:bg-white/10 hover:border-gold/50 transition-all duration-400 shadow-lg">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gold/10 shrink-0 flex items-center justify-center group-hover:bg-gold transition-colors duration-400">
                    <c.icon strokeWidth={1.5} className="w-6 h-6 text-gold group-hover:text-charcoal transition-colors duration-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] tracking-[0.3em] text-gold/70 uppercase mb-2 font-medium">
                      <span className="ar tracking-normal">{c.labelAr}</span>
                      <span className="en">{c.labelEn}</span>
                    </div>
                    <div className="text-lg font-medium text-cream/95" dir={c.forceLtr ? "ltr" : undefined}>
                      <span className="ar tracking-normal">{c.valAr}</span>
                      <span className="en tracking-wider">{c.valEn}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2} direction="right">
            <div className="relative group p-1 ml-4 hidden lg:block">
              <div className="absolute -top-6 -end-6 -bottom-6 start-6 border border-gold/20 pointer-events-none transition-all duration-700 group-hover:top-[-30px] group-hover:-end-[30px] opacity-70" />
              <div className="relative text-center py-24 px-12 bg-gradient-to-br from-charcoal to-[#1a1816] border border-gold/20 flex flex-col items-center justify-center backdrop-blur-sm shadow-2xl">
                <BrandLogo className="w-32 h-24 text-gold mb-14 opacity-90" />
                <div className="w-24 h-[1px] bg-gold/30 mb-10" />
                <div className="font-sans font-light text-2xl tracking-[0.4em] uppercase text-cream/90 mb-4">Khaled Diab</div>
                <div className="font-sans font-medium text-sm tracking-[0.4em] uppercase text-gold/70">Future Design Decore</div>
                <div className="mt-12 text-[12px] tracking-[0.2em] uppercase text-cream/40">
                  <span className="ar tracking-normal">سلطنة عُمان</span>
                  <span className="en">Sultanate of Oman</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
           6. FOOTER
         ══════════════════════════════════════════ */}
      <footer className="bg-charcoal border-t border-gold/15 py-12 px-6 pb-32 lg:pb-12">
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <BrandLogo className="w-10 h-8 text-gold/60" />
            <p className="text-sm font-light text-cream/40 tracking-wider">© 2026 Future Design Decore — All rights reserved.</p>
          </div>
          <div className="flex gap-10">
            <a href="https://www.instagram.com/future_design_decor" target="_blank" rel="noopener noreferrer" className="text-xs tracking-[0.25em] text-cream/50 hover:text-gold uppercase transition-colors duration-400 font-medium">Instagram</a>
            <a href="https://wa.link/gitycp" target="_blank" rel="noopener noreferrer" className="text-xs tracking-[0.25em] text-cream/50 hover:text-gold uppercase transition-colors duration-400 font-medium">WhatsApp</a>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
