import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#FF5F52',
            main: '#C62828',
            dark: '#8E0000',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#48A999',
            main: '#00796B',
            dark: '#004C40',
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
        action: {
            selected: '#bf360c',
        }
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
        },
        MuiRadio: {
            color: 'secondary'
        },
        MuiCheckbox: {
            color: 'secondary'
        },
        MuiFormControlLabel: {
            labelPlacement: 'end',
        },
        MuiGrid: {
            alignItems: 'center',
            justify: 'center',
            // margin: 'normal'
        },
        MuiButtonBase: {
            disableRipple: true,
        }
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
                }
            }
        }
    }
});

export default theme;
