import React, { useReducer } from "react";
import { CryptoPriceReducer } from "./CryptoPriceReducer";
import PricingContext from "./CryptoPriceContext";

import { COIN_CAP_WS_URI, CRYPTO_COMPARE_API_KEY } from "../config";
import {
  STREAM_PRICES,
  STREAM_TICKER,
} from "../types";

export default function CryptoPriceProvider(props: any) {
  const initialState: any = {
    prices: {},
    tickers: {},
    pricesWebSocket: null,
  };

  const [state, dispatch] = useReducer(CryptoPriceReducer, initialState);

  const streamPrices = () => {
    state.pricesWebSocket = new WebSocket(
      `${COIN_CAP_WS_URI}prices?assets=ALL`
    );
    state.pricesWebSocket.onmessage = (msg: any) => {
      const data = JSON.parse(msg.data);
      dispatch({
        type: STREAM_PRICES,
        payload: data,
      });
    };
    state.pricesWebSocket.onerror = (err: Error) => console.warn(err);
  };

  const streamTickers = (symbols: Array<string>) => {
    var ccStreamer = new WebSocket(
      `wss://streamer.cryptocompare.com/v2?apiKey=${CRYPTO_COMPARE_API_KEY}`
    );

    ccStreamer.onopen = function onStreamOpen() {
      var subRequest = {
        action: "SubAdd",
        subs: symbols.map((symbol: string) => `0~CCCAGG~${symbol}~USD`),
      };
      ccStreamer.send(JSON.stringify(subRequest));
    };

    ccStreamer.onmessage = function onStreamMessage(message) {
      const data = JSON.parse(message.data);
      dispatch({
        type: STREAM_TICKER,
        payload: data,
      });
      console.error("Received from Cryptocompare: " + data);
    };
  };

  const { prices, tickers } = state;

  return (
    <PricingContext.Provider
      value={{
        prices,
        tickers,
        streamPrices,
        streamTickers,
      }}
    >
      {props.children}
    </PricingContext.Provider>
  );
}
