import React from 'react';
import { Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const MyAccBtn = () => {
    return (
        <Button color="primary" variant="contained" endIcon={<PersonIcon />}>
            Moje konto
        </Button>
    );
};

export default MyAccBtn;
