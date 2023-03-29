import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { mockDataContacts } from "../../data/mockData";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useState, useEffect } from "react";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [campaign, setCampaign] = useState();
  useEffect(() => {
    const getCampaignData = async () => {
      const response = await fetch('http://45.79.120.122:8000/api/campaign/', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const res = await response.json();
      setCampaign(res.filter((e)=>{
        if(e.status != 'pending'){
          return e
        }
      }))
      console.log(res)
    }
    getCampaignData();
  }, [])
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "user_id",
      headerName: "Created By",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "template_id",
      headerName: "Mail Template",
      flex: 1,
    },
    {
      field: "schedule_at",
      headerName: "Scheduled At",
      flex: 1,
    },
    {
      field: "started_at",
      headerName: "Started At",
      flex: 1,
    },
    {
      field: "ended_at",
      headerName: "Ended At",
      flex: 1,
    },
    {
      field: "total_mail",
      headerName: "Total",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              View
            </Typography>
          </Box>
        );
      },
    },
  ];

  if(campaign){
    return (
      <Box m="20px">
        <Header
          title="CAMPAIGNS"
          subtitle="List of All Campaigns"
        />
        <Box
          m="0px 0 0 0"
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
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            rows={campaign}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    );
  }
};

export default Team;
