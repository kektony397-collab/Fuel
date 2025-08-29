
import React, { useMemo } from 'react';
import { SCENARIO_MILEAGES, SCENARIO_DISTANCES } from '../constants';
import { formatCurrency } from '../utils/formatters';

interface ScenarioTableProps {
    petrolPrice: number;
}

export const ScenarioTable: React.FC<ScenarioTableProps> = React.memo(({ petrolPrice }) => {
    const scenarios = useMemo(() => {
        return SCENARIO_DISTANCES.map(distance => {
            const costs = SCENARIO_MILEAGES.map(mileage => {
                if (petrolPrice <= 0 || mileage <= 0) return '—';
                const cost = (petrolPrice / mileage) * distance;
                return formatCurrency(cost);
            });
            return { distance, costs };
        });
    }, [petrolPrice]);

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-x-auto">
            <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Cost Scenarios</h2>
            <table className="w-full text-center border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="p-2 font-medium text-sm text-gray-500 dark:text-gray-400">Dist. \ Mile.</th>
                        {SCENARIO_MILEAGES.map(mileage => (
                            <th key={mileage} className="p-2 font-medium text-sm text-gray-500 dark:text-gray-400">{mileage} km/L</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {scenarios.map(({ distance, costs }) => (
                        <tr key={distance} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                            <td className="p-2 font-medium text-sm text-gray-500 dark:text-gray-400">{distance} km</td>
                            {costs.map((cost, index) => (
                                <td key={index} className="p-2 text-gray-800 dark:text-gray-200">{cost}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});
