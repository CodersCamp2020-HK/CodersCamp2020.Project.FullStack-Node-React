import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#f9683a',
            main: '#bf360c',
            dark: '#870000',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#B4A647',
            main: '#827717',
            dark: '#524C00',
        },
        common: {
            white: '#FFFDF6',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
        },
        background: {
            default: '#FFFDF6',
        },
    },
    props: {
        MuiLink: {
            underline: 'none',
        },
        MuiTextField: {
            color: 'secondary',
            variant: 'outlined',
            size: 'medium',
            fullWidth: true,
            margin: 'normal',
        },
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: 18,
            },
            sizeSmall: {
                borderRadius: 15,
            },
            sizeLarge: {
                borderRadius: 21,
            },
        },
        MuiTextField: {
            root: {
                '& fieldset': {
                    borderRadius: 15,
                },
            },
        },
    },
});

export default theme;
