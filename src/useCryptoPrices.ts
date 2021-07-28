import { useContext } from 'react';
import CryptoPriceContext from "./CryptoPriceContext";

const useCryptoPrices = () => {
    const priceContext = useContext(CryptoPriceContext);
    const { prices, tickers, streamPrices, streamTickers } = priceContext;

};

export default useCryptoPrices;