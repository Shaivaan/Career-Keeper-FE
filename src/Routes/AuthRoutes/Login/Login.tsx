import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import { registerRoute } from '../../../Components/Sidebar/utils';
import { Formik } from 'formik';
import { FormTextField } from '../../../Components/ProjectsComp/AddEditProjectModalComp/AddEditProjectModalComp';
import { login_initial_values, loginSchema } from '../../../Components/FormsComp/InitialValues';



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
  return   <Formik
  initialValues={login_initial_values}
  validationSchema={loginSchema}
  onSubmit={(values) => {
    // this.handleFormSubmit(values);
    console.log(values);
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
    type="password"
    id="password"
    autoComplete="current-password"
    value={values.password}
    onChange={handleChange}
    error={(errors.password && touched.password) as boolean}
    helperText={touched.password && errors.password}
  />
  <FormControlLabel
    control={<Checkbox value="remember" color="primary" checked={values.is_remember} onChange={()=>setFieldValue('is_remember',!values.is_remember)}/>}
    label="Remember me"
  />
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
    onClick={()=>handleSubmit()}
  >
    Sign In
  </Button>
  <Grid container>
    <Grid item xs>
      <Link href="#" variant="body2">
        Forgot password?
      </Link>
    </Grid>
    <Grid item>
      <Link href={registerRoute} variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </Grid>
  </Grid>
</Box>
    </>)}</Formik>
 
}