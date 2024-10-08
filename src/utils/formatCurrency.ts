// Function to format the currency values
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

// Function to handle plain number formatting with dots for thousands
export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('tr-TR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};
