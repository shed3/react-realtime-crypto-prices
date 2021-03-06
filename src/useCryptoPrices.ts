import React, { useState, useContext, useEffect } from "react";
import CryptoPriceContext from "./CryptoPriceContext";

const useCryptoPrices = (symbols: Array<string>) => {
    const [streamOpen, setStreamOpen] = useState(false);
    const [data, setData] = useState({});
    const priceContext = useContext(CryptoPriceContext);
    const { assets, prices, streamPrices } = priceContext;

    useEffect(() => {
        if (!streamOpen && assets.length > 0) {
            streamPrices(symbols);
            setStreamOpen(true);
        }
    }, [assets, symbols, streamOpen]);

    useEffect(() => {
        if (prices) {
            setData({ ...data, ...prices });
        }
    }, [prices]);

    return data;
};

export default useCryptoPrices;
