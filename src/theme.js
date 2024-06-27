import { createTheme } from "@mui/material/styles";


export const weights = {
  fontFamily: "Quicksand, sans-serif", // Define Quicksand font family
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 700,
  fontWeightBold: 700,
  fontWeightExtraBold: 800,
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
    fontFamily: weights.fontFamily,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h1: {
        fontSize: 50,
    },
    h2: {
        fontSize: 40,
    },
    h3: {
        fontSize: 35,
    },
    h4: {
        fontSize: 32,
    },
    h5: {
        fontSize: 30,
    },
    h6: {
        fontSize: 28,
    },
    subtitle1: {
        fontSize: 24,
    },
    subtitle2: {
        fontSize: 22,
    },
    body1: {
        fontSize: 18,
    },
    body2: {
        fontSize: 16
    },
    caption: {
        fontSize: 14
    }
},
 
  palette: {
    primary: {
      main: "#7A306C", // purple
    },
    secondary: {
      main: "#95598A",
    },
    lightSecondary: {
      main: "#AF83A7",
    },
    lightSecondaryV1: {
      main: "#CAACC5",
    },
    lightSecondaryV2: {
      main: "#E4D6E2",
    },
    lightSecondaryV3: {
      main: "#F2EAF0",
    },
    lightSecondaryV4: {
      main: "#F8F5F8",
    },
    black: {
      main: "#0C0C0C",
    },
    blackFade: {
      main: "#4C4C4C",
    },
    white: {
      main: "#FFFFFF",
    }
    // Add more custom colors as needed
  },
});


