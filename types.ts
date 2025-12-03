
export enum LightState {
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
}

export interface TrafficLightProps {
  orientation: 'vertical' | 'horizontal';
  northSouthState: LightState;
  eastWestState: LightState;
}

export interface LightProps {
    color: string;
    active: boolean;
}
