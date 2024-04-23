import { createTheme } from "@mui/material/styles";

const typography = {
  fontFamily: "Metropolis, sans-serif", // Define Quicksand font family
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
    fontFamily: typography.fontFamily,
    extraBold: {
      fontSize: "3rem",//48
      fontFamily: typography.fontFamily,
      fontWeight: typography.fontWeightExtraBold,
    },
    bold: {
      fontSize: "2.5rem",//40
      fontFamily: typography.fontFamily,
      fontWeight: typography.fontWeightBold,
    },
    semi: {
      fontSize: "2rem",//32
      fontFamily: typography.fontFamily,
      fontWeight: typography.fontWeightSemiBold,
    },
    medium: {
      fontSize: "1.5rem",//24
      fontFamily: typography.fontFamily,
      fontWeight: typography.fontWeightMedium,
    },
    regularMedium: {
        fontSize: "1rem",//16
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeightMedium,
      },
    regular: {
      fontSize: "1rem",//16
      fontFamily: typography.fontFamily,
      fontWeight: typography.fontWeightRegular,
    },
    light: {
      fontSize: "0.5rem",//8
      fontFamily: typography.fontFamily,
      fontWeight: typography.fontWeightRegular,
    },
   
  },
  fontFamily: typography.fontFamily,
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
    white:{
        main:"#FFFFFF"
    }
    // Add more custom colors as needed
  },
});

export default theme;



 // h1: {
    //   fontSize: "2.5rem",
    //   fontWeight: typography.fontWeightBold,
    // },
    // h2: {
    //   fontSize: "2.25rem",
    //   fontWeight: typography.fontWeightBold,
    // },
    // h3: {
    //   fontSize: "2rem",
    //   fontWeight: typography.fontWeightBold,
    // },
    // h4: {
    //   fontSize: "1.75rem",
    //   fontWeight: typography.fontWeightBold,
    // },
    // h5: {
    //   fontSize: "1.5rem",
    //   fontWeight: typography.fontWeightBold,
    // },
    // h6: {
    //   fontSize: "1.25rem",
    //   fontWeight: typography.fontWeightBold,
    // },
    // subtitle1: {
    //   fontSize: "1rem",
    //   fontWeight: typography.fontWeightBold,
    // },
    // subtitle2: {
    //   fontSize: "0.875rem",
    //   fontWeight: typography.fontWeightMedium,
    // },
    // body1: {
    //   fontSize: "1rem",
    //   fontWeight: typography.fontWeightMedium,
    // },
    // body2: {
    //   fontSize: "0.875rem",
    //   fontWeight: typography.fontWeightRegular,
    // },
    // caption: {
    //   fontSize: "0.75rem",
    //   fontWeight: typography.fontWeightRegular,
    // },
    // overline: {
    //   fontSize: "0.625rem",
    //   fontWeight: typography.fontWeightRegular,
    // },