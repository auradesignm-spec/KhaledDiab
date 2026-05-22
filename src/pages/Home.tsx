{/* ══════════════════════════════════════════
          6. CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-32 lg:py-40 px-6 bg-charcoal-mid relative overflow-hidden text-cream-light">
        {/* watermark */}
        <div className="absolute -bottom-12 -start-8 font-serif text-[280px] font-bold text-gold/4 leading-none pointer-events-none select-none hidden md:block">
          KD
        </div>

        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center relative z-10">
          {/* Left */}
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
                {
                  icon: Phone,
                  labelAr: "الهاتف / واتساب",
                  labelEn: "Phone / WhatsApp",
                  valAr: "+968 7753 3603",
                  valEn: "+968 7753 3603",
                  link: "https://wa.link/gitycp",
                  forceLtr: true,
                },
                {
                  icon: Instagram,
                  labelAr: "إنستغرام",
                  labelEn: "Instagram",
                  valAr: "@future_design_decor",
                  valEn: "@future_design_decor",
                  link: "https://www.instagram.com/future_design_decor",
                  forceLtr: true,
                },
                {
                  icon: MapPin,
                  labelAr: "الموقع",
                  labelEn: "Location",
                  valAr: "سلطنة عُمان",
                  valEn: "Sultanate of Oman",
                  link: "#",
                  forceLtr: false,
                },
              ].map((c, i) => (
                <motion.a
                  key={i}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="group flex items-center gap-6 p-5 border border-gold/12 bg-white/3 hover:bg-gold/8 hover:border-gold/35 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 shrink-0 flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                    <c.icon className="w-5 h-5 text-gold group-hover:text-charcoal transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] text-gold/60 uppercase mb-1">
                      <span className="ar">{c.labelAr}</span>
                      <span className="en">{c.labelEn}</span>
                    </div>
                    {/* تمت إضافة dir="ltr" للحفاظ على ترتيب الأرقام والرموز */}
                    <div className="text-base font-medium text-cream/90" dir={c.forceLtr ? "ltr" : undefined}>
                      <span className="ar">{c.valAr}</span>
                      <span className="en">{c.valEn}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </Reveal>

          {/* Right — logo card */}
          <Reveal delay={0.2} direction="right">
            <div className="relative group">
              <div className="absolute -top-4 -end-4 -bottom-4 start-4 border border-gold/20 pointer-events-none transition-all duration-500 group-hover:top-[-20px] group-hover:-end-[20px]" />
              <div className="relative text-center py-20 px-10 bg-gradient-to-br from-white/3 to-white/6 border border-gold/15 flex flex-col items-center justify-center backdrop-blur-sm">
                <BrandLogo className="w-28 h-20 text-gold mb-10" />
                <div className="w-16 h-[1px] bg-gold/30 mb-8" />
                <div className="font-sans font-light text-xl tracking-[0.5em] uppercase text-cream/85 mb-3">
                  Khaled Diab
                </div>
                <div className="font-sans font-light text-xs tracking-[0.4em] uppercase text-gold/60">
                  Future Design Decore
                </div>
                <div className="mt-8 text-[11px] tracking-[0.25em] uppercase text-cream/30">
                  <span className="ar">سلطنة عُمان</span>
                  <span className="en">Sultanate of Oman</span>
                </div>
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
            <p className="text-xs font-light text-cream/35 tracking-wider">
              © 2025 Future Design Decore — All rights reserved
            </p>
          </div>
          <div className="flex gap-8">
            <a
              href="https://www.instagram.com/future_design_decor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.25em] text-cream/45 hover:text-gold uppercase transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="https://wa.link/gitycp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.25em] text-cream/45 hover:text-gold uppercase transition-colors duration-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
