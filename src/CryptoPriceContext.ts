import { createContext } from "react";

interface PriceStreaming {
    intialized: boolean;
    assets: Array<any>;
    prices: any;
    tickers: any;
    streamPrices?: (symbols: Array<string>) => void;
    streamTickers?: (symbols: Array<string>) => void;
}

const defaultValue: PriceStreaming = {
    intialized: false,
    assets: [],
    prices: {},
    tickers: {},
};

const CryptoPriceContext = createContext(defaultValue);
export default CryptoPriceContext;
