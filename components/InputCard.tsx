
import React, { useCallback } from 'react';

interface InputCardProps {
    label: string;
    unit: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
}

export const InputCard: React.FC<InputCardProps> = React.memo(({ label, unit, value, onChange, min, max, step }) => {

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.valueAsNumber;
        if (!isNaN(val)) {
            onChange(val);
        }
    }, [onChange]);

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md transition-all duration-300">
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">{label}</label>
            <div className="flex items-baseline mt-2">
                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    min={min}
                    max={max}
                    step={step}
                    inputMode="decimal"
                    className="w-full text-2xl font-semibold bg-transparent border-b-2 border-gray-200 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                />
                <span className="ml-2 text-lg text-gray-400 dark:text-gray-500">{unit}</span>
            </div>
            <input
                type="range"
                value={value}
                onChange={handleInputChange}
                min={min}
                max={max}
                step={step}
                className="w-full h-2 mt-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600 dark:accent-blue-400"
            />
        </div>
    );
});
