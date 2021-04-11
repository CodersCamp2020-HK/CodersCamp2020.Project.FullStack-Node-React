import { Box, Theme, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    const theme = useTheme<Theme>();
    return (
            <Box boxShadow={1} bgcolor={theme.palette.common} component='footer' className={styles.footer}>
                <div className={styles.footerColumn}>
                    <Typography color='textSecondary' variant='subtitle2'>Telefon:</Typography>
                    <Typography color='textSecondary' variant='subtitle2'>111-222-333</Typography>
                </div>
                <div className={styles.footerColumn}>
                    <Typography color='textSecondary' variant='subtitle2'>E-mail:</Typography>
                    <Typography color='textSecondary' variant='subtitle2'>schronisko@schronisko-zlapki.com</Typography>
                </div>
                <div className={styles.footerColumn}>
                    <Typography color='textSecondary' variant='subtitle2'>Adres: ul. Pieska 10</Typography>
                    <Typography color='textSecondary' variant='subtitle2'>00-000 Psary</Typography>
                </div>
            </Box>
    );
};

export default Footer;
