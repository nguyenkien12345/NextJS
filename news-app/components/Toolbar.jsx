import { useRouter } from 'next/router';
import React from 'react';
import styles from '../styles/Toolbar.module.css';

function Toolbar() {

    const router = useRouter();

    return (
        <div className={styles.main}>
            <div onClick={() => router.push('/')}>Home</div>
            <div onClick={() => router.push('/feed/1')}>Feed</div>
            <div onClick={() => router.push('/eom/eom')}>EOM</div>
            <div onClick={() => window.location.href = 'https://www.facebook.com/'}>Facebook</div>
        </div>
    )
}

export default Toolbar;
