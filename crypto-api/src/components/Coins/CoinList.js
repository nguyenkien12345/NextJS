import React from 'react';
import CoinItem from './CoinItem';

function CoinList({coins}) {
    return (
        <>
            {coins.map((coin,index) => (
                <CoinItem key={index} coin={coin}/>
            ))}
        </>
    )
}

export default CoinList;
