/// <reference types="react" />
interface PriceStreaming {
    intialized: boolean;
    assets: Array<any>;
    prices: any;
    tickers: any;
    streamPrices?: (symbols: Array<string>) => void;
    streamTickers?: (symbols: Array<string>) => void;
}
declare const CryptoPriceContext: import("react").Context<PriceStreaming>;
export default CryptoPriceContext;
