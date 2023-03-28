import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState, useEffect, forceUpdate } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";

const AdminRecipients = () => {
  const navigate = useNavigate()

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [campaign, setCampaign] = useState();
  useEffect(() => {
    const getCampaignData = async () => {
      const response = await fetch('http://localhost:8000/api/recipients/', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const res = await response.json();
      setCampaign(res)
      console.log(res)
    }
    getCampaignData();
  }, [])



  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data)
        results.data.map(async (e) => {
          console.log(e)
          e['failed'] = 0
          const response = await fetch('http://localhost:8000/api/recipients/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(e)
          });
          console.log(response)
        })
      },
    });
  };


  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "E mail",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "state",
      headerName: "State",
      flex: 0.5,
    },
    {
      field: "district",
      headerName: "District",
      flex: 0.5,
    },
    {
      field: "taluk",
      headerName: "Taluk",
      flex: 0.5,
    },
    {
      field: "failed",
      headerName: "Failed",
      flex: 0.5,
    },
    {
      field: "dob",
      headerName: "DOB",
      flex: 0.5,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
    },
  ];
  if (campaign) {
    return (
      <Box m="20px">
        <Box mr="20px" sx={{ display: "flex", justifyContent: "space-between" }}>
          <Header title="RECIPIENTS" subtitle="Managing the recipient email sets" />
          <label htmlFor="upload-photo">
            <input onChange={changeHandler}
              style={{ display: 'none' }}
              id="upload-photo"
              name="upload-photo"
              type="file"
            />

            <Button color="secondary" variant="contained" component="span">
              Upload CSV
            </Button>
          </label>
        </Box>
        <Box
          m="10px 0 0 0"
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

export default AdminRecipients;
