<div id="top"></div>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![MIT License][license-shield]][license-url]
![top-languages-shield]
![languages-count-shield]
![package-version-shield]
![npm-monthly-downloads-shield]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/Shed-Enterprises/react-realtime-crypto-prices">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->
  <h2 align="center">React Real Time Crypto Prices</h2>
  <p align="center">
    <i>The easiest way to use live crypto prices in React</i>
    <br />
    <br />
    <!-- <a href="https://github.com/Shed-Enterprises/react-realtime-crypto-prices">View Demo</a>
    · -->
    <a href="https://github.com/Shed-Enterprises/react-realtime-crypto-prices/issues">Report Bug</a>
    ·
    <a href="https://github.com/Shed-Enterprises/react-realtime-crypto-prices/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement">Request Feature</a>
  </p>
</div>

### Table of Contents
- [About React Real Time Crypto Prices](#about-react-real-time-crypto-prices)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Hooks](#hooks)
  - [useCryptoPrices](#usecryptoprices)
  - [useCryptoTickers](#usecryptotickers)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

<br />

<!-- ABOUT THE PROJECT -->
## About React Real Time Crypto Prices

React Real Time Crypto Prices provides a simple context provider and hooks for using live simple prices and candle data in your components. The package allows both realtime simple price (ex: $100) and candle tickers (includes values for open, high, low, close, volume). 

**HOWEVER**, the CryptoPriceProvider requires a CryptoCompare API key in order to stream candle tickers (simple prices work out the box). You can get a free API key [here][crypto-compare-api-signup]!

### Built With
This library requires the following packages to be installed:

* [React.js][react] v17.0.2+
* [react-dom ][react-dom] v17.0.2+

<!-- GETTING STARTED -->
## Getting Started

Getting started with React Real Time Crypto Prices is very simple! Just install using the node package manager of your choosing and _voilà_!

### Prerequisites

* React Crypto Icons requires [Node.js][nodejs] v12+ to run.

* Like we mentioned above you will need an API key from CryptoCompare. Grab one over [here][crypto-compare-api-signup].

### Installation


Install React Crypto Icons from npm

```sh
npm install react-realtime-crypto-prices
```

Or with yarn

```sh
yarn add react-realtime-crypto-prices
```

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

*Note: cryptoCompareApiKey is an optional prop for CryptoPriceProvider, however,
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
    "btc": {
        "timestamp": 2021-07-29T15:55:00.000Z,
        "open": 39961.26,
        "high": 39978.48,
        "low": 39955.29,
        "close":39978.48,
        "volume": 772926.41
    },
    "eth": {
        "timestamp": 2021-07-29T15:55:00.000Z,
        "open": 2322.47,
        "high": 2323.23,
        "low": 2321.54,
        "close":2323.23,
        "volume": 932626.37
    }
}
```

<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [ ] Add List of Supported Symbols to README
- [ ] Add Live Demo
- [ ] Define Types and Interfaces

See the [open issues][github-issues] for a full list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing
React Real Time Crypto Prices is written in TypeScript and **will** be tested using jest.

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.


If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch
   ```sh
   git checkout -b feature/AmazingFeature
   ```
3. Commit your Changes 
    ```sh
    git commit -m 'Add some AmazingFeature'
    ```
4. Push to the Branch 
   ```sh
    git push origin feature/AmazingFeature
    ```
5. Open a Pull Request

<br>

Or you can get started developing with the example project!
1. Fork the Project
2. Install Dependencies
   ```sh
    npm install
    ```
3. Build Package:
    ```sh
    npm run build
    ```
4. Create Package Link:
    ```sh
    npm link
    ```
5. Install Example Project Dependencies:
    ```sh
    cd example/
    npm install
    npm link react-realtime-crypto-prices
    ```
6. Resolve React versions between package and example project:
    ```sh
    cd ../
    npm link example/node_modules/react
    ```
7. Run tests:
    ```sh
    npm run test
    ```

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.
**Houston we have...Free Software!**

<!-- CONTACT -->
## Contact

Riley Stephens - rileystephens@escalatorllc.com

<p align="right"><a href="#top">back to top</a></p>


<!-- Project URLS-->
[github-url]: https://github.com/Shed-Enterprises/react-realtime-crypto-prices
[github-issues]: https://github.com/Shed-Enterprises/react-realtime-crypto-prices/issues
[repo-path]: Shed-Enterprises/react-realtime-crypto-prices
[logo-path]: assets/img/logo
[crypto-compare-api-signup]: https://min-api.cryptocompare.com/pricing

<!-- Built With -->
[nodejs]: https://nodejs.org/
[react]: https://www.npmjs.com/package/react
[react-dom]: https://www.npmjs.com/package/react-dom
[cryptocurrency-icons]: https://github.com/spothq/cryptocurrency-icons

<!-- License Badge -->
[license-shield]: https://img.shields.io/github/license/Shed-Enterprises/react-realtime-crypto-prices.svg?style=for-the-badge
[license-url]: https://github.com/Shed-Enterprises/react-realtime-crypto-prices/blob/main/LICENSE.txt

<!-- Version Badge -->
[package-version-shield]: https://img.shields.io/github/package-json/v/Shed-Enterprises/react-realtime-crypto-prices.svg?style=for-the-badge

<!-- Build Status Badge -->
[build-status-shield]: https://img.shields.io/travis/com/Shed-Enterprises/react-realtime-crypto-prices.svg?style=for-the-badge

<!-- Contributors Badge -->
[contributors-shield]: https://img.shields.io/github/contributors/Shed-Enterprises/react-realtime-crypto-prices.svg?style=for-the-badge
[contributors-url]: https://github.com/Shed-Enterprises/react-realtime-crypto-prices/graphs/contributors

<!-- Downloads Badge -->
[npm-monthly-downloads-shield]: https://img.shields.io/npm/dt/react-realtime-crypto-prices?style=for-the-badge
[npm-monthly-downloads-url]: https://www.npmjs.com/package/react-realtime-crypto-prices

<!-- Languages Badge-->
[top-languages-shield]: https://img.shields.io/github/languages/top/Shed-Enterprises/react-realtime-crypto-prices.svg?style=for-the-badge

[languages-count-shield]: https://img.shields.io/github/languages/count/Shed-Enterprises/react-realtime-crypto-prices.svg?style=for-the-badge