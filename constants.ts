
import type { CalculatorState } from './types';

export const DEFAULT_VALUES: CalculatorState = {
    petrolPrice: 94.48,
    realMileage: 55,
    dailyDistance: 120,
    refillAmount: 300,
};

export const BIKE_MODEL: string = 'Dream Yuga';
export const TANK_CAPACITY: number = 8.1; // in Litres

export const SCENARIO_MILEAGES: number[] = [45, 50, 55, 60, 65];
export const SCENARIO_DISTANCES: number[] = [80, 100, 120, 150, 200];
