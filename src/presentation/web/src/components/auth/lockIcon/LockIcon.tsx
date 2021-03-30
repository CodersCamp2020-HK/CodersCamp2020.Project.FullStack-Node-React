import React from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SvgIcon from '@material-ui/core/SvgIcon'
import { Theme, useTheme, makeStyles } from '@material-ui/core';

const theme = useTheme<Theme>();
const useStyle = makeStyles({
    lockBackground: {
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: 90,
        padding: 8,
        marginBottom: 10
    },
    lockIcon: {
        color: '#FFF',
        opacity: .87,
    },
})

const LockIcon: React.FC = () => {
    const classes = useStyle();

    return (
        <SvgIcon className={classes.lockBackground}>
            <LockOutlinedIcon className={classes.lockIcon} />
        </SvgIcon>
    )
}

export default LockIcon
