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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputs: {
        minWidth: 200,
        margin: '0px 0px 20px 0px',
    },
    paper: {
        minHeight: 'inherit',
        padding: 20,
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

const initialQuery: GetAnimalsQueryParams = {};

const filterData = (data: Record<string, any>) => {
    const optionalData: any = {};
    for (const key in data) {
        if (!data[key] || data[key] === 'unknown') continue;
        optionalData[key] = data[key];
    }
    return optionalData;
};

const Animals = () => {
    const [query, setQuery] = useState<GetAnimalsQueryParams>(initialQuery);
    const [currentPage, setCurrentPage] = useState(1);
    const classes = useStyles();
    const { handleSubmit, control, register } = useForm<GetAnimalsQueryParams>();
    const onSubmit = (data: GetAnimalsQueryParams) => {
        console.log(filterData(data));
        setQuery(filterData(data));
    };
    return (
        <Paper className={classes.paper}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <ThemeProvider theme={localTheme}>
                    <TextField
                        className={classes.inputs}
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
                        className={classes.inputs}
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

                    <FormControl variant="outlined" color="secondary" className={classes.inputs}>
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

                    <FormControl variant="outlined" color="secondary" className={classes.inputs}>
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

                    <FormControl variant="outlined" color="secondary" className={classes.inputs}>
                        <InputLabel id="specie">Gatunek</InputLabel>
                        <Controller
                            control={control}
                            defaultValue="cat"
                            name="specie"
                            label="Gatunek"
                            as={
                                <Select labelId="specie" id="demo-simple-select-outlined" label="Gatunek">
                                    <MenuItem value="cat">Kot</MenuItem>
                                    <MenuItem value="dog">Pies</MenuItem>
                                    <MenuItem value="unknown">Obojętnie</MenuItem>
                                </Select>
                            }
                        />
                    </FormControl>

                    <Controller
                        name="readyForAdoption"
                        control={control}
                        defaultValue={false}
                        render={(props) => (
                            <FormControlLabel
                                className={classes.inputs}
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
                                className={classes.inputs}
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
                                className={classes.inputs}
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
                                className={classes.inputs}
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
                </ThemeProvider>

                <Button className={classes.inputs} size="large" color="secondary" variant="contained" type="submit">
                    Filtruj zwierzaki
                </Button>
            </form>

            <Gallery galleryType={2} query={query} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </Paper>
    );
};

export default Animals;
