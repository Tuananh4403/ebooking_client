export function useCurrencyFormatter(locale = 'vi-VN', currency = 'VND') {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    });

    const format = (value) => formatter.format(value);

    return { format };
}
export function formatNumber(number, percentage = false) {
    // Format as percentage
    if (percentage) {
        return (number * 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '%';
    }
    // Format with thousands separator
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
