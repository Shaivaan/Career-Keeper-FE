import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginRoute } from '../../../Components/Sidebar/utils';
import { Formik } from 'formik';
import { FormTextField } from '../../../Components/ProjectsComp/AddEditProjectModalComp/AddEditProjectModalComp';
import { forgot_pw_initial_value, forgotPasswordSchema } from '../../../Components/FormsComp/InitialValues';
import { handleforgotPassword } from '../../../Firebase/AuthFunction';
import { useRef, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../../Zustand/Zustand';
import { forgotPasswordRestMail } from '../../../Zustand/Constants';


const defaultTheme = createTheme();

export default function ForgotPassword() {



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
            Forgot Password
          </Typography>

          <ForgotPasswordForm/>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


const ForgotPasswordForm = ()=>{

  const navigate = useNavigate();
  const loginFormRef = useRef(null);
  const [isSubmitButtonDisabled,setIsSubmitButtonDisabled] = useState(false);
  const showAlert = useAlert();


  const handleError=()=>{
    showAlert('Error sending password reset email','error');
  }

  const handleSuccess =()=>{
    showAlert(forgotPasswordRestMail,'success');
    (loginFormRef as unknown as {current:{resetForm:()=>void}}).current.resetForm();
  }

  const handleFinally = ()=>{
    handleSetButtonHandler(false);
  }

  const handleSetButtonHandler=(isLoading:boolean)=>{
    setIsSubmitButtonDisabled(isLoading)
  }


  return <Formik
  initialValues={forgot_pw_initial_value}
  validationSchema={forgotPasswordSchema}
  innerRef={loginFormRef}
  onSubmit={(values) => {
    handleSetButtonHandler(true);
    handleforgotPassword(values,handleSuccess,handleError,handleFinally)
  }}
  validateOnChange
  validateOnBlur
  enableReinitialize
>
  {({
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
  }) => (
    <>
     <Box sx={{ mt: 1 }}>
  <FormTextField
    margin="normal"
    required
    fullWidth
    id="email"
    label="Email Address"
    name="email"
    autoComplete="email"
    autoFocus
    onChange={handleChange}
    value={values.email}
    error={(errors.email && touched.email) as boolean}
    helperText={touched.email && errors.email}
  />
  <LoadingButton
    type="submit"
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
    onClick={()=>handleSubmit()}
    disabled={isSubmitButtonDisabled}
    loading={isSubmitButtonDisabled}
  >
    Confirm Email
  </LoadingButton>
  <Grid container justifyContent={'end'}>
    <Grid item>
      <Link className='link_cursor' onClick={()=>navigate(loginRoute)} variant="body2">
        {"Already have an account? Sign in"}
      </Link>
    </Grid>
  </Grid>
</Box>
    </>)}</Formik>
 
}