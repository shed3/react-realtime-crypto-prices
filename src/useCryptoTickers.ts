import React, { useState, useContext, useEffect } from "react";
import CryptoPriceContext from "./CryptoPriceContext";

const useCryptoTickers = (symbols: Array<string>) => {
    const [streamOpen, setStreamOpen] = useState(false);
    const [data, setData] = useState({});

    const priceContext = useContext(CryptoPriceContext);
    const { assets, tickers, streamTickers } = priceContext;

    useEffect(() => {
        if (!streamOpen && assets.length > 0) {
            streamTickers(symbols);
            setStreamOpen(true);
        }
    }, [assets, symbols, streamOpen]);

    useEffect(() => {
        if (tickers) {
            setData({ ...data, ...tickers });
        }
    }, [tickers]);

    return data;
};

export default useCryptoTickers;
