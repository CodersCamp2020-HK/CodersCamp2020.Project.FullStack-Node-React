import React from 'react';
import { Button, Grid, Theme, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { UndoRounded, Menu } from '@material-ui/icons';
import PawIcon404 from './img/PawIcon404';
import CatPhoto from './img/cat1.png';
import DogPhoto from './img/dog1.png';


const Page404 = () => {
   const theme = useTheme<Theme>();
    const useStyle = makeStyles({
        wrapper: {
            marginTop: '5vh',
            '& > *':{
                marginTop: theme.spacing(4)
            }
        },
        paw404: {
            width: '100%',
            height: '100%',
        },
        dogCatPhotos: {
            width: '100%',
            height: '100%',
        },
        photo: {
            width: '100%',
            height: '100%',
            backgroundPosition: 'center',
        }
    });

    const classes = useStyle();

return (
   <Grid spacing={4} container direction="column" item xs={10} sm={8} md={6} lg={4} justify="center" className={classes.wrapper}>
        <Grid item className={classes.paw404}>
            <PawIcon404 color={theme.palette.primary.main} width={140} height={140} colorText='white'/>
         </Grid>
         
         <Typography variant="h6">Strona nie została odnaleziona</Typography>
         <Typography variant="h5">Co tutaj robisz? Zgubiłeś/aś się?</Typography>

         <Button
         variant="outlined" 
         color="primary" 
         size="large"
         fullWidth={true}
         endIcon={<UndoRounded>Go back</UndoRounded>}>
        Wróc do poprzedniej strony
        </Button>

        <Button
         variant="contained" 
         color="primary" 
         size="large"
         fullWidth={true}
         endIcon={<Menu>Go to main page</Menu>}>
        Przejdź do strony głównej
        </Button>

        <Grid item container className={classes.dogCatPhotos} >
            <Grid item xs={2} >
                <img src={CatPhoto} alt="cat photo" className={classes.photo}/>
            </Grid> 
            <Grid item xs={2}>
                <img src={DogPhoto} alt="dog photo" className={classes.photo}/>
            </Grid>     
        </Grid>
   </Grid>
)
}

export default Page404;