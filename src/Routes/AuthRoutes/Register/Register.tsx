import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginRoute, projectsRoute } from '../../../Components/Sidebar/utils';
import { FormTextField } from '../../../Components/ProjectsComp/AddEditProjectModalComp/AddEditProjectModalComp';
import { Formik, FormikProps } from 'formik';
import { register_initial_values, register_validation_schema } from '../../../Components/FormsComp/InitialValues';
import { useRef, useState } from 'react';
import { handleSubmitUserRegister } from '../../../Firebase/AuthFunction';
import {LoadingButton}  from '@mui/lab'
import { useNavigate } from 'react-router-dom';
import { useZustandStore } from '../../../Zustand/Zustand';
import { registersuccessMessage } from '../../../Zustand/Messages';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';



const defaultTheme = createTheme();

export default function SignUp() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
         <RegisterForm/>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const RegisterForm = ()=>{
  const navigate = useNavigate();
  const registerFormRef = useRef<null | FormikProps<SignUpFormValuesType>>(null);
  const [isSubmitDisable,setIsSubmitDisable] = useState(false);
  const [isPasswordVisible,setIsPasswordVisible] = useState(false);
  const setAlertOpen = useZustandStore((state) => state.setAlertOpen);
  const setAlertMessage = useZustandStore((state) => state.setAlertMessage);
  const handleSuccess = ()=>{
    setAlertMessage(registersuccessMessage);
    setAlertOpen(true);
    navigate(projectsRoute)
  }

  const handleError=(error:unknown)=>{
    switch ((error as unknown as {code:string}).code) {
      case 'auth/email-already-in-use':
        (registerFormRef.current as FormikProps<SignUpFormValuesType>).setFieldError('email','Email Already Exists');
        break;
      case 'auth/invalid-email':     
      //   setMessage('This email address is invalid.');
        break;
}
  }

  const handleLoader=(isLoading:boolean)=>{
    setIsSubmitDisable(isLoading);
  }

  const handleFinally=()=>{
    handleLoader(false);
  }

  const passwordHandler=()=>{
    setIsPasswordVisible(!isPasswordVisible)
  }

  return  <Box sx={{ mt: 3 }}>

        <Formik
          initialValues={register_initial_values}
          validationSchema={register_validation_schema}
          onSubmit={(values) => {
            setIsSubmitDisable(true)
            handleSubmitUserRegister(values,handleError,handleSuccess,handleFinally)
          }}
          validateOnChange
          validateOnBlur
          enableReinitialize
          innerRef={registerFormRef}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
          }) => (
            <>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormTextField
                autoComplete="off"
                name="first_name"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
                value={values.first_name}
                error={(errors.first_name && touched.first_name) as boolean}
                helperText={touched.first_name && errors.first_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="off"
                value={values.last_name}
                error={(errors.last_name && touched.last_name) as boolean}
                helperText={touched.last_name && errors.last_name}
                onChange={handleChange}

              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                error={(errors.email && touched.email) as boolean}
                helperText={touched.email && errors.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                required
                fullWidth
                name="password"
                label="Password"
                type={isPasswordVisible ?  "text" : "password"}
                id="password"
                autoComplete="off"
                value={values.password}
                error={(errors.password && touched.password) as boolean}
                helperText={touched.password && errors.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={passwordHandler}>
                     {isPasswordVisible ? <Visibility /> : <VisibilityOff/>}
                    </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={()=>handleSubmit()}
            loading={isSubmitDisable}
            disabled={isSubmitDisable}
          >
            Sign Up
          </LoadingButton>
          </>
        
        )}
        </Formik>





  <Grid container justifyContent="flex-end">
    <Grid item>
      <Link className='link_cursor' onClick={()=>navigate(loginRoute)} variant="body2">
        Already have an account? Sign in
      </Link>
    </Grid>
  </Grid>
</Box>
}