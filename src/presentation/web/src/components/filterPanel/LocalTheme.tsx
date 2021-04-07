import { createMuiTheme } from '@material-ui/core/styles';

export const localTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
            contrastText: '#770000',
        },
        secondary: {
            main: '#770000',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 540,
            md: 1010,
            lg: 1280,
            xl: 1920,
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
        MuiInputLabel: {
            root: {
                color: '#ffffff',
                '&$focused': {
                    color: '#ffffff',
                },
            },
        },
        MuiInputBase: {
            root: {
                color: '#ffffff',
            },
        },
        MuiInput: {
            underline: {
                '&::before': {
                    borderBottom: '1px solid #ffffff',
                },
                '&::after': {
                    borderBottom: '2px solid #ffffff',
                },
                '&:hover:not($disabled):before': {
                    borderBottom: '2px solid #ffffff',
                },
            },
        },
        MuiSelect: {
            icon: {
                color: '#ffffff',
            },
        },
        MuiFormHelperText: {
            root: {
                color: '#ffffff',
            },
        },
    },
});
