import React from 'react';
import { Grid, makeStyles, Paper, SvgIcon, Theme, Typography } from '@material-ui/core';
import { DoneOutline } from '@material-ui/icons';


const useStyle = makeStyles((theme: Theme) => ({
    margin: {
        marginTop: '1rem',
    },
    icon:{
        color: '#FFF',
        opacity: 0.87
    },
    iconWrapper: {
        marginTop: '1rem',
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: 90,
        padding: 8,
    },
}))

const Invitation = () => {
    const classes = useStyle();
    
    return(
        <Grid item xs={12} md={6}>
                <SvgIcon className={classes.iconWrapper} >
                    <DoneOutline className={classes.icon} ></DoneOutline>
                </SvgIcon>
                <Typography variant='h5' align='center' className={classes.margin}>Gratulacje!</Typography>
                <Typography variant='subtitle1' align='center' className={classes.margin} style={{whiteSpace: 'pre-line'}}>
                    {`Przeszedłeś już prawie cały proces adopcyjny. 
                    Zostało Ci jedynie podpisanie umowy adopcyjnej.
                    Przyjdź do schroniska i zakończ cały proces`}
                </Typography>
                <Typography variant='subtitle1' align='center' className={classes.margin} style={{whiteSpace: 'pre-line'}}>
                    {` Pamiętaj, żeby wziąć ze sobą:
                    -smycz
                    -obrożę
                    -kaganiec ( w przypadku dużych psów )
                    -dowód osobisty
                    -transporter (do adopcji kota)
                    `}
                    </Typography>
        </Grid>
    )
};

export default Invitation;

