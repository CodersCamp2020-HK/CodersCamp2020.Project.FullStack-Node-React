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

const useStyles = makeStyles({
    filterPanel: {
        background: '#770000',
        width: '100%',
        padding: '30px 0',
    },
    radioGroup: {
        display: 'flex',
    },
    input: {
        position: 'absolute',
        zIndex: -100,
        top: 0,
        left: 0,
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});

interface FormState {
    animal: string;
    home: string;
    getAnimals: string;
    getChildren: string;
}

interface Props {
    formState: FormState;
    setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

const FilterPanel = () => {
    const { formState, setFormState } = useContext(FormContex);

    const handleChange = (e: React.ChangeEvent<any>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formState);
    };

    const classes = useStyles();

    return (
        <ThemeProvider theme={localTheme}>
            <div className={classes.filterPanel}>
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
                                <IconWrapper active={formState.animal === 'cat'}>
                                    <Cat
                                        fill={
                                            formState.animal === 'cat'
                                                ? localTheme.palette.secondary.main
                                                : localTheme.palette.primary.main
                                        }
                                    />
                                </IconWrapper>
                                <input
                                    className={classes.input}
                                    type="radio"
                                    name="animal"
                                    id="cat"
                                    value="cat"
                                    checked={formState.animal === 'cat'}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className={classes.label} htmlFor="dog">
                                <Typography align="center" color="primary">
                                    Pies
                                </Typography>
                                <IconWrapper active={formState.animal === 'dog'}>
                                    <Dog
                                        fill={
                                            formState.animal === 'dog'
                                                ? localTheme.palette.secondary.main
                                                : localTheme.palette.primary.main
                                        }
                                    />
                                </IconWrapper>
                                <input
                                    className={classes.input}
                                    type="radio"
                                    name="animal"
                                    id="dog"
                                    value="dog"
                                    checked={formState.animal === 'dog'}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className={classes.label} htmlFor="catDog">
                                <Typography align="center" color="primary">
                                    Obojętnie
                                </Typography>
                                <IconWrapper active={formState.animal === 'catDog'}>
                                    <CatDog
                                        fill={
                                            formState.animal === 'catDog'
                                                ? localTheme.palette.secondary.main
                                                : localTheme.palette.primary.main
                                        }
                                    />
                                </IconWrapper>
                                <input
                                    className={classes.input}
                                    type="radio"
                                    name="animal"
                                    id="catDog"
                                    value="catDog"
                                    checked={formState.animal === 'catDog'}
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
            </div>
        </ThemeProvider>
    );
};

export default FilterPanel;
