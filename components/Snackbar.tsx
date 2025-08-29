
import React from 'react';

interface SnackbarProps {
    message: string;
    isVisible: boolean;
}

export const Snackbar: React.FC<SnackbarProps> = ({ message, isVisible }) => {
    return (
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 rounded-full shadow-lg transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            {message}
        </div>
    );
};
