var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React, { useReducer, useEffect } from "react";
import { CryptoPriceReducer } from "./CryptoPriceReducer";
import CryptoPriceContext from "./CryptoPriceContext";
import axios from "axios";
import { COIN_CAP_WS_URI, COIN_CAP_URI } from "./config";
import { STREAM_PRICES, STREAM_TICKER, GET_ASSETS, INITIALIZED, CACHE_ASSETS, } from "./types";
export default function CryptoPriceProvider(_a) {
    var cryptoCompareApiKey = _a.cryptoCompareApiKey, children = _a.children;
    var initialState = {
        assets: [],
        prices: {},
        tickers: {},
        pricesWebSocket: null,
        tickersWebSocket: null,
        initialized: false,
        assetCache: {},
    };
    var _b = __read(useReducer(CryptoPriceReducer, initialState), 2), state = _b[0], dispatch = _b[1];
    useEffect(function () {
        getAssets();
    }, []);
    var getAssets = function () {
        axios(COIN_CAP_URI + "assets?limit=1500")
            .then(function (res) {
            dispatch({
                type: GET_ASSETS,
                payload: res.data.data,
            });
            dispatch({
                type: INITIALIZED,
                payload: true,
            });
        })
            .catch(function (err) { return console.error(err); });
    };
    var resolveAssetCache = function (assets, matchKey, cache) {
        if (cache === void 0) { cache = {}; }
        var cachedSymbols = matchKey === "id" ? Object.keys(cache) : Object.values(cache);
        var newAssets = assets.filter(function (asset) { return !cachedSymbols.includes(asset); });
        var mappedSymbols = state.assets
            .filter(function (asset) { return newAssets.includes(asset[matchKey]); })
            .map(function (asset) { return ({
            id: asset.id,
            symbol: asset.symbol.toLowerCase(),
        }); });
        var mapperCache = __assign({}, cache);
        mappedSymbols.forEach(function (symMap) { return (mapperCache[symMap.id] = symMap.symbol); });
        return mapperCache;
    };
    var connectPrices = function (symbols) {
        state.pricesWebSocket = new WebSocket(COIN_CAP_WS_URI + "prices?assets=" + symbols.join(","));
        state.pricesWebSocket.onclose = function (e) {
            console.log("Price socket closed...reconnecting in 1 second.", e.reason);
            setTimeout(function () {
                connectPrices(symbols);
            }, 1000);
        };
        state.pricesWebSocket.onerror = function (err) {
            console.error("Price socket encountered error: ", err.message, "Closing socket");
            state.pricesWebSocket.close();
        };
        state.pricesWebSocket.onmessage = function (msg) {
            var data = JSON.parse(msg.data);
            var symbolIds = Object.keys(data);
            if (state.assets.length > 0) {
                var mapperCache_1 = resolveAssetCache(symbolIds, "id", state.assetCache);
                var formattedPrices_1 = {};
                symbolIds.forEach(function (symbolId) {
                    formattedPrices_1[mapperCache_1[symbolId]] = parseFloat(data[symbolId]);
                });
                dispatch({
                    type: CACHE_ASSETS,
                    payload: mapperCache_1,
                });
                dispatch({
                    type: STREAM_PRICES,
                    payload: formattedPrices_1,
                });
            }
        };
    };
    var connectTickers = function (symbols) {
        state.tickersWebSocket = new WebSocket("wss://streamer.cryptocompare.com/v2?apiKey=" + cryptoCompareApiKey);
        state.tickersWebSocket.onopen = function onStreamOpen() {
            var subRequest = {
                action: "SubAdd",
                subs: symbols.map(function (symbol) {
                    return "24~CCCAGG~" + symbol.toUpperCase() + "~USD~m";
                }),
            };
            state.tickersWebSocket.send(JSON.stringify(subRequest));
        };
        state.tickersWebSocket.onclose = function (e) {
            console.log("Ticker socket closed...reconnecting in 1 second.", e.reason);
            setTimeout(function () {
                connectTickers(symbols);
            }, 1000);
        };
        state.tickersWebSocket.onerror = function (err) {
            console.error("Ticker socket encountered error: ", err.message, "Closing socket");
            state.tickersWebSocket.close();
        };
        state.tickersWebSocket.onmessage = function (message) {
            var _a, _b;
            var data = JSON.parse(message.data);
            if (data.TYPE === "24" &&
                (data.ACTION === "A" || data.ACTION === "I")) {
                var tickersCopy = state.tickers;
                var symbol = data.FROMSYMBOL.toLowerCase();
                if (Object.keys(tickersCopy).includes(symbol)) {
                    if (state.tickers[symbol].timestamp <
                        new Date(data.TS * 1000)) {
                        var formattedTicker = {
                            timestamp: new Date(data.TS * 1000),
                            open: data.OPEN,
                            high: data.CLOSE,
                            low: data.LOW,
                            close: data.CLOSE,
                            volume: data.VOLUMETO,
                        };
                        var payload = (_a = {},
                            _a[data.FROMSYMBOL.toLowerCase()] = formattedTicker,
                            _a);
                        dispatch({
                            type: STREAM_TICKER,
                            payload: payload,
                        });
                    }
                }
                else {
                    var formattedTicker = {
                        timestamp: new Date(data.TS * 1000),
                        open: data.OPEN,
                        high: data.CLOSE,
                        low: data.LOW,
                        close: data.CLOSE,
                        volume: data.VOLUMETO,
                    };
                    var payload = (_b = {},
                        _b[data.FROMSYMBOL.toLowerCase()] = formattedTicker,
                        _b);
                    dispatch({
                        type: STREAM_TICKER,
                        payload: payload,
                    });
                }
            }
        };
    };
    var streamPrices = function (symbols) {
        var symbolCache = resolveAssetCache(symbols.map(function (s) { return s.toUpperCase(); }), "symbol");
        dispatch({
            type: CACHE_ASSETS,
            payload: symbolCache,
        });
        symbols = Object.keys(symbolCache);
        connectPrices(symbols);
    };
    var streamTickers = function (symbols) {
        if (cryptoCompareApiKey) {
            connectTickers(symbols);
        }
        else {
            dispatch({
                type: STREAM_TICKER,
                payload: {
                    error: "CryptoCompare API key is required to stream tickers",
                },
            });
        }
    };
    var assets = state.assets, prices = state.prices, tickers = state.tickers;
    var providerValue = {
        assets: assets,
        prices: prices,
        tickers: tickers,
        getAssets: getAssets,
        streamPrices: streamPrices,
        streamTickers: streamTickers,
    };
    return (React.createElement(CryptoPriceContext.Provider, { value: providerValue }, children));
}
//# sourceMappingURL=CryptoPriceProvider.js.map