export declare const STREAM_PRICES: unique symbol;
export declare const STREAM_TICKER: unique symbol;
export declare const GET_ASSETS: unique symbol;
export declare const INITIALIZED: unique symbol;
export declare const CACHE_ASSETS: unique symbol;
export interface ITicker {
    timestamp: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}
