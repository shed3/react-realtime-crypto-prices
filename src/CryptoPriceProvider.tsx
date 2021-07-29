import React, { useReducer, useEffect } from "react";
import { CryptoPriceReducer } from "./CryptoPriceReducer";
import CryptoPriceContext from "./CryptoPriceContext";
import axios from "axios";
import { COIN_CAP_WS_URI, COIN_CAP_URI } from "./config";
import {
    STREAM_PRICES,
    STREAM_TICKER,
    GET_ASSETS,
    INITIALIZED,
    CACHE_ASSETS,
    ITicker,
} from "./types";

export default function CryptoPriceProvider({
    cryptoCompareApiKey,
    children,
}: any) {
    const initialState: any = {
        assets: [],
        prices: {},
        tickers: {},
        pricesWebSocket: null,
        tickersWebSocket: null,
        initialized: false,
        assetCache: {},
    };

    const [state, dispatch] = useReducer(CryptoPriceReducer, initialState);

    useEffect(() => {
        getAssets();
    }, []);

    const getAssets = () => {
        axios(`${COIN_CAP_URI}assets?limit=1500`)
            .then((res) => {
                dispatch({
                    type: GET_ASSETS,
                    payload: res.data.data,
                });
                dispatch({
                    type: INITIALIZED,
                    payload: true,
                });
            })
            .catch((err) => console.error(err));
    };

    const resolveAssetCache = (
        assets: Array<string>,
        matchKey: "id" | "symbol",
        cache: any = {},
    ) => {
        const cachedSymbols =
            matchKey === "id" ? Object.keys(cache) : Object.values(cache);
        const newAssets = assets.filter(
            (asset: string) => !cachedSymbols.includes(asset),
        );
        const mappedSymbols = state.assets
            .filter((asset: any) => newAssets.includes(asset[matchKey]))
            .map((asset: any) => ({
                id: asset.id,
                symbol: asset.symbol.toLowerCase(),
            }));

        const mapperCache: any = { ...cache };
        mappedSymbols.forEach(
            (symMap: any) => (mapperCache[symMap.id] = symMap.symbol),
        );
        return mapperCache;
    };

    const connectPrices = (symbols: Array<string>) => {
        state.pricesWebSocket = new WebSocket(
            `${COIN_CAP_WS_URI}prices?assets=${symbols.join(",")}`,
        );
        state.pricesWebSocket.onclose = function (e: any) {
            console.log(
                "Price socket closed...reconnecting in 1 second.",
                e.reason,
            );
            setTimeout(function () {
                connectPrices(symbols);
            }, 1000);
        };

        state.pricesWebSocket.onerror = function (err: any) {
            console.error(
                "Price socket encountered error: ",
                err.message,
                "Closing socket",
            );
            state.pricesWebSocket.close();
        };

        state.pricesWebSocket.onmessage = (msg: any) => {
            const data = JSON.parse(msg.data);
            const symbolIds: Array<string> = Object.keys(data);
            if (state.assets.length > 0) {
                // format stream price and update mapper cache
                const mapperCache: any = resolveAssetCache(
                    symbolIds,
                    "id",
                    state.assetCache,
                );
                const formattedPrices: any = {};
                symbolIds.forEach((symbolId: string) => {
                    formattedPrices[mapperCache[symbolId]] = parseFloat(
                        data[symbolId],
                    );
                });
                dispatch({
                    type: CACHE_ASSETS,
                    payload: mapperCache,
                });
                dispatch({
                    type: STREAM_PRICES,
                    payload: formattedPrices,
                });
            }
        };
    };

    const connectTickers = (symbols: Array<string>) => {
        state.tickersWebSocket = new WebSocket(
            `wss://streamer.cryptocompare.com/v2?apiKey=${cryptoCompareApiKey}`,
        );

        state.tickersWebSocket.onopen = function onStreamOpen() {
            const subRequest = {
                action: "SubAdd",
                subs: symbols.map(
                    (symbol: string) =>
                        `24~CCCAGG~${symbol.toUpperCase()}~USD~m`,
                ),
            };
            state.tickersWebSocket.send(JSON.stringify(subRequest));
        };
        state.tickersWebSocket.onclose = function (e: any) {
            console.log(
                "Ticker socket closed...reconnecting in 1 second.",
                e.reason,
            );
            setTimeout(function () {
                connectTickers(symbols);
            }, 1000);
        };

        state.tickersWebSocket.onerror = function (err: any) {
            console.error(
                "Ticker socket encountered error: ",
                err.message,
                "Closing socket",
            );
            state.tickersWebSocket.close();
        };

        state.tickersWebSocket.onmessage = function (message: any) {
            const data = JSON.parse(message.data);
            if (
                data.TYPE === "24" &&
                (data.ACTION === "A" || data.ACTION === "I")
            ) {
                const tickersCopy: any = state.tickers;
                const symbol: string = data.FROMSYMBOL.toLowerCase();
                if (Object.keys(tickersCopy).includes(symbol)) {
                    if (
                        state.tickers[symbol].timestamp <
                        new Date(data.TS * 1000)
                    ) {
                        // update ticker data
                        const formattedTicker: ITicker = {
                            timestamp: new Date(data.TS * 1000),
                            open: data.OPEN,
                            high: data.CLOSE,
                            low: data.LOW,
                            close: data.CLOSE,
                            volume: data.VOLUMETO,
                        };
                        const payload: any = {
                            [data.FROMSYMBOL.toLowerCase()]: formattedTicker,
                        };
                        dispatch({
                            type: STREAM_TICKER,
                            payload: payload,
                        });
                    }
                } else {
                    const formattedTicker: ITicker = {
                        timestamp: new Date(data.TS * 1000),
                        open: data.OPEN,
                        high: data.CLOSE,
                        low: data.LOW,
                        close: data.CLOSE,
                        volume: data.VOLUMETO,
                    };
                    const payload: any = {
                        [data.FROMSYMBOL.toLowerCase()]: formattedTicker,
                    };
                    dispatch({
                        type: STREAM_TICKER,
                        payload: payload,
                    });
                }
            }
        };
    };

    const streamPrices = (symbols: Array<string>) => {
        const symbolCache: any = resolveAssetCache(
            symbols.map((s: string) => s.toUpperCase()),
            "symbol",
        );
        dispatch({
            type: CACHE_ASSETS,
            payload: symbolCache,
        });

        symbols = Object.keys(symbolCache);
        connectPrices(symbols);
    };

    const streamTickers = (symbols: Array<string>) => {
        if (cryptoCompareApiKey) {
            connectTickers(symbols);
        } else {
            dispatch({
                type: STREAM_TICKER,
                payload: {
                    error: "CryptoCompare API key is required to stream tickers",
                },
            });
        }
    };

    const { assets, prices, tickers } = state;
    const providerValue: any = {
        assets,
        prices,
        tickers,
        getAssets,
        streamPrices,
        streamTickers,
    };

    return (
        <CryptoPriceContext.Provider value={providerValue}>
            {children}
        </CryptoPriceContext.Provider>
    );
}
