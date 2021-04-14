import React, { useState } from 'react';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Paper,
    Input,
    FormHelperText,
    OutlinedInput,
    Checkbox,
    FormControlLabel,
    Button,
} from '@material-ui/core';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import Gallery from '../components/gallery/Gallery';
import { GetAnimalsQueryParams } from '../client/index';

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formControl: { width: 200 },
    textField: { width: 200 },
    checkbox: {
        width: 200,
        margin: 0,
    },
});

const localTheme = createMuiTheme({
    palette: {
        secondary: {
            main: '#00796B',
        },
    },
    overrides: {
        MuiSelect: {
            select: {
                '&:focus': {
                    borderRadius: 20,
                },
            },
        },
        MuiOutlinedInput: {
            root: {
                borderRadius: 20,
            },
        },
        MuiButton: {
            root: {},
        },
    },
});

const initialQuery: GetAnimalsQueryParams = {
    specie: 'cat',
    // minAge: 1,
    // maxAge: 100,
    // readyForAdoption: true,
    // temporaryHome: false,
    // acceptsOtherAnimals: false,
    // activeLevel: 'medium',
    size: 'small',
};

const Animals = () => {
    const [query, setQuery] = useState<GetAnimalsQueryParams>(initialQuery);
    const [currentPage, setCurrentPage] = useState(1);
    const classes = useStyles();
    const { handleSubmit, control, register } = useForm<GetAnimalsQueryParams>();
    const onSubmit = (data: GetAnimalsQueryParams) => {
        setQuery(data);
    };
    return (
        <Paper>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <ThemeProvider theme={localTheme}>
                    <TextField
                        className={classes.textField}
                        color="secondary"
                        id="minAge"
                        name="minAge"
                        label="Minimalny wiek"
                        type="number"
                        defaultValue={1}
                        inputRef={register({
                            required: true,
                            valueAsNumber: true,
                        })}
                        InputProps={{
                            inputProps: {
                                max: 100,
                                min: 1,
                            },
                        }}
                        variant="outlined"
                    />
                    <TextField
                        className={classes.textField}
                        color="secondary"
                        id="maxAge"
                        name="maxAge"
                        label="Maksymalny wiek"
                        type="number"
                        defaultValue={10}
                        inputRef={register({
                            required: true,
                            valueAsNumber: true,
                        })}
                        InputProps={{
                            inputProps: {
                                max: 100,
                                min: 1,
                            },
                        }}
                        variant="outlined"
                    />
                    <Controller
                        name="readyForAdoption"
                        control={control}
                        defaultValue={false}
                        render={(props) => (
                            <FormControlLabel
                                className={classes.checkbox}
                                control={
                                    <Checkbox
                                        onChange={(e) => props.onChange(e.target.checked)}
                                        checked={props.value}
                                    />
                                }
                                label="Gotowy do adopcji"
                            />
                        )}
                    />

                    <Controller
                        name="temporaryHome"
                        control={control}
                        defaultValue={false}
                        render={(props) => (
                            <FormControlLabel
                                className={classes.checkbox}
                                control={
                                    <Checkbox
                                        onChange={(e) => props.onChange(e.target.checked)}
                                        checked={props.value}
                                    />
                                }
                                label="Dom tymczasowy"
                            />
                        )}
                    />
                    <Controller
                        name="acceptsKids"
                        control={control}
                        defaultValue={false}
                        render={(props) => (
                            <FormControlLabel
                                className={classes.checkbox}
                                control={
                                    <Checkbox
                                        onChange={(e) => props.onChange(e.target.checked)}
                                        checked={props.value}
                                    />
                                }
                                label="Akceptuje dzieci"
                            />
                        )}
                    />

                    <Controller
                        name="acceptsOtherAnimals"
                        control={control}
                        defaultValue={false}
                        render={(props) => (
                            <FormControlLabel
                                className={classes.checkbox}
                                control={
                                    <Checkbox
                                        onChange={(e) => props.onChange(e.target.checked)}
                                        checked={props.value}
                                    />
                                }
                                label="Akceptuje inne zwierzęta"
                            />
                        )}
                    />

                    <FormControl variant="outlined" color="secondary" className={classes.formControl}>
                        <InputLabel id="activeLevel">Poziom aktywności</InputLabel>
                        <Controller
                            control={control}
                            defaultValue="low"
                            name="activeLevel"
                            label="Poziom aktywności"
                            as={
                                <Select
                                    labelId="activeLevel"
                                    id="demo-simple-select-outlined"
                                    label="Poziom aktywności"
                                >
                                    <MenuItem value="low">Niski</MenuItem>
                                    <MenuItem value="medium">Średni</MenuItem>
                                    <MenuItem value="high">Wysoki</MenuItem>
                                    <MenuItem value="unknown">Nieznany</MenuItem>
                                </Select>
                            }
                        />
                    </FormControl>

                    <FormControl variant="outlined" color="secondary" className={classes.formControl}>
                        <InputLabel id="size">Rozmiar</InputLabel>
                        <Controller
                            control={control}
                            defaultValue="small"
                            name="size"
                            label="Rozmiar"
                            as={
                                <Select labelId="size" id="demo-simple-select-outlined" label="Rozmiar">
                                    <MenuItem value="small">Mały</MenuItem>
                                    <MenuItem value="medium">Średni</MenuItem>
                                    <MenuItem value="large">Duży</MenuItem>
                                    <MenuItem value="unknown">Nieznany</MenuItem>
                                </Select>
                            }
                        />
                    </FormControl>

                    <FormControl variant="outlined" color="secondary" className={classes.formControl}>
                        <InputLabel id="specie">Gatunek</InputLabel>
                        <Controller
                            control={control}
                            defaultValue="Cat"
                            name="specie"
                            label="Gatunek"
                            as={
                                <Select labelId="specie" id="demo-simple-select-outlined" label="Gatunek">
                                    <MenuItem value="Cat">Cat</MenuItem>
                                    <MenuItem value="Dog">Dog</MenuItem>
                                </Select>
                            }
                        />
                    </FormControl>
                </ThemeProvider>

                <Button size="large" color="secondary" variant="contained" type="submit">
                    Filtruj zwierzaki
                </Button>
            </form>

            <Gallery galleryType={2} query={query} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </Paper>
    );
};

export default Animals;
