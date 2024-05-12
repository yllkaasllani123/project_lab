import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette : {
        primary : {
            main: "#6935D3",
            dark: "#5e2fbd",
        },
        background : {
            default: "#F7F7F7",
        }
    },
    typography: {
        fontFamily: 'Roboto Mono, Arial, sans-serif',
    },
});