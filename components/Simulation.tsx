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
  .sim-background {
    background-color: #0a192f;
    background-image: 
      linear-gradient(rgba(30, 144, 255, 0.3) 1px, transparent 1px), 
      linear-gradient(90deg, rgba(30, 144, 255, 0.3) 1px, transparent 1px);
    background-size: 2rem 2rem;
    position: relative;
  }
  .sim-container {
    perspective: 1500px;
  }
  .iso-plane {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotateX(60deg) rotateZ(-45deg);
  }
  .road {
    position: absolute;
    background-color: #2c3e50;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
  }
  .road-ns { width: 30%; height: 100%; top: 0; left: 35%; }
  .road-ew { width: 100%; height: 30%; top: 35%; left: 0; }
  .lane-marking {
    position: absolute;
    background: #4a617a;
    border-style: dashed;
  }
  .crosswalk {
    position: absolute;
    background: repeating-linear-gradient(90deg, #bdc3c7, #bdc3c7 10px, transparent 10px, transparent 20px);
    opacity: 0.5;
  }

  @keyframes drive-across-ns {
    0% { transform: translateY(150px); opacity: 1; }
    100% { transform: translateY(-450px); opacity: 0; }
  }
  @keyframes drive-across-ew {
    0% { transform: translateX(-150px); opacity: 1; }
    100% { transform: translateX(450px); opacity: 0; }
  }
  .animate-drive-ns { animation: drive-across-ns 4s ease-in-out forwards; }
  .animate-drive-ew { animation: drive-across-ew 4s ease-in-out forwards; }
  
  .logic-module {
    position: absolute;
    width: 180px;
    height: 90px;
    background: rgba(10, 25, 47, 0.8);
    border: 2px solid #00aaff;
    color: white;
    padding: 8px;
    font-family: monospace;
    font-size: 12px;
    transform: rotateX(-60deg) rotateZ(45deg);
    box-shadow: 0 0 20px rgba(0, 170, 255, 0.5);
    backdrop-filter: blur(5px);
  }
  .led-red {
    width: 8px;
    height: 8px;
    background: #5a1e1e;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  .led-red.active {
    background: #ff4d4d;
    box-shadow: 0 0 10px #ff4d4d, 0 0 20px #ff4d4d;
  }
  .road-sensor {
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(0, 255, 255, 0.1);
    border: 2px solid #00aaff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    box-shadow: 0 0 15px rgba(0, 170, 255, 0.3);
  }
  .road-sensor.active {
    background: rgba(0, 255, 255, 0.3);
    box-shadow: 0 0 25px rgba(0, 170, 255, 0.8);
  }
  .sensor-car-icon {
    fill: #00aaff;
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  .road-sensor.active .sensor-car-icon {
    fill: #8effff;
    opacity: 1;
    filter: drop-shadow(0 0 5px #8effff);
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

const SensorCarIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 sensor-car-icon">
        <path d="M6 16.5V13.3333C6 12.4223 6.421 11.5883 7.11111 11.0556L10 9H14L16.8889 11.0556C17.579 11.5883 18 12.4223 18 13.3333V16.5M6 16.5C5.17157 16.5 4.5 17.1716 4.5 18C4.5 18.8284 5.17157 19.5 6 19.5C6.82843 19.5 7.5 18.8284 7.5 18C7.5 17.1716 6.82843 16.5 6 16.5ZM18 16.5C17.1716 16.5 16.5 17.1716 16.5 18C16.5 18.8284 17.1716 19.5 18 19.5C18.8284 19.5 19.5 18.8284 19.5 18C19.5 17.1716 18.8284 16.5 18 16.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
    </svg>
);

const LogicModule: React.FC<{title: string, statusText: string, isSet: boolean, children?: React.ReactNode, style?: React.CSSProperties}> = ({title, statusText, isSet, children, style}) => (
    <div className="logic-module" style={style}>
        <div className="flex justify-between items-start">
            <div>
                <div className="font-bold text-cyan-400">{title}</div>
                <div className="text-green-400">{statusText}</div>
            </div>
            <div className={`led-red ${isSet ? 'active' : ''}`}></div>
        </div>
        {children}
    </div>
);

const Simulation: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [mode, setMode] = useState<'smart'>('smart'); // Mode AI default
  const [demand, setDemand] = useState({ a: 0, b: 0 });
  const [departingCarsNS, setDepartingCarsNS] = useState<number[]>([]);
  const [departingCarsEW, setDepartingCarsEW] = useState<number[]>([]);
  const [sensorPulse, setSensorPulse] = useState({ a: false, b: false });
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const activeSequence = useMemo(() => {
    return BASE_SEQUENCE.map(seq => {
      if (seq.name === 'NS_GREEN') return { ...seq, duration: 5000 + Math.min(demand.b * 1500, 7000) };
      if (seq.name === 'EW_GREEN') return { ...seq, duration: 5000 + Math.min(demand.a * 1500, 7000) };
      return seq;
    });
  }, [demand.a, demand.b]);

  const currentSequence = activeSequence[currentIndex];
  
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
          } return prev;
        });
      }, 1200);
    } else if (currentSequence.ew === LightState.GREEN) {
      interval = setInterval(() => {
        setDemand(prev => {
          if (prev.a > 0) {
            setDepartingCarsEW(prevCars => [...prevCars, Date.now()]);
            return { ...prev, a: prev.a - 1 };
          } return prev;
        });
      }, 1200);
    }
    if (currentSequence.name === 'ALL_RED_1') setDepartingCarsNS([]);
    if (currentSequence.name === 'ALL_RED_2') setDepartingCarsEW([]);
    return () => clearInterval(interval);
  }, [currentSequence, isRunning]);

  const addDemand = (direction: 'a' | 'b') => {
    if (demand[direction] < 4) {
      setDemand(d => ({ ...d, [direction]: d[direction] + 1 }));
      setSensorPulse({ ...sensorPulse, [direction]: true });
      setTimeout(() => setSensorPulse(p => ({ ...p, [direction]: false })), 500);
    }
  };
  
  const getActiveTruthTableRow = () => {
      const isEwGreen = currentSequence.ew === LightState.GREEN;
      const isNsGreen = currentSequence.ns === LightState.GREEN;
      if (isEwGreen && demand.a > 0) return 1; // A, sensor active
      if (isEwGreen && demand.a === 0) return 0; // A, sensor idle
      if (isNsGreen && demand.a > 0) return 3; // X, other light on but sensor A has demand
      if (isNsGreen && demand.b > 0) return 2; // B
      return -1; // No specific state matches
  };
  const activeTruthRow = getActiveTruthTableRow();

  const truthTableData = [
    { input: 'A', sensorA: 0, timer: 10, lightA: 1, lightB: 0},
    { input: 'A', sensorA: 100, timer: 5, lightA: 1, lightB: 0},
    { input: 'B', sensorA: 100, timer: 5, lightA: 0, lightB: 1},
    { input: 'X', sensorA: 100, timer: 5, lightA: 0, lightB: 1},
  ];

  return (
    <section id="simulation" className="py-20 sim-background overflow-hidden">
      <style>{styles}</style>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Simulasi & Diagram Logika</h2>
          <p className="text-gray-400 mt-2">Observasi FSM beraksi melalui visualisasi isometrik.</p>
        </div>

        <div className="relative w-full aspect-video min-h-[500px] xl:min-h-[700px]">
            {/* UI Overlays */}
            <div className="absolute top-0 right-0 bg-black/50 p-2 rounded-md font-mono text-xl text-cyan-300 z-30">{formatTime(time)}</div>
            <div className="absolute bottom-4 left-4 bg-black/50 p-3 rounded-md text-xs text-cyan-300 z-30 font-mono">
                <p>Push Button = Car Detect</p>
                <p>RED LED = Flip-Flop SET</p>
            </div>
            <div className="absolute bottom-4 right-4 bg-black/70 p-3 rounded-lg border border-cyan-700 w-full max-w-sm z-30">
                 <h3 className="text-white font-bold mb-2 text-center font-mono">TRUTH TABLE</h3>
                 <table className="w-full text-xs text-center font-mono">
                    <thead className="text-cyan-400">
                        <tr><th className="p-1">INPUTS</th><th className="p-1">SENSOR A</th><th className="p-1">TIMER</th><th className="p-1" colSpan={2}>LIGHT A B (Green)</th></tr>
                    </thead>
                    <tbody>
                        {truthTableData.map((row, index) => (
                            <tr key={index} className={`transition-colors duration-300 ${activeTruthRow === index ? 'bg-cyan-500/30' : ''}`}>
                                <td className="p-1.5 border border-cyan-800">{row.input}</td>
                                <td className="p-1.5 border border-cyan-800">{row.sensorA}</td>
                                <td className="p-1.5 border border-cyan-800">{row.timer}</td>
                                <td className="p-1.5 border border-cyan-800">{row.lightA}</td>
                                <td className="p-1.5 border border-cyan-800">{row.lightB}</td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
            
            <div className="absolute inset-0 sim-container">
                {/* Logic Modules */}
                 <LogicModule title="SENSOR A" statusText="DETECT..." isSet={sensorPulse.a} style={{ top: '25%', left: '5%'}} />
                 <LogicModule title="FLIP-FLOP A" statusText="00:52:0D" isSet={demand.a > 0} style={{ top: '5%', right: '20%'}} />
                 <LogicModule title="SENSOR B" statusText="DETECT..." isSet={sensorPulse.b} style={{ bottom: '25%', right: '5%'}} />
                 <LogicModule title="FLIP-FLOP B" statusText="LOGIC GATE" isSet={demand.b > 0} style={{ bottom: '5%', left: '20%'}} >
                    <svg viewBox="0 0 100 50" className="w-16 mx-auto mt-1"><path d="M20 10 H60 C 80 10, 80 40, 60 40 H20 Z" stroke="#00aaff" strokeWidth="2" fill="none" /><text x="50" y="28" textAnchor="middle" fill="#00aaff" fontSize="12">A</text></svg>
                 </LogicModule>

                <div className="absolute inset-0 iso-plane">
                    {/* Roads, Markings etc */}
                    <div className="road road-ns"></div>
                    <div className="road road-ew"></div>
                    <div className="absolute w-[30%] h-[30%] bg-[#2c3e50] top-[35%] left-[35%]"></div>
                    <div className="lane-marking absolute w-1 h-full border-l-4 border-gray-500/50 left-1/2 top-0"></div>
                    <div className="lane-marking absolute h-1 w-full border-t-4 border-gray-500/50 top-1/2 left-0"></div>
                    <div className="crosswalk w-[30%] h-4 absolute top-[32%] left-[35%]"></div>
                    <div className="crosswalk w-[30%] h-4 absolute top-[65%] left-[35%] rotate-180"></div>
                    <div className="crosswalk w-4 h-[30%] absolute left-[32%] top-[35%]"></div>
                    <div className="crosswalk w-4 h-[30%] absolute left-[65%] top-[35%] rotate-180"></div>

                    {/* On-road Sensors */}
                    <div className={`road-sensor ${sensorPulse.a ? 'active' : ''}`} style={{top: '42%', left: '15%'}}><SensorCarIcon /></div>
                    <div className={`road-sensor ${sensorPulse.b ? 'active' : ''}`} style={{top: '15%', left: '42%', transform: 'rotate(90deg)'}}><SensorCarIcon /></div>

                    {/* Lights */}
                    <div className="absolute top-[30%] left-[30%]" style={{transform: 'scale(0.3) rotate(90deg)'}}><TrafficLightPole state={currentSequence.ew} /></div>
                    <div className="absolute top-[60%] left-[70%]" style={{transform: 'scale(0.3) rotate(-90deg)'}}><TrafficLightPole state={currentSequence.ew} /></div>
                    <div className="absolute top-[70%] left-[30%]" style={{transform: 'scale(0.3) rotate(180deg)'}}><TrafficLightPole state={currentSequence.ns} /></div>
                    <div className="absolute top-[20%] left-[70%]" style={{transform: 'scale(0.3)'}}><TrafficLightPole state={currentSequence.ns} /></div>
                    
                    {/* Cars */}
                    {Array.from({ length: demand.a }).map((_, i) => (
                        <div key={`ew-q-${i}`} className="absolute w-6 h-12 top-1/2 left-1/2" style={{transform: `translateX(calc(-100px - ${i * 35}px)) translateY(30px)`}}><IsometricCar color="#5dadec" rotation={0} /></div>
                    ))}
                     {Array.from({ length: demand.b }).map((_, i) => (
                        <div key={`ns-q-${i}`} className="absolute w-6 h-12 top-1/2 left-1/2" style={{transform: `translateY(calc(100px + ${i * 35}px)) translateX(-30px)`}}><IsometricCar color="#5dadec" rotation={90} /></div>
                    ))}
                    {departingCarsEW.map(id => (
                         <div key={`ew-d-${id}`} className="absolute w-6 h-12 top-1/2 left-1/2 animate-drive-ew" style={{transform: `translateY(30px)`}}><IsometricCar color="#5dadec" rotation={0} /></div>
                    ))}
                    {departingCarsNS.map(id => (
                         <div key={`ns-d-${id}`} className="absolute w-6 h-12 top-1/2 left-1/2 animate-drive-ns" style={{transform: `translateX(-30px)`}}><IsometricCar color="#5dadec" rotation={90} /></div>
                    ))}
                </div>
                 <svg width="100%" height="100%" className="absolute inset-0 z-10 pointer-events-none" style={{transform: 'scale(1.1) translate(-4%, -4%)'}}>
                    <path d="M28% 50% C 30% 30%, 65% 20%, 72% 28%" stroke="#00aaff" strokeWidth="2" fill="none" />
                    <path d="M28% 50% C 35% 65%, 40% 80%, 50% 85%" stroke="#ff4d4d" strokeWidth="2" fill="none" />
                    <path d="M72% 70% C 65% 80%, 40% 90%, 30% 80%" stroke="#00aaff" strokeWidth="2" fill="none" />
                    <path d="M50% 85% L 72% 70%" stroke="#33ff33" strokeWidth="2" fill="none" />
                </svg>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-8 mt-8">
                <div className="text-center">
                    <button onClick={() => addDemand('a')} className="bg-gray-700 hover:bg-gray-600 border border-cyan-500 text-cyan-300 px-4 py-2 rounded">+ Mobil A (EW)</button>
                    <p className="text-xs mt-1 text-cyan-400">Antrian: {demand.a}</p>
                </div>
                 <button onClick={() => setIsRunning(!isRunning)} className="w-12 h-12 rounded-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all" title={isRunning ? "Jeda" : "Mulai"}>
                    {isRunning ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" /></svg>}
                </button>
                <div className="text-center">
                    <button onClick={() => addDemand('b')} className="bg-gray-700 hover:bg-gray-600 border border-cyan-500 text-cyan-300 px-4 py-2 rounded">+ Mobil B (NS)</button>
                    <p className="text-xs mt-1 text-cyan-400">Antrian: {demand.b}</p>
                </div>
            </div>
      </div>
    </section>
  );
};

export default Simulation;
