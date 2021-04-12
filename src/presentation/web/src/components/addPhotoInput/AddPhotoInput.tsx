import React from 'react';
import { Add } from '@material-ui/icons'
import { Fab } from '@material-ui/core';

const AddPhotoInput = () => {
    return (
        <div>
            <Fab color='secondary' component="label">
                <Add />
                <input multiple
                    hidden
                    type="file"
                    accept="image/*" />
            </Fab>
        </div>
    )
}

export default AddPhotoInput;