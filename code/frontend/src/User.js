import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import UserSidebar from "./scenes/global/userSidebar";
import Dashboard from "./scenes/userDashboard";
import Campaign from "./scenes/userCampaigns";
import Calendar from "./scenes/userCalendar/calendar";
import Form from "./scenes/userCreateCampaign";
import Template from "./scenes/userCreateTemplate"
import Table from "./scenes/userTemplates"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function User({user}) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <UserSidebar isSidebar={isSidebar} user={user}/>
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/campaigns" element={<Campaign />} />
              <Route path="/schedules" element={<Calendar />} />
              <Route path="/addcampaign" element={<Form />} />
              <Route path="/template" element={<Table />} />
              <Route path="/addtemplate" element={<Template />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default User;
