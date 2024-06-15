import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { projectsRoute, registerRoute } from '../../../Components/Sidebar/utils';
import { Formik, FormikProps } from 'formik';
import { FormTextField } from '../../../Components/ProjectsComp/AddEditProjectModalComp/AddEditProjectModalComp';
import { login_initial_values, loginSchema } from '../../../Components/FormsComp/InitialValues';
import { handleSignInUser } from '../../../Firebase/AuthFunction';
import { useRef, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment } from '@mui/material';
import {Visibility,VisibilityOff} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../../Zustand/Zustand';
import { loginSuccessMessage } from '../../../Zustand/Constants';
import './Login.css';


const defaultTheme = createTheme();

export default function SignIn() {



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
            Sign in
          </Typography>

          <LoginForm/>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


const LoginForm = ()=>{

  const navigate = useNavigate();
  const loginFormRef = useRef(null);
  const [isSubmitButtonDisabled,setIsSubmitButtonDisabled] = useState(false);
  const [isPasswordVisible,setIsPasswordVisible] = useState(false);
  const showAlert = useAlert();


  const handleError=(error:unknown)=>{
    const formRef = loginFormRef.current as unknown as FormikProps<LoginValueType>
    switch ((error as unknown as {code:string}).code) {
      case 'auth/user-not-found':
        formRef.setFieldError('email', 'No user found with this email.');
        break;
      case 'auth/invalid-credential':
        formRef.setFieldError('email', 'Incorrect Credentials.');
        formRef.setFieldError('password', 'Incorrect Credentials.');
        break;
      default:
    }
  }

  const handleSuccess =()=>{
    showAlert(loginSuccessMessage,'success')
    navigate(projectsRoute);
  }

  const handleFinally = ()=>{
    handleSetButtonHandler(false);
  }

  const handleSetButtonHandler=(isLoading:boolean)=>{
    setIsSubmitButtonDisabled(isLoading)
  }

  const passwordHandler=()=>{
    setIsPasswordVisible(!isPasswordVisible);
  }


  return   <Formik
  initialValues={login_initial_values}
  validationSchema={loginSchema}
  innerRef={loginFormRef}
  onSubmit={(values) => {
    handleSetButtonHandler(true);
    handleSignInUser(values,handleSuccess,handleError,handleFinally)
  }}
  validateOnChange
  validateOnBlur
  enableReinitialize
>
  {({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
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
  <FormTextField
    margin="normal"
    required
    fullWidth
    name="password"
    label="Password"
    type={!isPasswordVisible ? "password" : 'text'}
    id="password"
    autoComplete="current-password"
    value={values.password}
    onChange={handleChange}
    error={(errors.password && touched.password) as boolean}
    helperText={touched.password && errors.password}
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
  <FormControlLabel
    control={<Checkbox value="remember" color="primary" checked={values.is_remember} onChange={()=>setFieldValue('is_remember',!values.is_remember)}/>}
    label="Remember me"
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
    Sign In
  </LoadingButton>
  <Grid container>
    <Grid item xs>
      <Link href="#" variant="body2">
        Forgot password?
      </Link>
    </Grid>
    <Grid item>
      <Link className='link_cursor' onClick={()=>navigate(registerRoute)} variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </Grid>
  </Grid>
</Box>
    </>)}</Formik>
 
}