
import React from 'react';
import type { ResultKPIs } from '../types';

interface ResultsCardProps {
    kpis: ResultKPIs;
}

const KPI: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col items-center justify-center p-2 text-center bg-gray-100 dark:bg-gray-700 rounded-lg">
        <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
        <span className="text-lg font-bold text-gray-900 dark:text-gray-50">{value}</span>
    </div>
);

export const ResultsCard: React.FC<ResultsCardProps> = React.memo(({ kpis }) => {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Key Metrics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <KPI label="Fuel Cost/km" value={kpis.costPerKm} />
                <KPI label="Fuel Cost/day" value={kpis.costPerDay} />
                <KPI label="Full Tank Range" value={kpis.fullTankRange} />
                <KPI label="Full Tank Cost" value={kpis.fullTankCost} />
                <KPI label="Refill (Litres)" value={kpis.refillLitres} />
                <KPI label="Refill Range" value={kpis.refillRange} />
            </div>
        </div>
    );
});
