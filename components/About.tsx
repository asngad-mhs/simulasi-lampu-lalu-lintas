import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Tentang Proyek</h2>
          <p className="text-gray-400 mt-2">Bagaimana logika digital membentuk dunia di sekitar kita.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop" 
              alt="Visualisasi alur lalu lintas di malam hari" 
              className="rounded-lg shadow-2xl shadow-cyan-500/20"
            />
          </div>
          <div className="md:w-1/2 text-lg text-gray-300 space-y-4">
            <p>
              Aplikasi ini adalah jurnal simulasi yang memvisualisasikan cara kerja pengendali lampu lalu lintas. Awalnya, sistem ini didasarkan pada <strong className="text-cyan-400">logika sekuensial</strong>, sebuah konsep fundamental dalam elektronika digital yang diimplementasikan menggunakan sirkuit seperti <strong className="text-cyan-400">flip-flop</strong>.
            </p>
            <p>
              Flip-flop menciptakan 'state machine' yang berpindah keadaan (hijau, kuning, merah) dalam urutan waktu yang tetap. Ini adalah dasar yang andal, tetapi tidak efisien dalam menghadapi kondisi lalu lintas yang dinamis.
            </p>
            <div className="pt-4 mt-4 border-t border-gray-700">
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">Langkah Selanjutnya: Kontrol Cerdas Berbasis AI</h3>
              <p>
                Teknologi masa depan membawa kita ke <strong className="text-cyan-400">sistem adaptif</strong>. Dengan mensimulasikan "sensor" yang mendeteksi kepadatan lalu lintas, sistem dapat menggunakan algoritma cerdas untuk menyesuaikan durasi lampu hijau secara real-time. Tujuannya adalah untuk mengoptimalkan alur, mengurangi kemacetan, dan meningkatkan efisiensi—seperti yang Anda coba di "Mode Cerdas" pada simulasi ini.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;