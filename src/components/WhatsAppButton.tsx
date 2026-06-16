import React from "react";

export default function WhatsAppButton() {
  const phoneNumber = "96877533603"; 
  const welcomeMessage = "مرحباً، أود الاستفسار عن خدماتكم المتميزة."; 
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(welcomeMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      // التعديل تم هنا: bottom-28 للهاتف، و md:bottom-8 للكمبيوتر
      className="fixed bottom-28 md:bottom-15 right-6 z-[99] flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] text-white transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a] active:scale-95 group"
      aria-label="Contact us on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none group-hover:animate-none" />
      
      <svg
        className="w-7 h-7 fill-current relative z-10 transition-transform duration-300 group-hover:rotate-[12deg]"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.632-1.023-5.105-2.887-6.97C16.579 1.918 14.11 1.887 11.5 1.887a9.83 9.83 0 0 0-9.855 9.857c-.001 1.688.448 3.334 1.302 4.772a.52.52 0 0 1 .073.44l-1.02 3.722 3.811-1.002a.512.512 0 0 1 .436.069zM17.13 14.37c-.304-.153-1.8-.886-2.077-.988-.278-.101-.48-.153-.681.153-.202.304-.783.988-.96 1.19-.177.202-.354.228-.658.076-.304-.153-1.283-.473-2.443-1.508-.903-.805-1.512-1.8-1.689-2.103-.177-.304-.019-.468.133-.62.137-.137.304-.354.456-.532.152-.177.202-.304.304-.506.101-.202.051-.38-.025-.532-.076-.153-.681-1.642-.933-2.25-.245-.592-.495-.512-.681-.522-.176-.01-.379-.01-.581-.01s-.532.076-.81.38c-.278.304-1.062 1.039-1.062 2.533s1.088 2.939 1.24 3.141c.152.202 2.141 3.268 5.187 4.582.724.313 1.29.5 1.732.641.727.23 1.389.198 1.912.12.583-.087 1.8-.736 2.053-1.419.253-.684.253-1.267.177-1.39-.076-.127-.278-.203-.582-.356z" />
      </svg>
    </a>
  );
}
