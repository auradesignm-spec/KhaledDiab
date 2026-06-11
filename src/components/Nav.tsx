import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Home, PenTool, Wrench, Briefcase, Phone, Menu, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [lang, setLang] = useState<"ar" | "en">("ar");
  
  // حالة فتح وإغلاق القائمة المنسدلة في الجوال
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // إخفاء الهيدر فقط إذا لم تكن القائمة الجانبية مفتوحة
    if (latest > 100 && latest > previous && !isMobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  // روابط الشاشات الكبيرة والقائمة الجانبية
  const desktopLinks = [
    { id: "about", labelAr: "من نحن", labelEn: "About Us", href: "#about" },
    { id: "design-services", labelAr: "خدمات التصميم", labelEn: "Design Services", href: "#design-services" },
    { id: "execution-services", labelAr: "خدمات التنفيذ", labelEn: "Execution Services", href: "#execution-services" },
    { id: "portfolio", labelAr: "أهم أعمالنا", labelEn: "Our Portfolio", href: "/portfolio" },
    { id: "contact", labelAr: "تواصل معنا", labelEn: "Contact Us", href: "#contact" },
  ];

  // روابط الشريط السفلي للهاتف
  const mobileNavItems = [
    { id: "home", icon: Home, labelAr: "الرئيسية", labelEn: "Home", href: "#top" },
    { id: "design", icon: PenTool, labelAr: "التصميم", labelEn: "Design", href: "#design-services" },
    { id: "execution", icon: Wrench, labelAr: "التنفيذ", labelEn: "Execution", href: "#execution-services" },
    { id: "portfolio", icon: Briefcase, labelAr: "أعمالنا", labelEn: "Portfolio", href: "/portfolio" },
    { id: "contact", icon: Phone, labelAr: "تواصل", labelEn: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════
          1. TOP HEADER (Desktop & Mobile Top)
      ══════════════════════════════════════════ */}
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled || isMobileMenuOpen ? "bg-charcoal/95 backdrop-blur-md border-b border-gold/10 py-3 shadow-lg" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1300px] mx-auto px-6">
          
          {/* ─── تخطيط الشاشات الكبيرة (Desktop) ─── */}
          <div className="hidden lg:grid grid-cols-3 items-center w-full">
            
            {/* 1. الشعار والاسم (أقصى اليسار دائماً) */}
            <div className="flex items-center justify-start gap-3">
              <BrandLogo className="w-10 h-8 text-gold" />
              <span className="font-serif text-lg tracking-[0.2em] text-cream-light uppercase mt-1">
                Khaled Diab
              </span>
            </div>

            {/* 2. الروابط (في المنتصف تماماً وباللون الأبيض) */}
            <nav className="flex items-center justify-center gap-8 xl:gap-10 flex-row-reverse">
              {desktopLinks.map((item) => (
                <a 
                  key={item.id} 
                  href={item.href} 
                  className="text-sm font-medium text-white hover:text-gold transition-colors duration-300 relative group"
                >
                  {lang === "ar" ? (
                    <span className="ar tracking-normal">{item.labelAr}</span>
                  ) : (
                    <span className="en tracking-widest uppercase text-[11px]">{item.labelEn}</span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* 3. زر اللغة (أقصى اليمين دائماً) */}
            <div className="flex items-center justify-end">
              <button 
                onClick={toggleLanguage}
                className="px-5 py-2 rounded-full border border-gold/30 text-[10px] tracking-widest text-cream/80 uppercase hover:bg-gold hover:text-charcoal transition-all duration-300 font-medium"
              >
                {lang === "ar" ? "English" : "عـربـي"}
              </button>
            </div>
          </div>

          {/* ─── تخطيط الموبايل (Mobile) ─── */}
          <div className="flex lg:hidden items-center justify-between w-full">
            
            {/* زر القائمة المنسدلة (Hamburger) */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-gold hover:text-white transition-colors"
            >
              <Menu strokeWidth={1.5} className="w-7 h-7" />
            </button>

            {/* الشعار في المنتصف للموبايل */}
            <div className="flex items-center gap-2">
              <BrandLogo className="w-8 h-6 text-gold" />
            </div>

            {/* زر اللغة للموبايل */}
            <button 
              onClick={toggleLanguage}
              className="px-4 py-1.5 rounded-full border border-gold/30 text-[9px] tracking-widest text-cream/80 uppercase hover:bg-gold hover:text-charcoal transition-all duration-300 font-medium"
            >
              {lang === "ar" ? "EN" : "عـربـي"}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════
          2. MOBILE SIDE DRAWER (قائمة منسدلة جانبية للموبايل)
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* خلفية معتمة عند فتح القائمة */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            
            {/* القائمة الجانبية المستوحاة من التطبيقات */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 w-[75vw] max-w-sm bg-charcoal z-[70] lg:hidden border-r border-gold/10 shadow-2xl flex flex-col"
            >
              {/* رأس القائمة الجانبية */}
              <div className="flex items-center justify-between p-6 border-b border-gold/10">
                <div className="flex items-center gap-3">
                  <BrandLogo className="w-8 h-6 text-gold" />
                  <span className="font-serif text-sm tracking-[0.2em] text-cream-light uppercase mt-1">
                    Khaled Diab
                  </span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-white/5 rounded-full text-cream/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* الروابط داخل القائمة الجانبية */}
              <div className="flex flex-col py-6 px-4 gap-2 overflow-y-auto">
                {desktopLinks.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-4 rounded-xl text-white font-medium hover:bg-gold/10 hover:text-gold transition-colors flex items-center justify-between"
                  >
                    <span className={lang === "ar" ? "ar text-base tracking-normal" : "en text-sm tracking-widest uppercase"}>
                      {lang === "ar" ? item.labelAr : item.labelEn}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          3. MOBILE BOTTOM BAR (الشريط السفلي)
      ══════════════════════════════════════════ */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40">
        <div className="bg-[#1a1816]/85 backdrop-blur-xl border-t border-gold/20 pb-6 pt-3 px-4 shadow-[0_-15px_40px_-10px_rgba(212,175,55,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />
          
          <div className="flex justify-between items-center relative z-10 max-w-md mx-auto">
            {mobileNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveTab(item.id)}
                  className="flex flex-col items-center gap-1.5 flex-1 group outline-none"
                >
                  <div className={`relative p-2.5 rounded-full transition-colors duration-500 ${isActive ? "text-charcoal" : "text-cream/40 group-hover:text-gold/80"}`}>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-gradient-to-br from-gold-light to-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <item.icon strokeWidth={isActive ? 2 : 1.5} className="w-[20px] h-[20px] relative z-10" />
                  </div>
                  
                  <span 
                    className={`font-medium transition-all duration-300 ${
                      isActive ? "text-gold translate-y-0" : "text-cream/30 opacity-70"
                    } ${
                      lang === "en" ? "text-[8px] tracking-widest uppercase" : "text-[10px] tracking-normal"
                    }`}
                  >
                    {lang === "ar" ? item.labelAr : item.labelEn}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
