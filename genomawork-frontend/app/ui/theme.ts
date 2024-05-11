"use client";
import { Montserrat } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const montserrat = Montserrat({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
    fontWeightLight: 100,
    fontWeightMedium: 300,
  },
  palette: {
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    primary: {
      main: "#F5AFE5",
      dark: "#75456A",
    },
  },
});
export default theme;
