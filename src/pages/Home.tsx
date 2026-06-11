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
  Info,
  Briefcase
} from "lucide-react";
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
    <div className={`flex items-center gap-4 text-xs font-medium uppercase mb-6 ${color}`}>
      <div className={`w-12 h-[1px] shrink-0 ${lineColor} opacity-70`} />
      <span className="ar tracking-normal">{ar}</span>
      <span className="en tracking-[0.5em]">{en}</span>
    </div>
  );
}

/* ─── Mobile Bottom Bar (App-like UX) ─── */
const MobileBottomBar = () => {
  const [active, setActive] = useState("home");
  
  const navItems = [
    { id: "home", icon: HomeIcon, label: "الرئيسية", href: "#top" },
    { id: "about", icon: Info, label: "من نحن", href: "#about" },
    { id: "services", icon: Briefcase, label: "الخدمات", href: "#design-services" },
    { id: "contact", icon: Phone, label: "تواصل", href: "#contact" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-charcoal/85 backdrop-blur-xl border-t border-gold/15 pb-6 pt-3 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <a 
              key={item.id} 
              href={item.href}
              onClick={() => setActive(item.id)}
              className="flex flex-col items-center gap-1.5 w-16"
            >
              <div className={`p-2 rounded-full transition-all duration-300 ${isActive ? 'bg-gold/15 text-gold' : 'text-cream/40 hover:text-cream/80'}`}>
                <item.icon strokeWidth={isActive ? 2 : 1.5} className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-medium transition-colors duration-300 ${isActive ? 'text-gold' : 'text-cream/40'}`}>
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-charcoal pb-20 md:pb-0">
      <Nav />
      <MobileBottomBar />

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="relative h-[100dvh] bg-charcoal flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[40%] -end-[15%] w-[700px] h-[700px] rounded-full border border-gold/20" />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.5 }} className="absolute -top-[25%] -end-[5%] w-[480px] h-[480px] rounded-full border border-gold/12" />
          <div className="absolute inset-0 bg-gradient-to-tr from-gold/4 via-transparent to-transparent opacity-80" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6 flex flex-col items-center pt-28 md:pt-32">
          <motion.div initial={{ scale: 0.88, opacity: 0.6 }} animate={{ scale: 1, opacity: 0.88 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="mb-7">
            <BrandLogo className="w-28 h-20 text-cream-light" />
          </motion.div>
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} style={{ transformOrigin: "top" }} className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gold to-transparent mx-auto mb-7" />
          
          <motion.p initial={{ y: 14, opacity: 0.3 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }} className="font-sans font-extralight text-xs md:text-sm text-gold-light uppercase mb-5">
            <span className="ar tracking-normal">خالد دياب</span>
            <span className="en tracking-[0.45em] ml-4">Khaled Diab</span>
          </motion.p>
          
          <motion.h1 initial={{ y: 22, opacity: 0.2 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }} className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream-light leading-[1.1] -tracking-[0.02em] mb-3">
            Future Design
          </motion.h1>
          <motion.h1 initial={{ y: 22, opacity: 0.2 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }} className="font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gold leading-[1.1] -tracking-[0.02em] mb-10">
            Decore
          </motion.h1>
          
          <motion.p initial={{ y: 16, opacity: 0.25 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }} className="font-sans font-light text-xs sm:text-sm md:text-base text-cream/55 uppercase mb-12 leading-loose flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center">
            <span className="ar tracking-normal">تصميم داخلي · تنفيذ احترافي · إبداع لا حدود له</span>
            <span className="en tracking-[0.12em] hidden md:block">Interior Design · Professional Execution · Limitless Creativity</span>
          </motion.p>
          
          <motion.div initial={{ y: 14, opacity: 0.3 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}>
            <a href="#design-services" className="group relative inline-flex items-center gap-3 px-10 py-4 border border-gold/40 text-gold-light font-sans text-xs uppercase overflow-hidden transition-colors duration-300 hover:text-charcoal">
              <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">
                <span className="ar tracking-normal">استكشف خدماتنا</span>
                <span className="en tracking-[0.3em] hidden">Explore Services</span>
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. ABOUT
      ══════════════════════════════════════════ */}
      <section id="about" className="py-24 lg:py-40 px-6 bg-cream-light relative">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 items-center">
          <Reveal direction="left">
            <SectionLabel ar="من نحن" en="About Us" />
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-charcoal leading-[1.2] lg:leading-[1.15] mb-8">
              <span className="ar tracking-normal">نحوّل <em className="not-italic text-gold-dark">المساحات</em><br />إلى تحف فنية</span>
            </h2>
            <div className="space-y-6 text-text-muted font-light text-base md:text-lg leading-[2] text-justify">
              <p>
                <span className="ar tracking-normal">في فيوتشر ديزاين ديكور، نؤمن بأن كل مساحة تروي قصة. بقيادة المصمم خالد دياب، نجمع بين الفخامة والوظيفة لنبتكر تصاميم داخلية تعكس شخصية عملائنا وترتقي بأسلوب حياتهم.</span>
              </p>
              <p>
                <span className="ar tracking-normal">نقدم حلولاً متكاملة من التصميم على الورق حتى التسليم النهائي، مع اهتمام استثنائي بأدق التفاصيل وأعلى معايير الجودة.</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2} direction="right">
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -top-3 -end-3 -bottom-3 start-3 border border-gold/50 opacity-60 pointer-events-none" />
              <div className="bg-charcoal p-8 lg:p-16 relative shadow-2xl">
                <StaggerParent className="grid grid-cols-2 gap-0">
                  {[
                    { val: "2D", label_ar: "تصميم بالمقاسات", label_en: "Scaled Design" },
                    { val: "3D", label_ar: "مجسمات واقعية", label_en: "Realistic Renders" },
                    { val: 13, suffix: "+", label_ar: "خدمة متكاملة", label_en: "Integrated Services" },
                    { val: 100, suffix: "%", label_ar: "رضا العملاء", label_en: "Client Satisfaction" },
                  ].map((stat, i) => (
                    <StaggerChild key={i}>
                      <div className={`py-8 px-4 text-center ${i % 2 === 0 ? "border-e border-gold/15" : ""} ${i < 2 ? "border-b border-gold/15" : ""}`}>
                        <div className="font-serif text-4xl lg:text-5xl text-gold mb-3 leading-none"><Counter to={stat.val} suffix={stat.suffix} /></div>
                        <div className="text-[11px] font-light text-cream/45 uppercase leading-tight">
                          <span className="ar block tracking-normal">{stat.label_ar}</span>
                          <span className="en block tracking-widest mt-1">{stat.label_en}</span>
                        </div>
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
          3. DESIGN SERVICES
      ══════════════════════════════════════════ */}
      <section id="design-services" className="py-24 lg:py-40 px-6 bg-charcoal text-cream-light relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
            <Reveal direction="left">
              <SectionLabel ar="خدمات التصميم" en="Design Services" light />
              <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-cream-light leading-[1.2]">
                <span className="ar tracking-normal">من الفكرة<br /><em className="not-italic text-gold">إلى المخطط</em></span>
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="max-w-xs text-start">
              <p className="text-cream/40 font-light text-sm leading-relaxed text-justify">
                <span className="ar tracking-normal">نقدم خدمات تصميم داخلي شاملة تبدأ من التصورات الأولى وتصل إلى أدق تفاصيل التنفيذ.</span>
              </p>
            </Reveal>
          </div>

          <StaggerParent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-gold/10 border border-gold/10 shadow-lg">
            {[
              { num: "01", icon: Grid3x3, ar: "تصميم 2D", arDesc: "مخططات دقيقة بالأبعاد الفعلية وتوزيع أمثل للأثاث." },
              { num: "02", icon: Layers, ar: "تصميم 3D", arDesc: "تصور واقعي للمساحة قبل التنفيذ باستخدام أحدث التقنيات." },
              { num: "03", icon: Box, ar: "حصر الكميات", arDesc: "جداول دقيقة للكميات تُسهل ضبط الميزانية وتفادي المفاجآت." },
              { num: "04", icon: Sun, ar: "المواد والألوان", arDesc: "اختيار متناسق للخامات والألوان المتاحة في السوق المحلي." },
              { num: "05", icon: Lamp, ar: "توزيع الإنارة", arDesc: "إضاءة مدروسة لإبراز جماليات كل مساحة وخلق الأجواء المطلوبة." },
              { num: "06", icon: Map, ar: "مخططات تنفيذية", arDesc: "خرائط هندسية تفصيلية تتضمن كل القياسات اللازمة للتنفيذ." },
            ].map((svc, idx) => (
              <StaggerChild key={idx}>
                <div className="group relative bg-charcoal p-8 xl:p-12 h-full cursor-default overflow-hidden transition-colors duration-500 hover:bg-charcoal-light">
                  <div className="absolute bottom-0 start-0 h-[2px] w-0 bg-gold group-hover:w-full transition-all duration-500" />
                  <span className="absolute top-6 start-6 font-serif text-[11px] text-gold/20 tracking-widest">{svc.num}</span>
                  <div className="mb-6 mt-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-gold-light">
                    <svc.icon strokeWidth={1.2} className="w-10 h-10 text-gold/70" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-cream-light mb-3 leading-snug">
                    <span className="ar tracking-normal">{svc.ar}</span>
                  </h3>
                  <p className="text-sm font-light text-cream/45 leading-[1.9] text-justify">
                    <span className="ar tracking-normal">{svc.arDesc}</span>
                  </p>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-24 lg:py-40 px-6 bg-charcoal-mid relative overflow-hidden text-cream-light border-t border-gold/10">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center relative z-10">
          <Reveal direction="left">
            <SectionLabel ar="تواصل مع المكتب" en="Contact Us" light />
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-cream-light leading-[1.2] mb-6">
              <span className="ar tracking-normal">دعنا نتحدث<br /><em className="not-italic text-gold">عن مشروعك</em></span>
            </h2>
            <p className="text-cream/50 font-light text-base mb-12 leading-[1.9] text-justify max-w-lg">
              <span className="ar tracking-normal">نحن هنا لتحويل أفكارك إلى حقيقة. تواصل معنا للحصول على استشارتك المجانية ومناقشة تفاصيل مشروعك.</span>
            </p>

            <div className="space-y-4 max-w-md">
              {[
                { icon: Phone, labelAr: "الهاتف / واتساب", valAr: "+968 7753 3603", link: "https://wa.link/gitycp", forceLtr: true },
                { icon: Instagram, labelAr: "إنستغرام", valAr: "@future_design_decor", link: "https://www.instagram.com/future_design_decor", forceLtr: true },
                { icon: MapPin, labelAr: "الموقع", valAr: "سلطنة عُمان", link: "#", forceLtr: false },
              ].map((c, i) => (
                <motion.a key={i} href={c.link} target="_blank" rel="noopener noreferrer" whileHover={{ y: -4, x: 5 }} transition={{ duration: 0.3 }} className="group flex items-center gap-5 p-5 border border-gold/15 bg-white/3 hover:bg-white/5 hover:border-gold/30 transition-all duration-300 shadow-md">
                  <div className="w-12 h-12 rounded-full bg-gold/10 shrink-0 flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                    <c.icon className="w-5 h-5 text-gold group-hover:text-charcoal transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] text-gold/60 mb-1 font-medium">
                      <span className="ar tracking-normal">{c.labelAr}</span>
                    </div>
                    <div className="text-base font-medium text-cream/95" dir={c.forceLtr ? "ltr" : undefined}>
                      <span className="ar tracking-normal">{c.valAr}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
