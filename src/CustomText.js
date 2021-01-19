import TextField from '@material-ui/core/TextField';

import React from 'react'

export const CustomText = ({...other}) => {
    console.log(other)
    return (
        <TextField  {...other}>
            
        </TextField>
    )
}
