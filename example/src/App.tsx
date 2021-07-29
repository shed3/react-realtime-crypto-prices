import React from "react";
import { CryptoPriceProvider } from "react-realtime-crypto-prices";
import { HookExample } from "./HookExampleComponent.tsx";
import "./App.css";

const cryptoCompareApiKey: string =
    process.env.REACT_APP_CRYPTO_COMPARE_API_KEY || "";
function App() {
    return (
        <div className="App">
            <CryptoPriceProvider cryptoCompareApiKey={cryptoCompareApiKey}>
                <HookExample />
            </CryptoPriceProvider>
        </div>
    );
}

export default App;
