# React Real Time Crypto Prices

## _The easiest way to use live crypto prices in React components_

[![language](https://img.shields.io/github/languages/top/rileystephens28/react-realtime-crypto-prices)]() [![license](https://img.shields.io/github/license/rileystephens28/react-realtime-crypto-prices)]()

React Real Time Crypto Prices provides a simple context provider and hooks for using live simple prices and candle data in your components.

## Dependencies

This library requires the following packages to be installed:

-   [react][react] v17.0.2+
-   [react-dom ][react-dom] v17.0.2+

## Installation

React Real Time Crypto Prices requires [Node.js](https://nodejs.org/) v14+ to run.

Install React Real Time Crypto Prices from npm

```sh
npm install react-realtime-crypto-prices
```

Or with yarn

```sh
yarn add react-realtime-crypto-prices
```

## Supported Symbols

TODO: Add a list (or link to one) of supported symbols for simple and candle prices

## Usage

All symbols should be lowercase to avoid capitalization mismatching.

```js
import React from "react";
import {
    useCryptoPrices,
    useCryptoTickers,
    CryptoPriceProvider,
} from "react-realtime-crypto-prices";

const HookExample = () => {
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

const App = () => {
    return (
        <div className="App">
            <CryptoPriceProvider cryptoCompareApiKey="<YOUR-API_KEY>">
                <HookExample />
            </CryptoPriceProvider>
        </div>
    );
};

export default App;
```

_Ladies and gents we have ~live prices~_

\*Note: cryptoCompareApiKey is an optional prop for CryptoPriceProvider, however,
if not included, the library will be unable to stream ticker data

## Hooks

### useCryptoPrices

-   Accepts array of symbols
-   returns data in format {symbol: price}

Example

```json
{
    "btc": 40105.28,
    "eth": 2381.19,
    "ltc": 526.97
}
```

### useCryptoTickers

-   Accepts array of symbols
-   returns data in format {symbol: {timestamp, open, high, low, close, volume}

Example

```json
{
    btc: {
        timestamp:2021-07-29T15:55:00.000Z,
        open: 39961.26,
        high: 39978.48,
        low: 39955.29,
        close:39978.48,
        volume: 772926.41
    },
    eth: {
        timestamp:2021-07-29T15:55:00.000Z,
        open: 2322.47,
        high: 2323.23,
        low: 2321.54,
        close:2323.23,
        volume: 932626.37
    }
}
```

## Development

Interested in helping out a bit?

React Real Time Crypto Prices is written in TypeScript and **will** be tested using jest.
Next step in the roadmap is to define all the types and interfaces used throughout the project.
Make sure all new features are tested before creating PR.

Install Package Dependencies:

```sh
npm install
```

Build Package:

```sh
npm run build
```

Create Package Link:

```sh
npm link
```

Install Example Project Dependencies:

```sh
cd example/
npm install
npm link react-realtime-crypto-prices
```

Resolve React versions between package and example project:

```sh
cd ../
npm link example/node_modules/react
```

Run tests:

```sh
npm run test
```

## License

MIT

**Houston we have...Free Software!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[react]: https://www.npmjs.com/package/react
[react-dom]: https://www.npmjs.com/package/react-dom
