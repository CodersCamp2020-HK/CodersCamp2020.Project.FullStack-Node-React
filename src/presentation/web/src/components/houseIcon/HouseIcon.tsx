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

const HouseIcon = () => {
    const classes = useStyles();
    const theme = useTheme<Theme>();
    const iconColor = theme.palette.secondary.contrastText;
    return (
        <div className={classes.root}>
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="24" fill="none" viewBox="0 0 31 24">
                <path
                    fill={iconColor}
                    d="M15.07 6.156L5.6 13.867v8.323c0 .215.086.422.24.574a.827.827 0 00.582.238l5.756-.014a.826.826 0 00.578-.24.808.808 0 00.24-.573v-4.86c0-.216.086-.422.24-.575a.827.827 0 01.581-.238h3.288c.218 0 .427.086.58.238.155.153.241.36.241.575v4.857a.804.804 0 00.24.576.822.822 0 00.582.239l5.754.015a.827.827 0 00.581-.238.808.808 0 00.24-.574v-8.328l-9.467-7.706a.63.63 0 00-.786 0zm14.959 5.241l-4.294-3.499V.864a.606.606 0 00-.18-.43.62.62 0 00-.436-.18h-2.877a.62.62 0 00-.436.18.606.606 0 00-.18.43v3.687l-4.6-3.74a2.483 2.483 0 00-3.132 0L.892 11.397a.611.611 0 00-.197.65.608.608 0 00.114.208l1.31 1.575a.614.614 0 00.417.22.622.622 0 00.452-.138L15.07 4.075a.63.63 0 01.786 0l12.082 9.838a.62.62 0 00.869-.08l1.31-1.575a.608.608 0 00-.088-.86z"
                ></path>
            </svg>
        </div>
    );
};

export default HouseIcon;
