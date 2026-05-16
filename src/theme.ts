// theme.ts
import { createTheme } from "@mui/material/styles";

// const baseColors = {
//   primary: "#1976d2",
//   secondary: "#9c27b0",

//   success: "#2e7d32",
//   error: "#d32f2f",
//   warning: "#ed6c02",
//   info: "#0288d1",

//   background: "#f5f7fa",
//   surface: "#ffffff",

//   textPrimary: "#1a1a1a",
//   textSecondary: "#666666",
// };

// 🌞 Light Theme (MudBlazor style mapping)
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgba(89, 74, 226, 1)",
      light: "rgb(118, 106, 231)",
      dark: "rgb(62, 44, 221)",
    },
    secondary: {
      main: "rgba(255, 64, 129, 1)",
      light: "rgb(255, 102, 153)",
      dark: "rgb(255, 31, 105)",
    },
    success: {
      main: "rgba(0, 200, 83, 1)",
      light: "rgb(0, 235, 98)",
      dark: "rgb(0, 163, 68)",
      contrastText: "#ffffff",
    },
    error: {
      main: "rgba(244, 67, 54, 1)",
      light: "rgb(246, 96, 85)",
      dark: "rgb(242, 28, 13)",
    },
    warning: {
      main: "rgba(255, 152, 0, 1)",
      light: "rgb(255, 167, 36)",
      dark: "rgb(214, 129, 0)",
      contrastText: "#ffffff",
    },
    info: {
      main: "rgba(33, 150, 243, 1)",
      light: "rgb(71, 167, 245)",
      dark: "rgb(12, 128, 223)",
    },
    background: {
      default: "rgba(249, 250, 252, 1)", // page
      paper: "rgba(255, 255, 255, 1)", // cards
    },
    text: {
      primary: "rgba(66, 66, 66, 1)",
      secondary: "rgba(66, 84, 102, 1)",
    },

    common: {
      black: "rgba(17, 14, 45, 1)",
      white: "rgba(255, 255, 255, 1)",
    },

    divider: "rgba(224, 224, 224, 1)",
  },

  // shape: {
  //   borderRadius: 12, // nice modern UI
  // },

  // typography: {
  //   fontFamily: "Inter, Roboto, sans-serif",
  // },
});

// 🌙 Dark Theme (same structure, just swapped values)
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgba(119, 107, 231, 1)",
      light: "rgb(151, 141, 236)",
      dark: "rgb(90, 75, 226)",
    },
    secondary: {
      main: "rgba(255, 64, 129, 1)",
      light: "rgb(255, 102, 153)",
      dark: "rgb(255, 31, 105)",
    },

    success: {
      main: "rgba(11, 186, 131, 1)",
      light: "rgb(13, 222, 156)",
      dark: "rgb(9, 154, 108)",
      contrastText: "#ffffff",
    },
    error: {
      main: "rgba(246, 78, 98, 1)",
      light: "rgb(248, 119, 134)",
      dark: "rgb(244, 47, 70)",
    },
    warning: {
      main: "rgba(255, 168, 0, 1)",
      light: "rgb(255, 182, 36)",
      dark: "rgb(214, 143, 0)",
      contrastText: "#ffffff",
    },
    info: {
      main: "rgba(50, 153, 255, 1)",
      light: "rgb(92, 173, 255)",
      dark: "rgb(10, 133, 255)",
      contrastText: "#ffffff",
    },
    background: {
      default: "rgba(21, 21, 33, 1)", // page
      paper: "rgba(30, 30, 45, 1)", // surface/cards
    },

    text: {
      primary: "rgba(255, 255, 255, 1)",
      secondary: "rgba(146, 146, 159, 1)",
    },

    common: {
      black: "rgba(17, 16, 25, 1)",
      white: "rgba(255, 255, 255, 1)",
    },

    divider: "rgba(92, 92, 106, 1)",
  },

  // shape: {
  //   borderRadius: 12,
  // },

  // typography: {
  //   fontFamily: "Inter, Roboto, sans-serif",
  // },
});
