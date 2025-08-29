
import React from 'react';

interface FABProps {
    onShare: () => void;
}

export const FAB: React.FC<FABProps> = React.memo(({ onShare }) => {
    return (
        <button
            onClick={onShare}
            aria-label="Share Summary"
            className="ripple fixed bottom-6 right-6 z-10 w-14 h-14 bg-blue-600 dark:bg-blue-500 text-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300"
        >
            <span className="material-symbols-outlined">share</span>
        </button>
    );
});
