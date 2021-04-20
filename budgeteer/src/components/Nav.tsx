import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

import Logo from '../res/logo.svg';
import styles from '../css/nav.module.css';

function Nav() {
    const user  = useContext(AuthContext);
    return (
        <div className={styles.nav}>
            <div className={styles.menuContainer}>
            <Link to="/" className={styles.logoHeader}>
                <img src={Logo}  className={styles.logo} alt="Budgeteer logo"/>
                <h1 className={styles.logoText}>Budgeteer</h1>
            </Link>
            <i className={`fas fa-bars ${styles.menuIcon}`}></i>
            </div>
            <Link to="/about" className={styles.navLink}> How it works</Link>
            <Link to="/faq" className={`${styles.navLink} ${styles.navBreak}`}>FAQ</Link>
            {user.loaded&&user.user ?
                    <>
                        <button type="button" className={styles.logout}>Logout</button>
                    </>
                    :<>
                        <button type="button" className={styles.register}>Sign up</button>
                        <button type="button" className={styles.login}>Login</button>
                    </>}
             
        </div>
    )
}

export default Nav;
