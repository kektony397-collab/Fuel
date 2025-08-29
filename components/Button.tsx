
import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    variant?: 'tonal' | 'text';
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'tonal' }) => {
    const baseClasses = 'ripple px-6 py-2.5 rounded-full font-medium text-sm focus:outline-none focus:ring-4 transition-colors duration-300';
    
    const variantClasses = {
        tonal: 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:hover:bg-blue-900/80 focus:ring-blue-300 dark:focus:ring-blue-800',
        text: 'text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-900/50 focus:ring-blue-300 dark:focus:ring-blue-800',
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]}`}
        >
            {children}
        </button>
    );
};
