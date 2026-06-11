import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Home, PenTool, Wrench, Briefcase, Phone } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [lang, setLang] = useState<"ar" | "en">("ar");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 100 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  // 1. مصفوفة روابط الشاشات الكبيرة (مطابقة للصورة المرفقة)
  const desktopLinks = [
    { id: "about", labelAr: "من نحن", labelEn: "About Us", href: "#about" },
    { id: "design-services", labelAr: "خدمات التصميم", labelEn: "Design Services", href: "#design-services" },
    { id: "execution-services", labelAr: "خدمات التنفيذ", labelEn: "Execution Services", href: "#execution-services" },
    { id: "portfolio", labelAr: "أهم أعمالنا", labelEn: "Our Portfolio", href: "/portfolio" }, // صفحة منفصلة
    { id: "contact", labelAr: "تواصل معنا", labelEn: "Contact Us", href: "#contact" },
  ];

  // 2. مصفوفة روابط الشريط السفلي للهاتف (تقتصر على 5 عناصر لضمان الأناقة)
  const mobileNavItems = [
    { id: "home", icon: Home, labelAr: "الرئيسية", labelEn: "Home", href: "#top" },
    { id: "design", icon: PenTool, labelAr: "التصميم", labelEn: "Design", href: "#design-services" },
    { id: "execution", icon: Wrench, labelAr: "التنفيذ", labelEn: "Execution", href: "#execution-services" },
    { id: "portfolio", icon: Briefcase, labelAr: "أعمالنا", labelEn: "Portfolio", href: "/portfolio" }, // صفحة منفصلة
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
          scrolled ? "bg-charcoal/90 backdrop-blur-md border-b border-gold/10 py-3 shadow-lg" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1300px] mx-auto px-6 flex items-center justify-between">
          
          {/* الروابط للشاشات الكبيرة (تظهر بناءً على اللغة) */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10" dir={lang === "ar" ? "rtl" : "ltr"}>
            {desktopLinks.map((item) => (
              <a 
                key={item.id} 
                href={item.href} 
                className="text-sm font-medium text-cream/70 hover:text-gold transition-colors duration-300 relative group"
              >
                {lang === "ar" ? (
                  <span className="ar tracking-normal">{item.labelAr}</span>
                ) : (
                  <span className="en tracking-widest uppercase text-[11px]">{item.labelEn}</span>
                )}
                {/* تأثير خط سفلي خفيف عند التمرير بالماوس */}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* الشعار - يتوسط الشاشة */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
            <BrandLogo className="w-10 h-8 text-gold" />
            <span className="font-serif text-lg tracking-[0.2em] text-cream-light uppercase hidden sm:block mt-1">
              Khaled Diab
            </span>
          </div>

          {/* زر تبديل اللغة */}
          <button 
            onClick={toggleLanguage}
            className="px-5 py-2 rounded-full border border-gold/30 text-[10px] tracking-widest text-cream/80 uppercase hover:bg-gold hover:text-charcoal transition-all duration-300 relative z-10 ml-auto lg:ml-0 font-medium"
          >
            {lang === "ar" ? "English" : "عـربـي"}
          </button>
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════
          2. MOBILE BOTTOM BAR (Golden Glassmorphism)
      ══════════════════════════════════════════ */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50">
        <div className="bg-[#1a1816]/85 backdrop-blur-xl border-t border-gold/20 pb-6 pt-3 px-4 shadow-[0_-15px_40px_-10px_rgba(212,175,55,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />
          
          {/* قمنا بتوسيع المساحة قليلاً لتستوعب 5 أيقونات براحة */}
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
