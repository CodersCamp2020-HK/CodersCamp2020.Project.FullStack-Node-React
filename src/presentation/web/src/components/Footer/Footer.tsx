import React from 'react';
import styles from './Footer.module.css';
import { Typography, Box } from '@material-ui/core';

const Footer = () => {
    return (
            <Box boxShadow={8} p={18}>
            <footer className={styles.footer}>
                <div className={styles.footerColumn}>
                    <Typography color='textSecondary' variant='subtitle2'>Telefon:</Typography>
                    <Typography color='textSecondary' variant='subtitle2'>111-222-333</Typography>
                </div>
                <div className={styles.footerColumn}>
                    <Typography color='textSecondary' variant='subtitle2'>E-mail:</Typography>
                    <Typography variant='subtitle2'>schronisko@schronisko-zlapki.com</Typography>
                </div>
                <div className={styles.footerColumn}>
                    <Typography color='textSecondary' variant='subtitle2'>Adres: ul. Pieska 10</Typography>
                    <Typography color='textSecondary' variant='subtitle2'>00-000 Psary</Typography>
                </div>
            </footer>
            </Box>
    );
};

export default Footer;
