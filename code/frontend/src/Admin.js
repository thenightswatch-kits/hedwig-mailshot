import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import AdminSidebar from "./scenes/global/adminSidebar";
import AdminDashboard from "./scenes/adminDashboard";
import AdminApproval from "./scenes/adminApproval";
import AdminGroups from "./scenes/adminGroups";
import AdminAddGroups from "./scenes/adminAddGroup";
import AdminCampaign from "./scenes/adminCampaigns";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function Admin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <AdminSidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/approval" element={<AdminApproval />} />
              <Route path="/groups" element={<AdminGroups />} />
              <Route path="/addgroup" element={<AdminAddGroups />} />
              <Route path="/campaigns" element={<AdminCampaign />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Admin;
