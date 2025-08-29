
export interface CalculatorState {
    petrolPrice: number;
    realMileage: number;
    dailyDistance: number;
    refillAmount: number;
}

export interface ResultKPIs {
    costPerKm: string;
    costPerDay: string;
    fullTankRange: string;
    fullTankCost: string;
    refillLitres: string;
    refillRange: string;
}

export interface SnackbarState {
    visible: boolean;
    message: string;
}
