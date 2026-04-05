/**
 * Converts a number into Indian Rupees words.
 * @param {number} amount - The amount to convert.
 * @returns {string} - The amount in words.
 */
export const numberToWords = (amount) => {
  if (amount === 0) return "Zero Rupees Only";

  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const formatNumber = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + formatNumber(n % 100) : "");
    return "";
  };

  const convert = (n) => {
    let str = "";
    if (n >= 10000000) {
      str += formatNumber(Math.floor(n / 10000000)) + " Crore ";
      n %= 10000000;
    }
    if (n >= 100000) {
      str += formatNumber(Math.floor(n / 100000)) + " Lakh ";
      n %= 100000;
    }
    if (n >= 1000) {
      str += formatNumber(Math.floor(n / 1000)) + " Thousand ";
      n %= 1000;
    }
    if (n > 0) {
      str += formatNumber(n);
    }
    return str.trim();
  };

  const whole = Math.floor(amount);
  const fraction = Math.round((amount - whole) * 100);

  let result = convert(whole) + " Rupees";
  if (fraction > 0) {
    result += " and " + convert(fraction) + " Paise";
  }
  result += " Only";

  return result;
};
