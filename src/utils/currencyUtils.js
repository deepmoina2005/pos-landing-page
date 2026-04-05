import { useSelector } from "react-redux";

export const useCurrency = () => {
  const store = useSelector((state) => state.store.store);
  const currency = store?.currency || "INR";
  
  const symbols = {
    "INR": "₹",
    "USD": "$",
  };
  
  return {
    symbol: symbols[currency] || "₹",
    code: currency
  };
};

export const CurrencySymbol = () => {
  const { symbol } = useCurrency();
  return symbol; // Returning just the string symbol, no JSX needed
};

export default CurrencySymbol;
