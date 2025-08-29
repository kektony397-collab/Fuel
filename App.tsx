
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TopAppBar } from './TopAppBar';
import { InputCard } from './components/InputCard';
import { ResultsCard } from './components/ResultsCard';
import { ScenarioTable } from './components/ScenarioTable';
import { FAB } from './components/FAB';
import { Snackbar } from './components/Snackbar';
import { Button } from './components/Button';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDebounce } from './hooks/useDebounce';
import { formatCurrency, formatNumber } from './utils/formatters';
import { vibrate, shareData } from './utils/webApi';
import { DEFAULT_VALUES, BIKE_MODEL, TANK_CAPACITY, SCENARIO_MILEAGES, SCENARIO_DISTANCES } from './constants';
import type { CalculatorState, ResultKPIs, SnackbarState } from './types';

const App: React.FC = () => {
    const [inputs, setInputs] = useLocalStorage<CalculatorState>('fuelCalculatorState', DEFAULT_VALUES);
    const debouncedInputs = useDebounce(inputs, 250);

    const [snackbar, setSnackbar] = useState<SnackbarState>({ visible: false, message: '' });

    const results: ResultKPIs = useMemo(() => {
        const { petrolPrice, realMileage, dailyDistance, refillAmount } = debouncedInputs;
        if (petrolPrice <= 0 || realMileage <= 0) {
            return {
                costPerKm: '—',
                costPerDay: '—',
                fullTankRange: '—',
                fullTankCost: '—',
                refillLitres: '—',
                refillRange: '—',
            };
        }

        const costPerKm = petrolPrice / realMileage;
        const costPerDay = costPerKm * dailyDistance;
        const fullTankRange = realMileage * TANK_CAPACITY;
        const fullTankCost = petrolPrice * TANK_CAPACITY;
        const refillLitres = refillAmount / petrolPrice;
        const refillRange = refillLitres * realMileage;

        return {
            costPerKm: formatCurrency(costPerKm),
            costPerDay: formatCurrency(costPerDay),
            fullTankRange: `${formatNumber(fullTankRange)} km`,
            fullTankCost: formatCurrency(fullTankCost),
            refillLitres: `${formatNumber(refillLitres)} L`,
            refillRange: `${formatNumber(refillRange)} km`,
        };
    }, [debouncedInputs]);

    useEffect(() => {
        if (results.costPerDay !== '—') {
            document.title = `${results.costPerDay}/day | Fuel Calc`;
        } else {
            document.title = 'Fuel Calculator';
        }
    }, [results.costPerDay]);

    const showSnackbar = (message: string) => {
        setSnackbar({ visible: true, message });
        setTimeout(() => setSnackbar({ visible: false, message: '' }), 3000);
    };

    const handleReset = useCallback(() => {
        setInputs(DEFAULT_VALUES);
        showSnackbar('Reset to default values');
        vibrate(50);
    }, [setInputs]);

    const handleShare = useCallback(async () => {
        const summary = `
⛽ Fuel Cost Summary ⛽
-------------------------
Petrol Price: ${formatCurrency(inputs.petrolPrice)}/L
Real Mileage: ${inputs.realMileage} km/L
Daily Distance: ${inputs.dailyDistance} km
-------------------------
Cost/km: ${results.costPerKm}
Cost/day: ${results.costPerDay}
Full Tank Range: ${results.fullTankRange}
        `.trim();

        const success = await shareData({
            title: 'Fuel Cost Summary',
            text: summary
        });

        if (success) {
            showSnackbar('Summary copied/shared successfully!');
        } else {
            showSnackbar('Could not share summary.');
        }
        vibrate(50);
    }, [inputs, results]);

    const handleInputChange = (field: keyof CalculatorState) => (value: number) => {
        setInputs(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 font-sans">
            <TopAppBar title="Fuel Calculator" chipLabel={BIKE_MODEL} />

            <main className="p-4 pt-20 pb-24 max-w-4xl mx-auto space-y-6">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InputCard
                        label="Petrol Price"
                        unit="₹/L"
                        value={inputs.petrolPrice}
                        onChange={handleInputChange('petrolPrice')}
                        min={80}
                        max={120}
                        step={0.01}
                    />
                    <InputCard
                        label="Real Mileage"
                        unit="km/L"
                        value={inputs.realMileage}
                        onChange={handleInputChange('realMileage')}
                        min={30}
                        max={80}
                        step={0.1}
                    />
                    <InputCard
                        label="Daily Distance"
                        unit="km"
                        value={inputs.dailyDistance}
                        onChange={handleInputChange('dailyDistance')}
                        min={10}
                        max={250}
                        step={1}
                    />
                     <InputCard
                        label="Refill Amount"
                        unit="₹"
                        value={inputs.refillAmount}
                        onChange={handleInputChange('refillAmount')}
                        min={50}
                        max={1000}
                        step={10}
                    />
                </section>

                <ResultsCard kpis={results} />
                <ScenarioTable petrolPrice={debouncedInputs.petrolPrice} />

                <div className="flex justify-center pt-4">
                    <Button onClick={handleReset} variant="tonal">Reset to Defaults</Button>
                </div>
            </main>

            <FAB onShare={handleShare} />
            <Snackbar message={snackbar.message} isVisible={snackbar.visible} />
        </div>
    );
};

export default App;
