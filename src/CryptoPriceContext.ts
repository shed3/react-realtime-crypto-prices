import { createContext } from "react";

interface PriceStreaming {
  prices: any;
  tickers: any;
}

const defaultValue = {} as any;
const CryptoPriceContext = createContext(defaultValue);
export default CryptoPriceContext;
