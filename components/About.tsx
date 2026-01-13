import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-gray-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Tentang <span className="text-cyan-400">Proyek</span></h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            Menjembatani teori logika digital klasik dengan implementasi sistem cerdas modern.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative group perspective-1000">
             {/* Image container with glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-800">
                <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop" 
                alt="Visualisasi alur lalu lintas di malam hari" 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
          
          <div className="md:w-1/2 space-y-8">
            <div className="relative pl-8 border-l-2 border-gray-700 hover:border-cyan-500 transition-colors duration-300">
                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-cyan-500"></span>
                <h3 className="text-2xl font-bold text-white mb-3">Logika Sekuensial</h3>
                <p className="text-gray-400 leading-relaxed">
                Jantung dari sistem klasik. Menggunakan sirkuit <strong className="text-cyan-400">flip-flop</strong> sebagai memori 1-bit untuk membentuk <em>State Machine</em> yang andal namun kaku. Sistem ini berpindah fase (Merah-Kuning-Hijau) berdasarkan waktu yang telah ditentukan, tanpa mempedulikan kondisi jalan.
                </p>
            </div>

            <div className="relative pl-8 border-l-2 border-gray-700 hover:border-blue-500 transition-colors duration-300">
                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-blue-500"></span>
                <h3 className="text-2xl font-bold text-white mb-3">Kontrol Adaptif (AI)</h3>
                <p className="text-gray-400 leading-relaxed">
                Evolusi menuju efisiensi. Dalam simulasi ini, mode cerdas bertindak sebagai lapisan <strong className="text-blue-400">logika adaptif</strong> yang membaca "sensor" kepadatan kendaraan. Durasi lampu hijau disesuaikan secara dinamis (real-time) untuk mengurai kemacetan, merepresentasikan sistem <em>Smart City</em> modern.
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;