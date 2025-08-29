
const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
});

export const formatCurrency = (value: number): string => {
    if (isNaN(value) || !isFinite(value)) return '—';
    return currencyFormatter.format(value);
};

export const formatNumber = (value: number): string => {
    if (isNaN(value) || !isFinite(value)) return '—';
    return numberFormatter.format(value);
};
