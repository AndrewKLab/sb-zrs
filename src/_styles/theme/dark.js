import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#ffcd38 !important",
      main: "#ffc107 !important",
      dark: "#b28704 !importan",
      contrastText: "#424242 !important",
    },
    secondary: {
      light: "#f6685e !important",
      main: "#ef476f !important",
      dark: "#aa2e25 !importan",
      contrastText: "#424242 !important",
    },
    error: {
      light: "#f26b8b !important",
      main: "#f44336 !important",
      dark: "#a7314d !important",
      contrastText: "#fff !important",
    },
    text: {
      primary: "#fff !important",
      light: "#fff !important",
      dark: "#424242 !important"
    },
    border: {
      main: 'rgba(255, 255, 255, 0.12) !important'
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
