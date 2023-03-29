import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState, useEffect, forceUpdate } from "react";
import { useNavigate } from "react-router-dom";

const AdminApproval = () => {
  const navigate = useNavigate()

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
        if(e.status == 'pending'){
          return e
        }
      }))
      console.log(res)
    }
    getCampaignData();
  }, [])



  const handleApprove = async (id, status) =>{
    const data = JSON.stringify({'id':id,'status':status})
    const respones = await fetch('http://45.79.120.122:8000/api/campaign/approve/',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: data
    })
    navigate(0)
  }


  const columns = [
    { field: "id", headerName: "Campaign ID" },
    {
      field: "title",
      headerName: "Title",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "user_id",
      headerName: "User",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.5,
    },
    {
      field: "total_mail",
      headerName: "Total Mail",
      flex: 0.5,
    }, 
    {
      field: "status",
      headerName: "Total Mail",
      flex: 0.5,
    },
    {
      field: "accessLevel",
      headerName: "",
      flex: 0.4,
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }} onClick={()=>{handleApprove(id,'approved')}}>
              Approve
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "    ",
      headerName: "",
      flex: 0.4,
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }} onClick={()=>{handleApprove(id,'rejected')}}>
              Reject
            </Typography>
          </Box>
        );
      },
    },
  ];
  if(campaign){
    return (
      <Box m="20px">
        <Header title="APPROVAL REQUESTS" subtitle="Managing the approval requests" />
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
          <DataGrid rows={campaign} columns={columns} />
        </Box>
      </Box>
    );
  }
};

export default AdminApproval;
