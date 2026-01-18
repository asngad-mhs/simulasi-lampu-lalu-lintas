import React from 'react';

const FeatureCard: React.FC<{ icon: React.ReactElement; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-cyan-500 hover:scale-105 transition-all duration-300 flex flex-col h-full">
    <div className="text-cyan-400 mb-4">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 flex-grow">{description}</p>
  </div>
);

const DetailItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="relative pl-8 border-l-2 border-gray-700 hover:border-cyan-500 transition-colors duration-300 py-2">
        <span className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-gray-900 border-2 border-cyan-500"></span>
        <h4 className="text-xl font-bold text-white mb-1">{title}</h4>
        <p className="text-gray-400 leading-relaxed">
            {children}
        </p>
    </div>
);

const Features: React.FC = () => {
  const otherFeatures = [
    {
      title: 'State Machine',
      description: 'Inti dari logika lampu lalu lintas. Fitur ini menyoroti bagaimana sistem beroperasi sebagai Finite State Machine (FSM)—sebuah model dengan jumlah **keadaan (state)** yang terbatas dan **transisi** yang terdefinisi dengan jelas. Amati bagaimana setiap fase (mis. \'NS Hijau, EW Merah\') adalah state unik, dan timer bertindak sebagai pemicu untuk transisi ke state berikutnya dalam urutan yang aman.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" /></svg>
    },
     {
      title: 'Kontrol Adaptif (AI)',
      description: 'Masuk ke mode cerdas di mana sistem menyesuaikan durasi lampu hijau berdasarkan permintaan lalu lintas yang disimulasikan.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75h.008v.008h-.008v-.008Zm0 3.75h.008v.008h-.008v-.008Zm0 3.75h.008v.008h-.008v-.008Zm-3.75-3.75h.008v.008h-.008v-.008Zm0 3.75h.008v.008h-.008v-.008Zm-3.75 0h.008v.008h-.008v-.008Z" /></svg>
    },
    {
      title: 'Visualisasi Real-Time',
      description: 'Lihat perubahan lampu dan antrian kendaraan secara langsung, memberikan pemahaman intuitif tentang durasi dan prioritas setiap fase.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-cyan-400">Konsep Kunci</h2>
          <p className="text-gray-400 mt-2">Pilar-pilar yang mendasari simulasi ini.</p>
        </div>

        {/* Detailed Explanation for Sequential Logic */}
        <div className="mb-20 bg-gray-800/30 p-8 rounded-2xl border border-gray-700 shadow-xl">
            <div className="flex items-center mb-6">
                <div className="text-cyan-400 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.092 1.21-.138 2.43-.138 3.662v.513a5.035 5.035 0 0 0 1.558 3.787a5.035 5.035 0 0 0 3.787 1.558h.513c1.232 0 2.453.046 3.662.138a4.006 4.006 0 0 0 3.7 3.7 48.678 48.678 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.092-1.21.138-2.43.138-3.662v-.513a5.035 5.035 0 0 0-1.558-3.787a5.035 5.035 0 0 0-3.787-1.558h-.513Z" /></svg>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-white">Logika Sekuensial: Otak di Balik Urutan</h3>
                    <p className="text-gray-400">Bagaimana sebuah sistem dapat mengingat dan bertindak berdasarkan urutan waktu.</p>
                </div>
            </div>
            <div className="space-y-6">
                <DetailItem title='Inti dari "Mengingat": Flip-Flop sebagai Sel Memori'>
                    Elemen terkecil yang bisa menyimpan 1 bit informasi (0 atau 1). Ia "mengingat" keadaan terakhirnya sampai ada pemicu untuk berubah. Inilah fondasi dari semua memori digital.
                </DetailItem>
                <DetailItem title='Konsep "State" (Keadaan)'>
                    Kondisi spesifik dari sistem pada satu waktu, misalnya "Lampu Utara-Selatan sedang Hijau". State ini ditentukan oleh nilai yang tersimpan di dalam flip-flop.
                </DetailItem>
                <DetailItem title='Clock: Dirigen yang Mengatur Waktu'>
                    Sinyal denyut (pulse) yang menjadi dirigen. Setiap "detak" clock memberi tahu sirkuit kapan harus memeriksa input dan beralih ke state berikutnya. Dalam simulasi ini, fungsi timer bertindak sebagai clock.
                </DetailItem>
                <DetailItem title='Hubungan dengan Finite State Machine (FSM)'>
                    Dengan menggabungkan beberapa flip-flop, kita menciptakan FSM—sebuah model dengan jumlah state yang terbatas dan aturan transisi yang jelas. Siklus lampu lalu lintas adalah contoh FSM yang sempurna.
                </DetailItem>
                 <DetailItem title='Perbandingan Sederhana'>
                    Berbeda dengan logika kombinasional (mis. kalkulator) yang outputnya hanya bergantung pada input saat ini, logika sekuensial outputnya bergantung pada input saat ini <strong className="text-cyan-300">DAN</strong> state sebelumnya. Ia memiliki memori.
                </DetailItem>
            </div>
        </div>

        {/* Other Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherFeatures.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
