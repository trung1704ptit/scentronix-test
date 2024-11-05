"use client";
import { blueGrey } from "@mui/material/colors";
import { CustomThemeOptions } from "@/contexts/theme-provider";

export const themes: CustomThemeOptions = {
  palette: {
    light: {
      primary: {
        main: '#da1a32',
      },
      secondary: {
        main: '#ff4081',
      },
    },
    dark: {
      background: {
        default: blueGrey[900],
        paper: blueGrey[800],
      },
    },
  },
};
