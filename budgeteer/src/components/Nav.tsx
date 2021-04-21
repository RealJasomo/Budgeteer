import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

import Logo from '../res/logo.svg';
import styles from '../css/nav.module.css';

function Nav() {
    const user  = useContext(AuthContext);
    const div = useRef<HTMLDivElement>(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [largeWidth, setLargeWidth] = useState<boolean>(false);

    useEffect(()=>{
        if(window.innerWidth >= 768){
            setLargeWidth(true);
        }
    }, []);

    //handle resizes
    window.addEventListener("resize", () => {
        if(window.innerWidth < 768){
            setLargeWidth(false);
        }else{
            setLargeWidth(true);
            setMenuOpen(false);
        }
    })


    const handleOpenMenu = () =>{
        div?.current?.blur();
        setMenuOpen(!menuOpen);
    }

    return (
        <div className={styles.nav}>
            <div className={styles.menuContainer}>
            <Link to="/" className={styles.logoHeader}>
                <img src={Logo}  className={styles.logo} alt="Budgeteer logo"/>
                <h1 className={styles.logoText}>Budgeteer</h1>
            </Link>
            <i className={`fas ${menuOpen?`fa-times ${styles.black}`:'fa-bars'} ${styles.menuIcon}`} onClick={handleOpenMenu}></i>
            </div>
            <div ref={div} className={`${styles.nav} ${styles.navLinks}`} style={(!menuOpen&&!largeWidth)?{display: "none"}:{display: "flex"}}>
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
             
        </div>
    )
}

export default Nav;
