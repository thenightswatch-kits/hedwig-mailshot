import { Box, Typography, useTheme, Input, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const AdminGroups = () => {
  const theme = useTheme();
  const [group, setGroup] = useState();
  useEffect(() => {
    const getGroupData = async () => {
      const response = await fetch('http://localhost:8000/api/group', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const res = await response.json();
      console.log(res)
      setGroup(res)
    }

    getGroupData();
  }, [])
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "permission",
      headerName: "Access Level",
      flex: 1,
    },
  ];
  if (group) {
    return (
      <Box m="20px">
        <Header title="GROUPS" subtitle="Managing the Groups" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid rows={group} columns={columns} />
        </Box>
      </Box>
    );
  }

};

export default AdminGroups;
