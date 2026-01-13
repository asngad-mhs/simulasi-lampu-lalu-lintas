import React from 'react';

const Hero: React.FC = () => {

  const handleCTAClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetElement = document.getElementById('simulation');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center overflow-hidden bg-gray-900">
      {/* Background & Overlays */}
      <div className="absolute inset-0 z-0">
        {/* Fallback gradient if image fails or while loading */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        
        <img 
          src="https://images.unsplash.com/photo-1550751827-4138d04d475d?q=80&w=2070&auto=format&fit=crop" 
          alt="Latar belakang sirkuit digital abstrak" 
          className="absolute inset-0 object-cover w-full h-full opacity-40 mix-blend-luminosity"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        
        {/* Gradient Overlay for style */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-cyan-900/20"></div>
      </div>

      <div className="relative z-20 container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tighter drop-shadow-xl">
          Evolusi Pengendali <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Lalu Lintas</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 drop-shadow-md leading-relaxed">
          Dari Logika Sekuensial Flip-Flop hingga Kontrol Adaptif Berbasis AI yang Interaktif.
        </p>
        <a 
          href="#simulation" 
          onClick={handleCTAClick}
          className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer border border-cyan-500/30"
        >
          Mulai Simulasi
        </a>
      </div>
    </section>
  );
};

export default Hero;