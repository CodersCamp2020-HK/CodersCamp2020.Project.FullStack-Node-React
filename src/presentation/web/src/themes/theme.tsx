import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#f9683a',
            main: '#bf360c',
            dark: '#870000',
        },
        secondary: {
            light: '#B4A647',
            main: '#827717',
            dark: '#524C00',
        },
        common: {
            white: '#FFFDF6'
        },
        text: {
            secondary: 'rgba(0, 0, 0, 0.54)'
        },
    },
    props: {
        MuiLink: {
            underline: 'none',
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
    },
});

// typography {
//     subtitle2: {
//         fontFamily: [
//             'Roboto'
//         ],
//         fontSize: 14,
//         fontStyle: 'normal',
//         fontWeight: 500,
        
//     }
// },

export default theme;
