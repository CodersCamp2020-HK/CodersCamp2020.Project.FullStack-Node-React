import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.dark,
        cursor: 'pointer',
    },
}));

const BuildingIcon = () => {
    const classes = useStyles();
    const theme = useTheme<Theme>();
    const iconColor = theme.palette.secondary.contrastText;
    return (
        <div className={classes.root}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" fill="none" viewBox="0 0 22 25">
                <path
                    fill={iconColor}
                    d="M20.898 23.127h-.937V1.752c0-.621-.504-1.125-1.125-1.125H3.086c-.621 0-1.125.504-1.125 1.125v21.375h-.938a.562.562 0 00-.562.563v.937h21v-.938a.562.562 0 00-.563-.562zM6.461 4.189c0-.31.252-.562.562-.562h1.875c.311 0 .563.252.563.562v1.875c0 .311-.252.563-.563.563H7.023a.563.563 0 01-.562-.563V4.19zm0 4.5c0-.31.252-.562.562-.562h1.875c.311 0 .563.252.563.562v1.876c0 .31-.252.562-.563.562H7.023a.563.563 0 01-.562-.563V8.69zm2.437 6.938H7.023a.563.563 0 01-.562-.563V13.19c0-.311.252-.563.562-.563h1.875c.311 0 .563.252.563.563v1.875c0 .31-.252.562-.563.562zm3.563 7.5h-3v-3.938c0-.31.252-.562.562-.562h1.875c.311 0 .563.252.563.563v3.937zm3-8.062c0 .31-.252.562-.563.562h-1.875a.563.563 0 01-.562-.563V13.19c0-.311.252-.563.562-.563h1.875c.311 0 .563.252.563.563v1.875zm0-4.5c0 .31-.252.562-.563.562h-1.875a.563.563 0 01-.562-.563V8.69c0-.31.252-.562.562-.562h1.875c.311 0 .563.252.563.562v1.876zm0-4.5c0 .31-.252.562-.563.562h-1.875a.563.563 0 01-.562-.563V4.19c0-.31.252-.562.562-.562h1.875c.311 0 .563.252.563.562v1.875z"
                ></path>
            </svg>
        </div>
    );
};

export default BuildingIcon;
