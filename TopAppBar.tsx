
import React from 'react';

interface TopAppBarProps {
    title: string;
    chipLabel: string;
}

export const TopAppBar: React.FC<TopAppBarProps> = React.memo(({ title, chipLabel }) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm h-16">
            <h1 className="text-xl font-medium text-gray-900 dark:text-gray-50">{title}</h1>
            <div className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
                {chipLabel}
            </div>
        </header>
    );
});
