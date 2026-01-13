import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LightState } from '../types';
import TrafficLightPole from './TrafficLightPole';

const BASE_SEQUENCE = [
  { ns: LightState.GREEN, ew: LightState.RED, duration: 8000, name: 'NS_GREEN' }, // Diperpanjang agar aliran mobil terlihat
  { ns: LightState.YELLOW, ew: LightState.RED, duration: 2000, name: 'NS_YELLOW' },
  { ns: LightState.RED, ew: LightState.RED, duration: 1000, name: 'ALL_RED_1' },
  { ns: LightState.RED, ew: LightState.GREEN, duration: 8000, name: 'EW_GREEN' }, // Diperpanjang agar aliran mobil terlihat
  { ns: LightState.RED, ew: LightState.YELLOW, duration: 2000, name: 'EW_YELLOW' },
  { ns: LightState.RED, ew: LightState.RED, duration: 1000, name: 'ALL_RED_2' },
];

// Styles untuk animasi mobil
const styles = `
  @keyframes driveNorth {
    0% { transform: translateY(0) rotate(180deg); opacity: 1; }
    100% { transform: translateY(-100vh) rotate(180deg); opacity: 0; }
  }
  @keyframes driveEast {
    0% { transform: translateX(0) rotate(90deg); opacity: 1; }
    100% { transform: translateX(100vw) rotate(90deg); opacity: 0; }
  }
  @keyframes idle {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  .animate-drive-north {
    animation: driveNorth 2s linear forwards;
  }
  .animate-drive-east {
    animation: driveEast 2s linear forwards;
  }
  .animate-idle {
    animation: idle 0.8s infinite ease-in-out;
  }
`;

// Komponen Mobil SVG (Top-Down View)
const CarIcon: React.FC<{ colorClass?: string }> = ({ colorClass = "text-gray-200" }) => (
  <svg viewBox="0 0 24 50" fill="currentColor" className={`w-full h-full drop-shadow-lg ${colorClass}`}>
     {/* Body */}
    <path d="M 2 8 C 2 4 4 2 8 2 L 16 2 C 20 2 22 4 22 8 L 22 42 C 22 46 20 48 16 48 L 8 48 C 4 48 2 46 2 42 Z" className="fill-current" />
    {/* Windshield */}
    <path d="M 4 10 L 20 10 L 20 18 L 4 18 Z" className="text-gray-800 fill-current opacity-80" />
    {/* Rear Window */}
    <path d="M 4 34 L 20 34 L 20 40 L 4 40 Z" className="text-gray-800 fill-current opacity-80" />
    {/* Roof */}
    <rect x="3" y="19" width="18" height="14" rx="2" className="fill-current opacity-20" />
    {/* Headlights */}
    <rect x="2" y="2" width="4" height="3" rx="1" className="text-yellow-200 fill-current" />
    <rect x="18" y="2" width="4" height="3" rx="1" className="text-yellow-200 fill-current" />
    {/* Taillights */}
    <rect x="2" y="45" width="4" height="3" rx="1" className="text-red-500 fill-current" />
    <rect x="18" y="45" width="4" height="3" rx="1" className="text-red-500 fill-current" />
  </svg>
);

const Car: React.FC<{ style: React.CSSProperties, className?: string, rotation: number, color?: string, isMoving?: boolean }> = ({ style, className = '', rotation, color, isMoving }) => (
    <div className={`absolute w-8 h-14 flex items-center justify-center z-10 ${className} ${!isMoving ? 'animate-idle' : ''}`} style={style}>
        <div style={{ transform: `rotate(${rotation}deg)` }} className="w-full h-full">
            <CarIcon colorClass={color} />
        </div>
    </div>
);

