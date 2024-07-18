import { ThemeConfig } from "antd";
import colors from "./colors";
import { createTheme } from "@mui/material";

export const antdTheme: ThemeConfig = {
  token: {
    //colors
    colorPrimary: colors["primary-color"],
    colorPrimaryTextHover: colors["violet-base"],
    colorLinkHover: colors["violet-base"],
    colorPrimaryTextActive: colors["violet-base"],
    colorLink: colors["primary-color"],
    controlItemBgActive: colors["primary-color-light"],
    colorPrimaryText: "#fff",
    colorText: "#000",
  },
};

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: colors["primary-color"],
    },
  },
  typography: {
    fontFamily: "Space Grotesk",
  },
});
