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
import { useState, useContext, useEffect } from "react";
import CryptoPriceContext from "./CryptoPriceContext";
var useCryptoTickers = function (symbols) {
    var _a = __read(useState(false), 2), streamOpen = _a[0], setStreamOpen = _a[1];
    var _b = __read(useState({}), 2), data = _b[0], setData = _b[1];
    var priceContext = useContext(CryptoPriceContext);
    var assets = priceContext.assets, tickers = priceContext.tickers, streamTickers = priceContext.streamTickers;
    useEffect(function () {
        if (!streamOpen && assets.length > 0) {
            streamTickers(symbols);
            setStreamOpen(true);
        }
    }, [assets, symbols, streamOpen]);
    useEffect(function () {
        if (tickers) {
            setData(__assign(__assign({}, data), tickers));
        }
    }, [tickers]);
    return data;
};
export default useCryptoTickers;
//# sourceMappingURL=useCryptoTickers.js.map