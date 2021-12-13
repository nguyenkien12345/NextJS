import React from 'react';
import styles from './Coins.module.css';
import Link from 'next/link';

function CoinItem({coin}) {
    return (
        <Link href='/coin/[id]' as={`/coin/${coin.id}`}>
            <a>
                <div className={styles.coin_container}>
                    <div className={styles.coin_row}>
                        <div className={styles.coin}>
                            <img src={coin.image} alt={coin.name} className={styles.coin_img}/>
                            <h1 className={styles.coin_h1}>{coin.name}</h1>
                            <p className={styles.coin_symbol}>{coin.symbol}</p>
                        </div>
                        <div className={styles.coin_data}>
                            <p className={styles.coin_price}>${coin.current_price}</p>
                            <p className={styles.coin_volume}>${coin.total_volume.toLocaleString()}</p>
                            {
                            coin.price_change_24h < 0 
                            ? (<p className={styles.coin_percent, styles.red}>{coin.price_change_24h.toFixed(2)}%</p>)
                            : (<p className={styles.coin_percent, styles.green}>{coin.price_change_24h.toFixed(2)}%</p>)
                            }
                            <p className={styles.coin_marketcap}>
                                Mkt Cap: ${coin.market_cap_change_24h.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default CoinItem
