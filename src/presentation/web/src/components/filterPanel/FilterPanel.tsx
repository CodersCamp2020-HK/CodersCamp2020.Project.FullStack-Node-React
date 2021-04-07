import React, { FormEvent, useState, useContext } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { ReactComponent as Cat } from './icons/CatIcon.svg';
import { ReactComponent as Dog } from './icons/DogIcon.svg';
import { ReactComponent as CatDog } from './icons/CatDog.svg';
import { ReactComponent as Building } from './icons/Building.svg';
import { ReactComponent as House } from './icons/House.svg';
import Typography from '@material-ui/core/Typography';
import IconWrapper from './IconWrapper';
import { localTheme } from './LocalTheme';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { FormContex } from '../../pages/Home';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
    filterPanel: {
        background: '#770000',
        padding: '30px 0',
    },
    radioGroup: {
        display: 'flex',
    },
    input: {
        position: 'absolute',
        zIndex: -100,
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        position: 'relative',
    },
});

const FilterPanel = () => {
    const { formState, setFormState, handleSubmit } = useContext(FormContex);

    const handleChange = (e: React.ChangeEvent<any>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const classes = useStyles();

    return (
        <ThemeProvider theme={localTheme}>
            <div className={classes.filterPanel}>
                <Container>
                    <form onSubmit={handleSubmit}>
                        <Typography gutterBottom align="center" variant="h4" color="primary">
                            Znajdź i zaadoptuj
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid
                                item
                                container
                                xs={12}
                                sm={6}
                                md={3}
                                lg={3}
                                justify="center"
                                alignItems="center"
                                className={classes.radioGroup}
                            >
                                <label className={classes.label} htmlFor="cat">
                                    <Typography align="center" color="primary">
                                        Kot
                                    </Typography>
                                    <IconWrapper active={formState.specie === 'cat'}>
                                        <Cat
                                            fill={
                                                formState.specie === 'cat'
                                                    ? localTheme.palette.secondary.main
                                                    : localTheme.palette.primary.main
                                            }
                                        />
                                    </IconWrapper>
                                    <input
                                        className={classes.input}
                                        type="radio"
                                        name="specie"
                                        id="cat"
                                        value="cat"
                                        checked={formState.specie === 'cat'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className={classes.label} htmlFor="dog">
                                    <Typography align="center" color="primary">
                                        Pies
                                    </Typography>
                                    <IconWrapper active={formState.specie === 'dog'}>
                                        <Dog
                                            fill={
                                                formState.specie === 'dog'
                                                    ? localTheme.palette.secondary.main
                                                    : localTheme.palette.primary.main
                                            }
                                        />
                                    </IconWrapper>
                                    <input
                                        className={classes.input}
                                        type="radio"
                                        name="specie"
                                        id="dog"
                                        value="dog"
                                        checked={formState.specie === 'dog'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className={classes.label} htmlFor="catDog">
                                    <Typography align="center" color="primary">
                                        Obojętnie
                                    </Typography>
                                    <IconWrapper active={formState.specie === 'catDog'}>
                                        <CatDog
                                            fill={
                                                formState.specie === 'catDog'
                                                    ? localTheme.palette.secondary.main
                                                    : localTheme.palette.primary.main
                                            }
                                        />
                                    </IconWrapper>
                                    <input
                                        className={classes.input}
                                        type="radio"
                                        name="specie"
                                        id="catDog"
                                        value="catDog"
                                        checked={formState.specie === 'catDog'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </Grid>
                            <Grid
                                item
                                container
                                xs={12}
                                sm={6}
                                md={3}
                                lg={3}
                                justify="center"
                                alignItems="center"
                                className={classes.radioGroup}
                            >
                                <label className={classes.label} htmlFor="building">
                                    <Typography align="center" color="primary">
                                        Mieszkanie
                                    </Typography>
                                    <IconWrapper active={formState.home === 'building'}>
                                        <Building
                                            fill={
                                                formState.home === 'building'
                                                    ? localTheme.palette.secondary.main
                                                    : localTheme.palette.primary.main
                                            }
                                        />
                                    </IconWrapper>
                                    <input
                                        className={classes.input}
                                        type="radio"
                                        name="home"
                                        id="building"
                                        value="building"
                                        checked={formState.home === 'building'}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className={classes.label} htmlFor="house">
                                    <Typography align="center" color="primary">
                                        Dom
                                    </Typography>
                                    <IconWrapper active={formState.home === 'house'}>
                                        <House
                                            fill={
                                                formState.home === 'house'
                                                    ? localTheme.palette.secondary.main
                                                    : localTheme.palette.primary.main
                                            }
                                        />
                                    </IconWrapper>
                                    <input
                                        className={classes.input}
                                        type="radio"
                                        name="home"
                                        id="house"
                                        value={'house'}
                                        checked={formState.home === 'house'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </Grid>
                            <Grid item container xs={12} sm={6} md={3} lg={2} justify="center" alignItems="baseline">
                                <FormControl margin="normal">
                                    <InputLabel id="getAnimals">Zwierzęta</InputLabel>
                                    <Select
                                        name="getAnimals"
                                        labelId="getAnimals"
                                        id="getAnimals"
                                        value={formState.getAnimals}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Nie mam zwierząt">Nie mam zwierząt</MenuItem>
                                        <MenuItem value="Mam zwierzęta">Mam zwierzęta</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item container xs={12} sm={6} md={3} lg={2} justify="center" alignItems="baseline">
                                <FormControl margin="normal">
                                    <InputLabel id="getChildren">Dzieci</InputLabel>
                                    <Select
                                        name="getChildren"
                                        labelId="getChildren"
                                        id="getChildren"
                                        value={formState.getChildren}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Nie mam dzieci">Nie mam dzieci</MenuItem>
                                        <MenuItem value="Mam dzieci">Mam dzieci</MenuItem>
                                    </Select>
                                    <FormHelperText>poniżej 15 roku życia</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item container xs={12} lg={2} justify="center" alignItems="center">
                                <Button color="primary" variant="contained" type="submit">
                                    Filtruj zwierzaki
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default FilterPanel;
