import React from 'react';

// FIX: Changed icon type from JSX.Element to React.ReactElement to resolve namespace issue.
const FeatureCard: React.FC<{ icon: React.ReactElement; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-cyan-500 hover:scale-105 transition-all duration-300 flex flex-col">
    <div className="text-cyan-400 mb-4">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 flex-grow">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      title: 'Logika Sekuensial',
      description: 'Amati bagaimana sistem mengingat keadaan sebelumnya untuk menentukan keadaan berikutnya, inti dari sirkuit flip-flop.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.092 1.21-.138 2.43-.138 3.662v.513a5.035 5.035 0 0 0 1.558 3.787a5.035 5.035 0 0 0 3.787 1.558h.513c1.232 0 2.453.046 3.662.138a4.006 4.006 0 0 0 3.7 3.7 48.678 48.678 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.092-1.21.138-2.43.138-3.662v-.513a5.035 5.035 0 0 0-1.558-3.787a5.035 5.035 0 0 0-3.787-1.558h-.513Z" /></svg>
    },
    {
      title: 'State Machine',
      description: 'Visualisasikan siklus keadaan (merah, kuning, hijau) yang membentuk sebuah finite state machine (FSM) sederhana dan teratur.',
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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Konsep Kunci</h2>
          <p className="text-gray-400 mt-2">Pilar-pilar yang mendasari simulasi ini.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;