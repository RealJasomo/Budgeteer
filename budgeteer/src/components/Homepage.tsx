import React from 'react'

import Piggie from '../res/pb.png'

import styles from '../css/home.module.css';

export default function Homepage() {
    return (
        <div className={styles.homepage}>
            <section id={styles.info}>
            <h1>
                Track your spending the easy way
            </h1>
            <p>Set a budget and monitor your account balances and transactions. Simply log your information and we'll handle the rest! Have a shared budget with your friends, family, or anyone else you need. Save better with Budgeteer.</p>
            </section>
            <section id={styles.preview}>
                <img src={Piggie} alt="Piggie bank" />
            </section>
        </div>
    )
}
