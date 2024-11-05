"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider as MaterialUIThemeProvider,
  PaletteOptions,
  ThemeOptions,
  createTheme,
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type PaletteMode = string | "light" | "dark";
export type Theme = string | "light" | "dark";

export type CustomPaletteOptions = {
  [key: string]: PaletteOptions;
};
export type CustomThemeOptions =
  | {
      palette: CustomPaletteOptions;
    } & ThemeOptions;

const ColorModeContext = createContext({
  toggleColorMode: (theme: Theme, mode: PaletteMode) => {},
  currentTheme: "",
  currentMode: "",
});

export function useCustomTheme() {
  return useContext(ColorModeContext);
}

export default function CustomThemeProvider({
  children,
  themes,
}: {
  children: ReactNode;
  themes: CustomThemeOptions;
}) {
  const [rendered, setRendered] = useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = useState<PaletteMode>(
    prefersDarkMode ? "dark" : "light"
  );

  const [theme, setTheme] = useState<Theme>(prefersDarkMode ? "dark" : "light");

  useEffect(() => {
    setRendered(() => {
      const loadMode =
        localStorage.getItem("mode") || (prefersDarkMode ? "dark" : "light");
      const loadTheme =
        localStorage.getItem("theme") || (prefersDarkMode ? "dark" : "light");
      setTheme(loadTheme as Theme);
      setMode(loadMode as PaletteMode);
      return true;
    });
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: (theme: Theme, mode: PaletteMode | "system") => {
        setMode(
          mode === "system" ? (prefersDarkMode ? "dark" : "light") : mode
        );
        setTheme(
          theme === "system" ? (prefersDarkMode ? "dark" : "light") : theme
        );
        localStorage.setItem("mode", mode);
        localStorage.setItem("theme", theme);
      },
    }),
    []
  );

  const customTheme = useMemo(() => {
    const configuredTheme = createTheme({
      ...themes,
      palette: {
        ...themes.palette[theme],
        mode: mode as "light" | "dark",
      },
    });
    const generatedPalette: any = {};
    if (!themes.palette[theme]) return configuredTheme;
    for (const [name, colors] of Object.entries(themes.palette[theme])) {
      if (name && typeof colors !== "undefined") {
        try {
          generatedPalette[name] = configuredTheme.palette.augmentColor({
            color: colors,
          });
        } catch (e: unknown) {
          continue;
        }
      }
    }
    return createTheme(configuredTheme, {
      palette: generatedPalette,
    });
  }, [mode, theme]);

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ColorModeContext.Provider
        value={{ ...colorMode, currentTheme: theme, currentMode: mode }}
      >
        <MaterialUIThemeProvider theme={customTheme}>
          <CssBaseline />
          {rendered && children}
        </MaterialUIThemeProvider>
      </ColorModeContext.Provider>
    </AppRouterCacheProvider>
  );
}
