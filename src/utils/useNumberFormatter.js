// useCurrencyFormatter.js
import { ref } from 'vue';

export function useCurrencyFormatter(locale = 'vi-VN', currency = 'VND') {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  });

  const format = (value) => formatter.format(value);

  return { format };
}
