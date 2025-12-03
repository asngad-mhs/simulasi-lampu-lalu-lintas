import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LightState } from '../types';
import TrafficLightPole from './TrafficLightPole';

const BASE_SEQUENCE = [
  { ns: LightState.GREEN, ew: LightState.RED, duration: 5000, name: 'NS_GREEN' },
  { ns: LightState.YELLOW, ew: LightState.RED, duration: 2000, name: 'NS_YELLOW' },
  { ns: LightState.RED, ew: LightState.RED, duration: 1000, name: 'ALL_RED_1' },
  { ns: LightState.RED, ew: LightState.GREEN, duration: 5000, name: 'EW_GREEN' },
  { ns: LightState.RED, ew: LightState.YELLOW, duration: 2000, name: 'EW_YELLOW' },
  { ns: LightState.RED, ew: LightState.RED, duration: 1000, name: 'ALL_RED_2' },
];

const Car: React.FC<{ style: React.CSSProperties, className?: string }> = ({ style, className = '' }) => (
    <div className={`absolute w-2 h-2 bg-gray-300 rounded-full ${className}`} style={style}></div>
);

const Simulation: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [mode, setMode] = useState<'classic' | 'smart'>('classic');
  const [demand, setDemand] = useState({ ns: 0, ew: 0 });
  const [departingCars, setDepartingCars] = useState({ ns: 0, ew: 0 });

  const activeSequence = useMemo(() => {
    if (mode === 'classic') {
      return BASE_SEQUENCE;
    }
    // Smart mode: adjust durations based on demand
    return BASE_SEQUENCE.map(seq => {
      if (seq.name === 'NS_GREEN') {
        // Add 1.5s for each car in queue, max 7.5s extra
        return { ...seq, duration: 5000 + Math.min(demand.ns * 1500, 7500) };
      }
      if (seq.name === 'EW_GREEN') {
        return { ...seq, duration: 5000 + Math.min(demand.ew * 1500, 7500) };
      }
      return seq;
    });
  }, [mode, demand.ns, demand.ew]);

  const currentSequence = activeSequence[currentIndex];

  const advanceSequence = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % activeSequence.length);
  }, [activeSequence.length]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setTimeout(advanceSequence, currentSequence.duration);

    return () => clearTimeout(timer);
  }, [currentIndex, isRunning, advanceSequence, currentSequence.duration]);

  // Effect to handle car animation logic
  useEffect(() => {
    if (!isRunning) return;

    const phaseName = activeSequence[currentIndex].name;

    if (phaseName === 'NS_GREEN') {
      setDemand(currentDemand => {
        if (currentDemand.ns > 0) {
          setDepartingCars(d => ({ ...d, ns: currentDemand.ns }));
          return { ...currentDemand, ns: 0 };
        }
        return currentDemand;
      });
    } else if (phaseName === 'EW_GREEN') {
      setDemand(currentDemand => {
        if (currentDemand.ew > 0) {
          setDepartingCars(d => ({ ...d, ew: currentDemand.ew }));
          return { ...currentDemand, ew: 0 };
        }
        return currentDemand;
      });
    }

    // After NS green/yellow cycle, clear departing cars
    if (phaseName === 'ALL_RED_1') {
      setDepartingCars(d => ({ ...d, ns: 0 }));
    }
    // After EW green/yellow cycle, clear departing cars
    if (phaseName === 'ALL_RED_2') {
      setDepartingCars(d => ({ ...d, ew: 0 }));
    }
  }, [currentIndex, activeSequence, isRunning]);


  const addDemand = (direction: 'ns' | 'ew') => {
    if (demand[direction] < 8) { // Max 8 cars for visualization
        setDemand(d => ({ ...d, [direction]: d[direction] + 1 }));
    }
  };

  return (
    <section id="simulation" className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Simulasi Interaktif</h2>
          <p className="text-gray-400 mt-2">Saksikan logika flip-flop dan AI dalam aksi.</p>
        </div>

        <div className="relative w-full max-w-2xl mx-auto aspect-square bg-gray-700 rounded-lg shadow-2xl p-4 flex items-center justify-center overflow-hidden">
          {/* Jalan */}
          <div className="absolute w-1/3 h-full bg-gray-800 top-0 left-1/2 -translate-x-1/2 z-0"></div>
          <div className="absolute h-1/3 w-full bg-gray-800 left-0 top-1/2 -translate-y-1/2 z-0"></div>

          {/* Marka Jalan */}
          <div className="absolute w-1 h-2/5 bg-yellow-400/20 top-0 left-1/2 -translate-x-1/2" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}></div>
          <div className="absolute w-1 h-2/5 bg-yellow-400/20 bottom-0 left-1/2 -translate-x-1/2"></div>
          <div className="absolute h-1 w-2/5 bg-yellow-400/20 left-0 top-1/2 -translate-y-1/2"></div>
          <div className="absolute h-1 w-2/5 bg-yellow-400/20 right-0 top-1/2 -translate-y-1/2"></div>
          
           {/* Mobil Antrian & Bergerak */}
          <div className="z-10">
              {/* Queued Cars */}
              {Array.from({ length: demand.ns }).map((_, i) => <Car key={`ns-q-${i}`} style={{ top: `calc(66.66% + ${i*4}%)`, left: '55%'}} />)}
              {Array.from({ length: demand.ew }).map((_, i) => <Car key={`ew-q-${i}`} style={{ left: `calc(33.33% - ${i*4}%)`, top: '55%' }} />)}

              {/* Departing Cars with animation */}
              {Array.from({ length: departingCars.ns }).map((_, i) => 
                  <Car 
                  key={`ns-d-${i}`} 
                  style={{ top: `calc(66.66% + ${i*4}%)`, left: '55%'}} 
                  className="transition-transform duration-[3000ms] ease-in -translate-y-[50vh]"
                  />
              )}
              {Array.from({ length: departingCars.ew }).map((_, i) => 
                  <Car 
                  key={`ew-d-${i}`} 
                  style={{ left: `calc(33.33% - ${i*4}%)`, top: '55%' }}
                  className="transition-transform duration-[3000ms] ease-in translate-x-[50vw]"
                  />
              )}
          </div>


          {/* Lampu Lalu Lintas */}
          <div className="absolute top-1/3 left-1/3 -translate-x-full -translate-y-1/2 z-20">
            <TrafficLightPole state={currentSequence.ew} />
          </div>
           <div className="absolute top-2/3 left-2/3 translate-x-0 translate-y-0 rotate-180 z-20">
            <TrafficLightPole state={currentSequence.ew} />
          </div>
          <div className="absolute top-1/3 left-2/3 -translate-y-1/2 rotate-90 z-20">
            <TrafficLightPole state={currentSequence.ns} />
          </div>
          <div className="absolute top-2/3 left-1/3 -translate-x-full rotate-[-90deg] z-20">
            <TrafficLightPole state={currentSequence.ns} />
          </div>
        </div>

        {/* Control Panel */}
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          <div className="flex justify-center items-center gap-4 mb-4">
             <button onClick={() => setMode('classic')} className={`px-4 py-2 rounded-md transition-colors ${mode === 'classic' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'}`}>Mode Klasik</button>
             <button onClick={() => setMode('smart')} className={`px-4 py-2 rounded-md transition-colors ${mode === 'smart' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300'}`}>Mode Cerdas (AI)</button>
          </div>
          <div className="flex flex-col md:flex-row justify-around items-center gap-4">
            <div className="text-center">
                <button onClick={() => addDemand('ns')} className="bg-gray-600 hover:bg-gray-500 px-5 py-2 rounded-md disabled:opacity-50" disabled={mode === 'classic'}>Tambah Mobil (U-S)</button>
                <p className="text-sm mt-2 text-cyan-400">Antrian: {demand.ns}</p>
            </div>
            <div className="text-center">
                <button onClick={() => addDemand('ew')} className="bg-gray-600 hover:bg-gray-500 px-5 py-2 rounded-md disabled:opacity-50" disabled={mode === 'classic'}>Tambah Mobil (T-B)</button>
                <p className="text-sm mt-2 text-cyan-400">Antrian: {demand.ew}</p>
            </div>
          </div>
           <div className="text-center mt-6">
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="bg-gray-800 border border-cyan-500 hover:bg-cyan-500/20 text-cyan-400 font-bold py-2 px-6 rounded-full transition-colors duration-300"
                >
                    {isRunning ? 'Jeda Simulasi' : 'Lanjutkan Simulasi'}
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Simulation;