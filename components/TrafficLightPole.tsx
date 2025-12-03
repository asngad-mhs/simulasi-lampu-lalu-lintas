
import React from 'react';
import { LightState, LightProps } from '../types';

const Light: React.FC<LightProps> = ({ color, active }) => {
    const baseClasses = "w-10 h-10 rounded-full border-2 border-gray-600 transition-all duration-300";
    const colorClasses = {
        RED: active ? "bg-red-500 shadow-[0_0_15px_5px_rgba(239,68,68,0.7)]" : "bg-red-900",
        YELLOW: active ? "bg-yellow-400 shadow-[0_0_15px_5px_rgba(250,204,21,0.7)]" : "bg-yellow-900",
        GREEN: active ? "bg-green-500 shadow-[0_0_15px_5px_rgba(34,197,94,0.7)]" : "bg-green-900",
    };

    return <div className={`${baseClasses} ${colorClasses[color as keyof typeof colorClasses]}`}></div>
}

const TrafficLightPole: React.FC<{ state: LightState }> = ({ state }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-900 p-2 rounded-lg border-2 border-gray-600 space-y-2">
        <Light color="RED" active={state === LightState.RED} />
        <Light color="YELLOW" active={state === LightState.YELLOW} />
        <Light color="GREEN" active={state === LightState.GREEN} />
      </div>
      <div className="w-3 h-12 bg-gray-600"></div>
    </div>
  );
};

export default TrafficLightPole;
