import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
            <footer className={styles.footer}>
                <div className={styles.footerColumn}>
                    <span>Telefon:</span>
                    <span>111-222-333</span>
                </div>
                <div className={styles.footerColumn}>
                    <span>E-mail:</span>
                    <span>schronisko@schronisko-zlapki.com</span>
                </div>
                <div className={styles.footerColumn}>
                    <span>Adres: ul. Pieska 10</span>
                    <span>00-000 Psary</span>
                </div>
            </footer>
    );
};

export default Footer;
