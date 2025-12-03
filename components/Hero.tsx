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
    <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-gray-900 opacity-60 z-10"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-transparent to-cyan-900 opacity-70"></div>
        <img src="https://images.unsplash.com/photo-1550751827-4138d04d475d?q=80&w=2070&auto=format&fit=crop" alt="Latar belakang sirkuit digital abstrak" className="object-cover w-full h-full"/>
      </div>
      <div className="relative z-20 container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 tracking-tighter">
          Evolusi Pengendali <span className="text-cyan-400">Lalu Lintas</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Dari Logika Sekuensial Flip-Flop hingga Kontrol Adaptif Berbasis AI yang Interaktif.
        </p>
        <a 
          href="#simulation" 
          onClick={handleCTAClick}
          className="mt-8 inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 cursor-pointer"
        >
          Coba Simulasi
        </a>
      </div>
    </section>
  );
};

export default Hero;