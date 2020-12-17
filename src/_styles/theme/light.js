import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            light: "#4dabf5 !important",
            main: "#2196f3 !important",
            contrastText: "#fff !important",
        },
        secondary: {
            light: "#4dabf5 !important",
            main: "#43a047 !important",
            contrastText: "#fff !important",
        },
        error: {
            light: "rgb(253, 236, 234) !important",
            main: "#f44336 !important",
            dark: "#d32f2f !important",
            contrastText: "rgb(97, 26, 21) !important",
        },
        text: {
            primary: "#424242 !important",
            light: "#fff !important",
            dark: "#424242 !important"
        },
        border: {
            main: 'rgba(0, 0, 0, 0.12) !important'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 786,
            md: 992,
            lg: 1200,
            xl: 1920,
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

export default theme
