export function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  export function formatNumber(number, percentage = false) {
    if (percentage) {
      return (number * 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '%';
    }
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
  