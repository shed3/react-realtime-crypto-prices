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
import { STREAM_PRICES, STREAM_TICKER, GET_ASSETS, INITIALIZED, CACHE_ASSETS, } from "./types";
export function CryptoPriceReducer(state, action) {
    switch (action.type) {
        case INITIALIZED:
            return __assign(__assign({}, state), { initialized: action.payload, loading: false });
        case CACHE_ASSETS:
            return __assign(__assign({}, state), { assetCache: action.payload, loading: false });
        case GET_ASSETS:
            return __assign(__assign({}, state), { assets: action.payload, loading: false });
        case STREAM_PRICES:
            return __assign(__assign({}, state), { prices: action.payload, loading: false });
        case STREAM_TICKER:
            return __assign(__assign({}, state), { tickers: action.payload, loading: false });
        default:
            throw new Error();
    }
}
//# sourceMappingURL=CryptoPriceReducer.js.map