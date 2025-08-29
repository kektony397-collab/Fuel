
export const vibrate = (pattern: number | number[]): void => {
    if ('vibrate' in navigator) {
        try {
            navigator.vibrate(pattern);
        } catch (e) {
            console.warn("Vibration failed", e);
        }
    }
};

export const shareData = async (data: { title: string; text: string; }): Promise<boolean> => {
    if (navigator.share) {
        try {
            await navigator.share(data);
            return true;
        } catch (err) {
            console.error('Error sharing:', err);
            // Fallback to clipboard if sharing is cancelled or fails
            return copyToClipboard(data.text);
        }
    } else {
        // Fallback for browsers that do not support Web Share API
        return copyToClipboard(data.text);
    }
};

const copyToClipboard = async (text: string): Promise<boolean> => {
    if (!navigator.clipboard) {
        return false;
    }
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy text: ', err);
        return false;
    }
};
