import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import UnderConstruction from '../assets/under-construction.jpg';
import GridContainer from '../components/gridContainer/GridContainer';

const useStyles = makeStyles({
    photo: {
        height: '70vh',
    },
    text: {
        textAlign: 'center',
    },
});
const PageInProgress = () => {
    const styles = useStyles();
    return (
        <GridContainer marginBottom={0} marginTop={0} spacing={0} align="center" justify="center">
            <img className={styles.photo} alt="Work in progress" src={UnderConstruction} />
            {/* <Typography className={styles.text} variant="h3">
                Strona w budowie! Zajrzyj później :)
            </Typography> */}
        </GridContainer>
    );
};

export default PageInProgress;
