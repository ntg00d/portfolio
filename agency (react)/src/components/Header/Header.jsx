import React from 'react'
import styles from './Header.module.css'
import logoImg from '../../img/logo.svg'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.header__inner}>
                    <div className={styles.header__logo}>
                        <img src={logoImg} alt="logo"/>
                        Agency
                    </div>
                    <nav className={styles.header__nav}>
                        {['About', 'Services', 'Pricing', 'Blog'].map(el => (
                            <button key={el}>{el}</button>
                        ))}
                    </nav>
                    <button className={styles.header__contact}>Contact</button>
                </div>

                <div className={styles.header__intro}>
                    <h1>Portfolio</h1>
                    <h5>Agency provides a full service range including technical skills, design, business understanding.</h5>
                </div>
            </div>
        </header>
    )
}

export default Header