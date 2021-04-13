import React from "react";
import { makeStyles } from '@material-ui/styles';
import theme from '../../themes/theme';
import { Grid, Hidden, Paper, Typography } from "@material-ui/core";
import GridContainer from "../gridContainer/GridContainer";
import dogs from "./img/dogs3.png";
import founder from "./img/founder.jpg";
import person1 from "./img/person1.jpg";
import person2 from "./img/person2.jpg";
import person3 from "./img/person3.jpg";
import person4 from "./img/person4.jpg";
import AnimationPaws from "../animationPaws/AnimationPaws";

const useStyles = makeStyles({
    mainGrid: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'space-evenly',
        alignItems: 'space-evenly',
    },
    mainWrapper: {
        backgroundColor: theme.palette.background.paper,
        padding: '0 2rem 2rem 2rem',
    },
    text: {
        textAlign: 'center',
        paddingTop: '1rem',
    },
    dogsWrapper: {
    },
    dogPhoto: {
        backgroundImage: `url(${dogs})`,
        height: 300,
        width: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
    },
    personWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        textAlign: 'center',
    },
    person: {
        width: 150,
        height: 150,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        marginBottom: '1rem',
    },
    founder: {
        backgroundImage: `url(${founder})`,
    },
    firstPerson: {
        backgroundImage: `url(${person1})`,
    },
    secondPerson: {
        backgroundImage: `url(${person2})`,
    },
    thirdPerson: {
        backgroundImage: `url(${person3})`,
    },
    fourthPerson: {
        backgroundImage: `url(${person4})`,
    },
    photoWithDescrip: {
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        marginTop: '2rem',
    }
});

const AboutUs: React.FC = () => {
    const classes = useStyles();
    return (
        <GridContainer align={'center'} justify={'space-around'} spacing={2}>
            <Grid item xs={1}>
                <Hidden xsDown>
                    <AnimationPaws />
                </Hidden>
            </Grid>
            <Grid container item xs={10}>
                <Grid item xs={12} className={classes.dogsWrapper}>
                    <div className={classes.dogPhoto}></div>
                </Grid>
                <Paper className={classes.mainWrapper} variant="outlined">
                    <div className={classes.section}>
                        <Typography className={classes.text} variant='h2'>O nas!</Typography>
                        <Typography className={classes.text} variant={'body1'}>Schronisko Złapki dla bezdomnych zwierząt w Psarach znajduje się przy ulicy Głównej 50c i zostało założone w latach dziewięćdziesiątych XX wieku.</Typography>
                        <Typography className={classes.text} variant={'body1'}>W schronisku pracują obecnie opiekunowie psów i kotów, lekarze i technicy weterynarii, osoby biurowe oraz kierownik. Pracujemy w systemie zmianowym, opiekunowie psów przez całą dobę.</Typography>
                    </div>
                    <div>
                        <Typography className={classes.text} variant="h4">Główny cel</Typography>
                        <Typography className={classes.text} variant={'body1'}>Naszym celem jest uczynienie schronisk pierwszym miejscem, w którym potencjalni adoptujący zwracają się, szukając nowego zwierzaka, zapewniając, że wszystkie zdrowe i uleczalne zwierzęta znajdą kochające domy. Robimy to, przełamując błędne przekonania dotyczące zwierząt domowych w schronisku i zachowując wyjątkową więź między każdym zwierzęciem ze schroniska a opiekunem.</Typography>
                        <Typography className={classes.text} variant={'body1'}>Psy, koty – zagubione, porzucone czy odebrane interwencyjnie właścielom – znajdują u nas swój tymczasowy dom. I czekają na nowy, lepszy. Zapewniamy im opiekę i pomoc weterynaryjną.</Typography>
                        <Typography className={classes.text} variant={'body1'}>Wszystkie zwierzęta w schronisku są zaszczepione (psy także na wściekliznę), odrobaczone i zaczipowane, a także wysterylizowane i wykastrowane. Jeśli ktoś adoptuje kociego czy psiego malucha, jeszcze przed kastracją czy sterylizacją, po jakimś czasie może przyjechać na bezpłatny zabieg.</Typography>
                    </div>
                    <div className={classes.section}>
                        <Typography variant="h4" className={classes.text}>Poznaj nasz zespół</Typography>
                        <div className={classes.personWrapper}>
                            <div className={classes.photoWithDescrip}>
                                <div className={`${classes.founder} ${classes.person}`}></div>
                                <Typography variant="h5">Mateusz</Typography>
                                <Typography variant="body1">Kierownik</Typography>
                            </div>
                            <div className={classes.photoWithDescrip}>
                                <div className={`${classes.firstPerson} ${classes.person}`}></div>
                                <Typography variant="h5">Katarzyna</Typography>
                                <Typography variant="body1">Obsługa klienta</Typography>
                            </div>
                            <div className={classes.photoWithDescrip}>
                                <div className={`${classes.thirdPerson} ${classes.person}`}></div>
                                <Typography variant="h5">Alicja</Typography>
                                <Typography variant="body1">Lekarz weterynarii</Typography>
                            </div>
                            <div className={classes.photoWithDescrip}>
                                <div className={`${classes.secondPerson} ${classes.person}`}></div>
                                <Typography variant="h5">Maja</Typography>
                                <Typography variant="body1">Technik weterynarii</Typography>
                            </div>
                            <div className={classes.photoWithDescrip}>
                                <div className={`${classes.fourthPerson} ${classes.person}`}></div>
                                <Typography variant="h5">Marek</Typography>
                                <Typography variant="body1">Główny opiekun zwierząt</Typography>
                            </div>
                        </div>
                    </div>
                    <div className={classes.section}>
                        <Typography className={classes.text} variant="h5">Czy możesz zaoferować kochający dom zwierzęciu znajdującemu się pod naszą opieką?</Typography>
                        <Typography className={classes.text} variant="h5">Każdego roku ratujemy, rehabilitujemy i wprowadzamy do domu setki zwierząt. Czy mógłbyś dać dom uratowanemu zwierzęciu?</Typography>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={1}>
                <Hidden xsDown>
                    <AnimationPaws />
                </Hidden>
            </Grid>
        </GridContainer>
    );
};

export default AboutUs;