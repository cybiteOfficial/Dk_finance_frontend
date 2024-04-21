
import { createTheme } from '@mui/material/styles';

const typography = {
    fontFamily: 'Quicksand, sans-serif', // Define Quicksand font family
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
};

const breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
};


export const theme = createTheme({
    breakpoints: {
        values: breakpoints,
    },
    typography: {
        fontFamily: typography.fontFamily,
        h1: {
            fontSize: '2.5rem',
            fontWeight: typography.fontWeightBold,
        },
        h2: {
            fontSize: '2.25rem',
            fontWeight: typography.fontWeightBold,
        },
        h3: {
            fontSize: '2rem',
            fontWeight: typography.fontWeightBold,
        },
        h4: {
            fontSize: '1.75rem',
            fontWeight: typography.fontWeightBold,
        },
        h5: {
            fontSize: '1.5rem',
            fontWeight: typography.fontWeightBold,
        },
        h6: {
            fontSize: '1.25rem',
            fontWeight: typography.fontWeightBold,
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: typography.fontWeightBold,
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: typography.fontWeightMedium,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: typography.fontWeightMedium,
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: typography.fontWeightRegular,
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: typography.fontWeightRegular,
        },
        overline: {
            fontSize: '0.625rem',
            fontWeight: typography.fontWeightRegular,
        },
    },
    fontFamily: 'Roboto, Arial, sans-serif',
    palette: {
        primary: {
            main: '#7A306C', // purple
          },
          secondary: {
            main: '#F15A22', // Orange
          },
        // Define custom colors
        customColor1: {
            main: '#A067A2', // Custom color 1
        },
        customColor2: {
            main: '#2274A5', // Custom color 2
            textMain:"#efefef"
        },
       
        // Add more custom colors as needed
    },
});

export default theme;
