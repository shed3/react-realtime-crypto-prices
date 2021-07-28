import {
  STREAM_PRICES,
  STREAM_TICKER,
} from "./types";

export function CryptoPriceReducer(state: any, action: any) {
  switch (action.type) {
    case STREAM_PRICES:
      return {
        ...state,
        prices: action.payload,
        loading: false,
      };
    case STREAM_TICKER:
      return {
        ...state,
        tickers: action.payload,
        loading: false,
      };
    default:
      throw new Error();
  }
}
