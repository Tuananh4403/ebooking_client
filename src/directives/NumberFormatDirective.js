// directives.js

export const numberFormat = {
    beforeMount(el, binding) {
        const defaultOptions = {
            decimal: '.',
            separator: ',',
            precision: 2
        };
        const options = { ...defaultOptions, ...binding.value };
        el._numberFormatOptions = options;
    },
    mounted(el) {
        if (el.value) {
            el.value = formatNumber(el.value, el._numberFormatOptions);
            el.dispatchEvent(new Event('input'));
        }
    },
    updated(el) {
        if (el._numberFormatOptions) {
            el.value = formatNumber(el.value, el._numberFormatOptions);
            el.dispatchEvent(new Event('input'));
        }
    },
};

const formatNumber = (value, options) => {
    let inputNumber = value || '';
    const { decimal, separator, precision } = options;

    let [integerPart, decimalPart] = inputNumber.toString().split(decimal);

    integerPart = integerPart.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, separator);

    if (decimalPart) {
        decimalPart = decimalPart.substring(0, precision).replace(/\D/g, '');
    }

    return decimalPart ? `${integerPart}${decimal}${decimalPart}` : integerPart;
};

// Add more directives if needed
