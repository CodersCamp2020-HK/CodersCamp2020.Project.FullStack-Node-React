import React from 'react'
import TextField from '@material-ui/core/TextField'

const TextInput = () => {
    return (
        <TextField id="name" color="primary" variant="outlined" label="Imię" size="medium" required />
    )
}

export default TextInput
