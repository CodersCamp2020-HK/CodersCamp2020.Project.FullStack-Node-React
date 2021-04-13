import { FormControl, InputLabel, MenuItem, Select, TextField, Paper } from '@material-ui/core';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

interface IFormInputs {
    species: string;
}

const Animals = () => {
    const { handleSubmit, control } = useForm<IFormInputs>();
    const onSubmit = (data: IFormInputs) => console.log(data);
    return (
        <Paper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <InputLabel id="gatunek">Gatunek</InputLabel>
                    <Controller
                        as={
                            <Select variant="outlined" color="primary">
                                <MenuItem value="cat">kot</MenuItem>
                                <MenuItem value="dog">pies</MenuItem>
                            </Select>
                        }
                        name="species"
                        rules={{ required: 'this is required' }}
                        control={control}
                        defaultValue="cat"
                    />
                </FormControl>
                <button type="submit">Sumbit</button>
            </form>
        </Paper>
    );
};

export default Animals;
