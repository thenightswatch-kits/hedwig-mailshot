import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [cdt, setCDT] = useState();
  const [templates, setTemplates] = useState();
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://45.79.120.122:8000/api/template', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const res = await response.json();
      setTemplates(res)
    }
    getData();
  }, [])
  const handleFormSubmit = async (values) => {
    console.log(values);
    let data;
    if(values.type == 'schedule'){
      data = JSON.stringify({
        title: values.title,
        template_id: values.template_id,
        type: values.type,
        schedule_at: cdt
      })
    }else{
      data = JSON.stringify({
        title: values.title,
        template_id: values.template_id,
        type: values.type,
      })
    }
    const response = await fetch('http://45.79.120.122:8000/api/campaign/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: data
    });
    navigate(0)

  };

  return (
    <Box m="20px">
      <Header title="CREATE CAMPAIGN" subtitle="Create a New Campaign" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />
              <Select
                fullWidth
                variant="filled"
                label="Type of User"
                onBlur={handleBlur}
                onChange={handleChange}
                name="template_id"
                error={!!touched.type && !!errors.type}
                helperText={touched.type && errors.type}
                sx={{ gridColumn: "span 4" }}>
                {templates && templates.map((e) => {
                  return (<MenuItem value={e.id}>{e.title}</MenuItem>)
                })}
              </Select>
              <Select
                fullWidth
                variant="filled"
                label="Type of User"
                onBlur={handleBlur}
                onChange={handleChange}
                name="type"
                error={!!touched.type && !!errors.type}
                helperText={touched.type && errors.type}
                sx={{ gridColumn: "span 4" }}>
                <MenuItem value={"immediate"}>Immediate</MenuItem>
                <MenuItem value={"schedule"}>Schedule</MenuItem>
                {/* <MenuItem value={"cron"}>Cron Schedule</MenuItem> */}
              </Select>
              <input type='datetime-local' onChange={(e) => { setCDT(e.target.value); console.log(e.target.value) }} style={{ height: '100%', width: '427%', padding: '4%', color: 'white', backgroundColor: '#1F2A40' }}></input>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Campaing
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  template_id: yup.string().required("required"),
  type: yup.string().required("required"),
});
const initialValues = {
  title: "",
  template_id: "",
  type: "",
};


export default Form;
