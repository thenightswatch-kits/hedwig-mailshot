import { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./Login";
import User from "./User";
import Admin from "./Admin";

function App() {
  const [theme, colorMode] = useMode();
  const [content, setContent] = useState();
  useEffect(() => {
    const signin = async () => {
      const response = await fetch('http://45.79.120.122:8000/api/user', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const res = await response.json();
      setContent(res)
    }
    signin();
  }, [])
  if (content) {
    if (content.detail) {
      return (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <Login />
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      );
    } else if (content.permission == 'admin') {
      return (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <Admin />
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      );
    } else if (content.permission != 'admin') {
      return (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <User user={content}/>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      )
    }
  }

}

export default App;
