import React from "react";
import {
    useCryptoPrices,
    useCryptoTickers,
} from "react-realtime-crypto-prices";
import "./App.css";

export const HookExample = () => {
    const prices = useCryptoPrices(["btc", "eth"]);
    const tickers = useCryptoTickers(["btc", "eth"]);
    return (
        <>
            <div>Live Prices</div>
            <div>{JSON.stringify(prices)}</div>

            <div>Live Tickers</div>
            <div>{JSON.stringify(tickers)}</div>
        </>
    );
};
