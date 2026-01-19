import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LightState } from '../types';
import TrafficLightPole from './TrafficLightPole';

const BASE_SEQUENCE = [
  { ns: LightState.GREEN, ew: LightState.RED, duration: 8000, name: 'NS_GREEN' },
  { ns: LightState.YELLOW, ew: LightState.RED, duration: 2000, name: 'NS_YELLOW' },
  { ns: LightState.RED, ew: LightState.RED, duration: 1000, name: 'ALL_RED_1' },
  { ns: LightState.RED, ew: LightState.GREEN, duration: 8000, name: 'EW_GREEN' },
  { ns: LightState.RED, ew: LightState.YELLOW, duration: 2000, name: 'EW_YELLOW' },
  { ns: LightState.RED, ew: LightState.RED, duration: 1000, name: 'ALL_RED_2' },
];

const styles = `
  .sim-container {
    perspective: 1200px;
  }
  .iso-plane {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotateX(60deg) rotateZ(-45deg);
    transition: transform 0.5s ease;
  }
  .road {
    position: absolute;
    background-color: #374151; /* gray-700 */
    box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
  }
  .road-ns { width: 30%; height: 100%; top: 0; left: 35%; }
  .road-ew { width: 100%; height: 30%; top: 35%; left: 0; }
  .lane-marking {
    position: absolute;
    background: #6b7280; /* gray-500 */
  }
  .crosswalk {
    position: absolute;
    background: repeating-linear-gradient(90deg, white, white 10px, transparent 10px, transparent 20px);
  }

  @keyframes drive-across-ns {
    0% { transform: translateY(150px); opacity: 1; }
    20% { transform: translateY(100px); }
    80% { transform: translateY(-450px); }
    100% { transform: translateY(-600px); opacity: 0; }
  }
  @keyframes drive-across-ew {
    0% { transform: translateX(-150px); opacity: 1; }
    20% { transform: translateX(-100px); }
    80% { transform: translateX(450px); }
    100% { transform: translateX(600px); opacity: 0; }
  }
  .animate-drive-ns { animation: drive-across-ns 4s ease-in-out forwards; }
  .animate-drive-ew { animation: drive-across-ew 4s ease-in-out forwards; }

  .logic-box {
    border: 1px solid #0891b2; /* cyan-600 */
    background: rgba(14, 116, 144, 0.1);
    backdrop-filter: blur(5px);
    color: white;
    padding: 0.5rem;
    border-radius: 0.25rem;
    text-align: center;
    font-size: 0.75rem;
    transition: all 0.3s ease;
  }
  .logic-box.active {
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.7);
    background: rgba(6, 182, 212, 0.3);
  }
  .sensor-ring {
    border: 2px solid #0891b2;
    border-radius: 50%;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sensor-ring.active {
    border-color: #22d3ee; /* cyan-400 */
    box-shadow: 0 0 15px rgba(34, 211, 238, 0.7);
    animation: pulse 0.5s ease-out;
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  .connector-line {
    stroke-width: 2;
    transition: stroke 0.3s ease;
  }
`;

const IsometricCar: React.FC<{ color: string; rotation: number; }> = ({ color, rotation }) => (
  <div className="w-full h-full" style={{ transform: `rotate(${rotation}deg)`}}>
    <svg viewBox="0 0 40 80" className="w-full h-full drop-shadow-lg">
      <g transform="skewY(-20) scale(1, 0.9)">
        <path d="M10 10 L30 10 L40 30 L40 70 L30 80 L10 80 L0 70 L0 30 Z" fill={color} />
        <path d="M5 32 L35 32 L35 48 L5 48 Z" fill="rgba(0,0,0,0.3)" />
        <path d="M8 12 L32 12 L37 28 L3 28 Z" fill="rgba(0,0,0,0.5)" />
      </g>
    </svg>
  </div>
);