// Helper untuk logika alat peraga (Simbol Visual)
const RoadMarkingOverlay: React.FC<{ state: LightState, className?: string }> = ({ state, className }) => {
    if (state === LightState.RED) {
        return (
            <div className={`absolute flex flex-col items-center justify-center animate-pulse opacity-80 ${className}`}>
                 {/* Stop Sign Shape */}
                <div className="w-16 h-16 bg-red-600 border-2 border-white text-white font-bold flex items-center justify-center text-xs shadow-[0_0_20px_rgba(220,38,38,0.6)]" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}>
                    STOP
                </div>
                <div className="mt-2 h-2 w-24 bg-red-500/50 rounded blur-sm"></div>
            </div>
        );
    }
    if (state === LightState.GREEN) {
        return (
            <div className={`absolute flex flex-col items-center justify-center opacity-60 ${className}`}>
                {/* Arrow Up */}
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)] animate-bounce">
                    <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
                </svg>
            </div>
        );
    }
    if (state === LightState.YELLOW) {
        return (
             <div className={`absolute flex flex-col items-center justify-center opacity-80 ${className}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg>
             </div>
        )
    }
    return null;
};

// Helper Text for Dashboard
const getLogikaInfo = (state: LightState) => {
    switch (state) {
      case LightState.RED:
        return "Logika 0. Flip-flop memutus sirkuit.";
      case LightState.YELLOW:
        return "Transisi Clock. Bersiap pindah state.";
      case LightState.GREEN:
        return "Logika 1. Gerbang sirkuit terbuka.";
      default:
        return "-";
    }
};

const Simulation: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [mode, setMode] = useState<'classic' | 'smart'>('classic');
  
  // Antrian (Queue)
  const [demand, setDemand] = useState({ ns: 0, ew: 0 });
  // Mobil yang sedang melaju (Departing Stream)
  // Kita menggunakan array ID unik untuk memastikan animasi ter-trigger ulang
  const [departingCarsNS, setDepartingCarsNS] = useState<number[]>([]);
  const [departingCarsEW, setDepartingCarsEW] = useState<number[]>([]);

  const activeSequence = useMemo(() => {
    if (mode === 'classic') {
      return BASE_SEQUENCE;
    }
    return BASE_SEQUENCE.map(seq => {
      if (seq.name === 'NS_GREEN') {
        return { ...seq, duration: 8000 + Math.min(demand.ns * 1000, 5000) };
      }
      if (seq.name === 'EW_GREEN') {
        return { ...seq, duration: 8000 + Math.min(demand.ew * 1000, 5000) };
      }
      return seq;
    });
  }, [mode, demand.ns, demand.ew]);

  const currentSequence = activeSequence[currentIndex];

  const advanceSequence = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % activeSequence.length);
  }, [activeSequence.length]);

  // Main Traffic Light Timer
  useEffect(() => {
    if (!isRunning) return;
    const timer = setTimeout(advanceSequence, currentSequence.duration);
    return () => clearTimeout(timer);
  }, [currentIndex, isRunning, advanceSequence, currentSequence.duration]);


  // Traffic Flow Logic (Penggerak Mobil)
  useEffect(() => {
    if (!isRunning) return;

    let interval: ReturnType<typeof setInterval>;

    // Jika Lampu NS Hijau dan ada mobil, lepaskan satu per satu
    if (currentSequence.ns === LightState.GREEN) {
        interval = setInterval(() => {
            setDemand(prev => {
                if (prev.ns > 0) {
                    // Pindahkan 1 mobil dari antrian ke jalan
                    setDepartingCarsNS(prevCars => [...prevCars, Date.now()]);
                    return { ...prev, ns: prev.ns - 1 };
                }
                return prev;
            });
        }, 800); // 1 mobil setiap 0.8 detik (aliran lancar)
    }
    
    // Jika Lampu EW Hijau dan ada mobil, lepaskan satu per satu
    else if (currentSequence.ew === LightState.GREEN) {
        interval = setInterval(() => {
            setDemand(prev => {
                if (prev.ew > 0) {
                    setDepartingCarsEW(prevCars => [...prevCars, Date.now()]);
                    return { ...prev, ew: prev.ew - 1 };
                }
                return prev;
            });
        }, 800);
    }

    // Bersihkan mobil yang sudah lewat saat lampu menjadi Merah
    // Ini mensimulasikan jalan yang "kosong" kembali setelah fase hijau selesai
    if (currentSequence.name === 'ALL_RED_1') {
        setDepartingCarsNS([]);
    }
    if (currentSequence.name === 'ALL_RED_2') {
        setDepartingCarsEW([]);
    }

    return () => clearInterval(interval);
  }, [currentSequence, isRunning]);


  const addDemand = (direction: 'ns' | 'ew') => {
    if (demand[direction] < 6) { // Max 6 untuk visualisasi yang rapi
        setDemand(d => ({ ...d, [direction]: d[direction] + 1 }));
    }
  };

  return (
    <section id="simulation" className="py-20 bg-gray-800/30">
      <style>{styles}</style>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Simulasi & Alat Peraga</h2>
          <p className="text-gray-400 mt-2">Observasi visualisasi nyata antrian dan logika pengendali.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            
            {/* Visualisasi Jalan */}
            <div className="w-full lg:w-1/2">
                <div className="relative w-full aspect-square bg-gray-700 rounded-lg shadow-2xl p-4 flex items-center justify-center overflow-hidden border border-gray-600 ring-4 ring-gray-800">
                    
                    {/* Tekstur Aspal / Jalan */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asphalt-dark.png')] opacity-50 z-0 pointer-events-none"></div>

                    {/* Jalan Vertical (NS) */}
                    <div className="absolute w-1/3 h-full bg-gray-800 top-0 left-1/2 -translate-x-1/2 z-0 border-x-2 border-dashed border-gray-600"></div>
                    {/* Jalan Horizontal (EW) */}
                    <div className="absolute h-1/3 w-full bg-gray-800 left-0 top-1/2 -translate-y-1/2 z-0 border-y-2 border-dashed border-gray-600"></div>

                    {/* Intersection Box */}
                    <div className="absolute w-1/3 h-1/3 bg-gray-800 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"></div>

                    {/* Marka Jalan (Stop Lines) */}
                    <div className="absolute w-1/3 h-2 bg-white top-[33%] left-1/2 -translate-x-1/2 z-0 opacity-80"></div>
                    <div className="absolute w-1/3 h-2 bg-white bottom-[33%] left-1/2 -translate-x-1/2 z-0 opacity-80"></div>
                    <div className="absolute h-1/3 w-2 bg-white left-[33%] top-1/2 -translate-y-1/2 z-0 opacity-80"></div>
                    <div className="absolute h-1/3 w-2 bg-white right-[33%] top-1/2 -translate-y-1/2 z-0 opacity-80"></div>

                    {/* ALAT PERAGA VISUAL (OVERLAYS) */}
                    <RoadMarkingOverlay state={currentSequence.ns} className="top-[15%] left-1/2 -translate-x-1/2 z-0" />
                    <RoadMarkingOverlay state={currentSequence.ew} className="left-[15%] top-1/2 -translate-y-1/2 z-0" />
                    
                    {/* AREA MOBIL */}
                    <div className="z-10">
                        {/* 
                            MOBIL ANTRIAN (QUEUE) 
                            Posisi statis berdasarkan index, dengan animasi 'idle'
                        */}
                        {Array.from({ length: demand.ns }).map((_, i) => (
                            <Car 
                                key={`ns-q-${i}`} 
                                rotation={180}
                                color="text-blue-400"
                                style={{ top: `calc(52% + 50px + ${i*25}px)`, left: '55%'}}
                                isMoving={false} 
                            />
                        ))}
                        {Array.from({ length: demand.ew }).map((_, i) => (
                            <Car 
                                key={`ew-q-${i}`} 
                                rotation={90}
                                color="text-cyan-400"
                                style={{ left: `calc(48% - 50px - ${i*25}px)`, top: '55%' }}
                                isMoving={false} 
                            />
                        ))}

                        {/* 
                            MOBIL BERGERAK (DEPARTING) 
                            Muncul dari posisi antrian terdepan dan bergerak keluar
                        */}
                        {departingCarsNS.map((id) => (
                            <Car 
                                key={`ns-d-${id}`} 
                                rotation={180}
                                color="text-blue-300"
                                style={{ top: `calc(52% + 50px)`, left: '55%'}} 
                                className="animate-drive-north"
                                isMoving={true}
                            />
                        ))}
                        {departingCarsEW.map((id) => (
                            <Car 
                                key={`ew-d-${id}`} 
                                rotation={90}
                                color="text-cyan-300"
                                style={{ left: `calc(48% - 50px)`, top: '55%' }}
                                className="animate-drive-east"
                                isMoving={true}
                            />
                        ))}
                    </div>


                    {/* Traffic Lights */}
                    <div className="absolute top-1/3 left-1/3 -translate-x-full -translate-y-1/2 z-20 scale-75 lg:scale-90">
                        <TrafficLightPole state={currentSequence.ew} />
                    </div>
                    <div className="absolute top-2/3 left-2/3 translate-x-0 translate-y-0 rotate-180 z-20 scale-75 lg:scale-90">
                        <TrafficLightPole state={currentSequence.ew} />
                    </div>
                    <div className="absolute top-1/3 left-2/3 -translate-y-1/2 rotate-90 z-20 scale-75 lg:scale-90">
                        <TrafficLightPole state={currentSequence.ns} />
                    </div>
                    <div className="absolute top-2/3 left-1/3 -translate-x-full rotate-[-90deg] z-20 scale-75 lg:scale-90">
                        <TrafficLightPole state={currentSequence.ns} />
                    </div>
                </div>

                 {/* Control Panel */}
                <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white font-bold">Kontrol Simulasi</h3>
                     </div>
                    <div className="flex justify-center items-center gap-2 mb-4 text-sm">
                        <button onClick={() => setMode('classic')} className={`px-3 py-1 rounded transition-colors ${mode === 'classic' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400'}`}>Mode Klasik</button>
                        <button onClick={() => setMode('smart')} className={`px-3 py-1 rounded transition-colors ${mode === 'smart' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400'}`}>Mode AI</button>
                    </div>
                    <div className="flex flex-row justify-around items-center gap-2">
                        <div className="text-center">
                            <button onClick={() => addDemand('ns')} className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-xs px-3 py-2 rounded disabled:opacity-50" disabled={mode === 'classic'}>+ Mobil (U-S)</button>
                            <p className="text-xs mt-1 text-cyan-400">Antrian: {demand.ns}</p>
                        </div>
                         <button
                            onClick={() => setIsRunning(!isRunning)}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all"
                            title={isRunning ? "Jeda" : "Mulai"}
                        >
                           {isRunning ? (
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                 <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                               </svg>
                           ) : (
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                 <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                               </svg>
                           )}
                        </button>
                        <div className="text-center">
                            <button onClick={() => addDemand('ew')} className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-xs px-3 py-2 rounded disabled:opacity-50" disabled={mode === 'classic'}>+ Mobil (T-B)</button>
                            <p className="text-xs mt-1 text-cyan-400">Antrian: {demand.ew}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Analisis (Alat Peraga) */}
            <div className="w-full lg:w-1/2 space-y-4">
                 <div className="bg-gray-800 rounded-lg p-6 border-l-4 border-cyan-500 shadow-lg">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-cyan-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        Monitor Logika
                    </h3>
                    <p className="text-gray-400 mb-6 text-sm">Status digital dari mikrokontroler simulasi.</p>

                    <div className="space-y-6">
                        {/* NS Status Card */}
                        <div className="bg-gray-900/50 rounded p-4 border border-gray-700">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-300 font-semibold">Jalur Utara - Selatan</span>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${currentSequence.ns === LightState.RED ? 'bg-red-500/20 text-red-400' : currentSequence.ns === LightState.YELLOW ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                                    {currentSequence.ns}
                                </span>
                            </div>
                            <div className="text-sm">
                                <span className="text-gray-500 block text-xs uppercase tracking-wide">Analisis Logika</span>
                                <p className="text-cyan-300 font-mono mt-1">{getLogikaInfo(currentSequence.ns)}</p>
                            </div>
                        </div>

                         {/* EW Status Card */}
                         <div className="bg-gray-900/50 rounded p-4 border border-gray-700">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-300 font-semibold">Jalur Timur - Barat</span>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${currentSequence.ew === LightState.RED ? 'bg-red-500/20 text-red-400' : currentSequence.ew === LightState.YELLOW ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                                    {currentSequence.ew}
                                </span>
                            </div>
                            <div className="text-sm">
                                <span className="text-gray-500 block text-xs uppercase tracking-wide">Analisis Logika</span>
                                <p className="text-cyan-300 font-mono mt-1">{getLogikaInfo(currentSequence.ew)}</p>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Simulation;