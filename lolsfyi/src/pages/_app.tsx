import Header from '@/components/Header/Header';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { Component } from 'react';
import darkTheme from "@/theme/darkTheme";
import lightTheme from "@/theme/lightTheme";
import { AppProps } from 'next/app';

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const App = ({ Component, pageProps }: AppProps) => {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const darkThemeChosen = React.useMemo(
    () =>
      createTheme({
        ...darkTheme,
      }),
    [mode]
  );
  const lightThemeChosen = React.useMemo(
    () =>
      createTheme({
        ...lightTheme,
      }),
    [mode]
  );
  return (
  <>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider
        theme={mode === "dark" ? darkThemeChosen : lightThemeChosen}
      >
        <CssBaseline />
        <Header ColorModeContext={ColorModeContext}/>
          <Component {...pageProps} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  </>);
}

export default App;