const Simulation: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [mode, setMode] = useState<'classic' | 'smart'>('classic');
  const [demand, setDemand] = useState({ a: 0, b: 0 });
  const [departingCarsNS, setDepartingCarsNS] = useState<number[]>([]);
  const [departingCarsEW, setDepartingCarsEW] = useState<number[]>([]);
  const [sensorPulse, setSensorPulse] = useState({ a: false, b: false });

  const activeSequence = useMemo(() => {
    if (mode === 'classic') return BASE_SEQUENCE;
    return BASE_SEQUENCE.map(seq => {
      if (seq.name === 'NS_GREEN') return { ...seq, duration: 8000 + Math.min(demand.b * 1500, 7000) };
      if (seq.name === 'EW_GREEN') return { ...seq, duration: 8000 + Math.min(demand.a * 1500, 7000) };
      return seq;
    });
  }, [mode, demand.a, demand.b]);

  const currentSequence = activeSequence[currentIndex];
  const isFlipFlopASet = mode === 'smart' && demand.a > 0;
  const isLogicGateActive = mode === 'smart' && (
      (currentSequence.name === 'EW_GREEN' && demand.a > 0) || 
      (currentSequence.name === 'NS_GREEN' && demand.b > 0)
  );

  const advanceSequence = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % activeSequence.length);
  }, [activeSequence.length]);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setTimeout(advanceSequence, currentSequence.duration);
    return () => clearTimeout(timer);
  }, [currentIndex, isRunning, advanceSequence, currentSequence.duration]);

  useEffect(() => {
    if (!isRunning) return;
    let interval: ReturnType<typeof setInterval>;
    if (currentSequence.ns === LightState.GREEN) {
      interval = setInterval(() => {
        setDemand(prev => {
          if (prev.b > 0) {
            setDepartingCarsNS(prevCars => [...prevCars, Date.now()]);
            return { ...prev, b: prev.b - 1 };
          }
          return prev;
        });
      }, 1000);
    } else if (currentSequence.ew === LightState.GREEN) {
      interval = setInterval(() => {
        setDemand(prev => {
          if (prev.a > 0) {
            setDepartingCarsEW(prevCars => [...prevCars, Date.now()]);
            return { ...prev, a: prev.a - 1 };
          }
          return prev;
        });
      }, 1000);
    }
    if (currentSequence.name === 'ALL_RED_1') setDepartingCarsNS([]);
    if (currentSequence.name === 'ALL_RED_2') setDepartingCarsEW([]);
    return () => clearInterval(interval);
  }, [currentSequence, isRunning]);

  const addDemand = (direction: 'a' | 'b') => {
    if (demand[direction] < 5) {
      setDemand(d => ({ ...d, [direction]: d[direction] + 1 }));
      setSensorPulse({ ...sensorPulse, [direction]: true });
      setTimeout(() => setSensorPulse(p => ({ ...p, [direction]: false })), 500);
    }
  };

  return (
    <section id="simulation" className="py-20 bg-gray-800/30 overflow-hidden">
      <style>{styles}</style>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Simulasi & Diagram Logika</h2>
          <p className="text-gray-400 mt-2">Observasi FSM beraksi melalui visualisasi isometrik.</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-center justify-center">
          <div className="w-full xl:w-2/3 relative">
             <div className="relative w-full aspect-video sim-container">
                {/* LOGIC DIAGRAM OVERLAY */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <svg width="100%" height="100%" className="absolute inset-0">
                        {/* Lines */}
                        <path d="M20% 70% L 35% 45%" stroke={sensorPulse.a ? '#22d3ee' : '#0891b2'} fill="none" className="connector-line" />
                        <path d="M80% 70% L 65% 45%" stroke={sensorPulse.b ? '#22d3ee' : '#0891b2'} fill="none" className="connector-line" />
                        <path d="M35% 35% C 35% 20%, 50% 20%, 50% 25%" stroke={isFlipFlopASet ? '#ef4444' : '#b91c1c'} fill="none" className="connector-line" />
                        <path d="M65% 35% L 50% 25%" stroke="#22d3ee" fill="none" className="connector-line" />
                        <path d="M50% 18% V 5%" stroke={isLogicGateActive ? '#22d3ee' : '#0891b2'} fill="none" className="connector-line" />
                    </svg>

                    <div className={`sensor-ring absolute w-24 h-24 left-[20%] top-[70%] -translate-x-1/2 -translate-y-1/2 ${sensorPulse.a ? 'active' : ''}`}>
                       <div className="logic-box w-20 h-20 flex items-center justify-center">SENSOR A</div>
                    </div>
                     <div className={`sensor-ring absolute w-24 h-24 left-[80%] top-[70%] -translate-x-1/2 -translate-y-1/2 ${sensorPulse.b ? 'active' : ''}`}>
                       <div className="logic-box w-20 h-20 flex items-center justify-center">SENSOR B</div>
                    </div>

                    <div className={`logic-box absolute w-32 h-14 left-[35%] top-[35%] -translate-x-1/2 -translate-y-1/2 ${isFlipFlopASet ? 'active' : ''}`}>
                        <div className="font-bold">FLIP-FLOP A</div>
                        <div className={isFlipFlopASet ? 'text-cyan-300' : 'text-gray-500'}>{isFlipFlopASet ? 'SET' : 'IDLE'}</div>
                    </div>
                    <div className="logic-box absolute w-32 h-14 left-[65%] top-[35%] -translate-x-1/2 -translate-y-1/2 active">
                        <div className="font-bold">FLIP-FLOP B</div>
                        <div className="text-xs">TIMER IC 555</div>
                    </div>
                    <div className={`logic-box absolute w-32 h-14 left-1/2 top-[10%] -translate-x-1/2 -translate-y-1/2 ${isLogicGateActive ? 'active' : ''}`}>
                        <div className="font-bold">LOGIC GATE</div>
                        <div>(AND)</div>
                    </div>
                </div>

                {/* ISOMETRIC SCENE */}
                <div className="absolute inset-0 iso-plane">
                    <div className="road road-ns"></div>
                    <div className="road road-ew"></div>
                    <div className="absolute w-[30%] h-[30%] bg-[#374151] top-[35%] left-[35%]"></div>
                    {/* Markings */}
                    <div className="lane-marking absolute w-1 h-full bg-gray-600 left-[49.5%] top-0 border-r-2 border-dashed border-gray-500"></div>
                    <div className="lane-marking absolute h-1 w-full bg-gray-600 top-[49.5%] left-0 border-t-2 border-dashed border-gray-500"></div>
                    <div className="crosswalk w-[30%] h-4 absolute top-[32%] left-[35%]"></div>
                    <div className="crosswalk w-[30%] h-4 absolute top-[65%] left-[35%] rotate-180"></div>
                    <div className="crosswalk w-4 h-[30%] absolute left-[32%] top-[35%]"></div>
                    <div className="crosswalk w-4 h-[30%] absolute left-[65%] top-[35%] rotate-180"></div>

                    {/* Lights */}
                    <div className="absolute top-[30%] left-[30%]" style={{transform: 'scale(0.3) rotate(90deg)'}}><TrafficLightPole state={currentSequence.ew} /></div>
                    <div className="absolute top-[60%] left-[70%]" style={{transform: 'scale(0.3) rotate(-90deg)'}}><TrafficLightPole state={currentSequence.ew} /></div>
                    <div className="absolute top-[70%] left-[30%]" style={{transform: 'scale(0.3) rotate(180deg)'}}><TrafficLightPole state={currentSequence.ns} /></div>
                    <div className="absolute top-[20%] left-[70%]" style={{transform: 'scale(0.3)'}}><TrafficLightPole state={currentSequence.ns} /></div>
                    
                    {/* Cars */}
                    {Array.from({ length: demand.a }).map((_, i) => (
                        <div key={`ew-q-${i}`} className="absolute w-6 h-12 top-1/2 left-1/2" style={{transform: `translateX(calc(-80px - ${i * 30}px)) translateY(30px)`}}><IsometricCar color="#22d3ee" rotation={0} /></div>
                    ))}
                     {Array.from({ length: demand.b }).map((_, i) => (
                        <div key={`ns-q-${i}`} className="absolute w-6 h-12 top-1/2 left-1/2" style={{transform: `translateY(calc(80px + ${i * 30}px)) translateX(-30px)`}}><IsometricCar color="#38bdf8" rotation={90} /></div>
                    ))}
                    {departingCarsEW.map(id => (
                         <div key={`ew-d-${id}`} className="absolute w-6 h-12 top-1/2 left-1/2 animate-drive-ew" style={{transform: `translateY(30px)`}}><IsometricCar color="#22d3ee" rotation={0} /></div>
                    ))}
                    {departingCarsNS.map(id => (
                         <div key={`ns-d-${id}`} className="absolute w-6 h-12 top-1/2 left-1/2 animate-drive-ns" style={{transform: `translateX(-30px)`}}><IsometricCar color="#38bdf8" rotation={90} /></div>
                    ))}
                </div>
            </div>
          </div>
          
          <div className="w-full xl:w-1/3 space-y-4">
             {/* Truth Table */}
            <div className="bg-gray-900/50 rounded-lg border border-gray-700 p-4">
                <h3 className="text-white font-bold mb-3 text-center">Truth Table</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-cyan-400 uppercase bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-4 py-2">State</th>
                                <th scope="col" className="px-4 py-2">NS (B)</th>
                                <th scope="col" className="px-4 py-2">EW (A)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BASE_SEQUENCE.map((state, index) => (
                                <tr key={state.name} className={`border-b border-gray-700 transition-colors duration-300 ${currentIndex === index ? 'bg-cyan-500/20' : ''}`}>
                                    <td className="px-4 py-1.5 font-mono">{state.name}</td>
                                    <td className={`px-4 py-1.5 font-bold ${state.ns === 'GREEN' ? 'text-green-400' : state.ns === 'YELLOW' ? 'text-yellow-400' : 'text-red-400'}`}>{state.ns}</td>
                                    <td className={`px-4 py-1.5 font-bold ${state.ew === 'GREEN' ? 'text-green-400' : state.ew === 'YELLOW' ? 'text-yellow-400' : 'text-red-400'}`}>{state.ew}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Controls */}
             <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <h3 className="text-white font-bold text-center mb-3">Kontrol Simulasi</h3>
                <div className="flex justify-center items-center gap-2 mb-4 text-sm">
                    <button onClick={() => setMode('classic')} className={`px-3 py-1 rounded transition-colors ${mode === 'classic' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400'}`}>Mode Klasik</button>
                    <button onClick={() => setMode('smart')} className={`px-3 py-1 rounded transition-colors ${mode === 'smart' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400'}`}>Mode AI</button>
                </div>
                <div className="flex flex-row justify-around items-center gap-2">
                    <div className="text-center">
                        <button onClick={() => addDemand('a')} className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-xs px-3 py-2 rounded disabled:opacity-50" disabled={mode === 'classic'}>+ Mobil A (EW)</button>
                        <p className="text-xs mt-1 text-cyan-400">Antrian: {demand.a}</p>
                    </div>
                     <button onClick={() => setIsRunning(!isRunning)} className="w-10 h-10 rounded-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all" title={isRunning ? "Jeda" : "Mulai"}>
                        {isRunning ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" /></svg>}
                    </button>
                    <div className="text-center">
                        <button onClick={() => addDemand('b')} className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-xs px-3 py-2 rounded disabled:opacity-50" disabled={mode === 'classic'}>+ Mobil B (NS)</button>
                        <p className="text-xs mt-1 text-cyan-400">Antrian: {demand.b}</p>
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