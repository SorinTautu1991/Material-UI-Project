import { createTheme } from "@material-ui/core/styles";

const arcBlue = "#2196f3";
const arcOrange = "#ffb74d";

const theme = createTheme({
  palette: {
    common: { blue: `${arcBlue}`, orange: `${arcOrange}` },
    primary: {
      main: `${arcBlue}`,
    },
    secondary: {
      main: `${arcOrange}`,
    },
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: "700",
      fontSize: "1rem",
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white",
    },
  },
});
export default theme;
