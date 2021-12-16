import { createTheme } from "@mui/material/styles";

const themeConfig = createTheme({
  palette: {
    primary: {
      light: "#77a258",
      main: "#558b2f",
      dark: "#3b6120",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export default themeConfig;
