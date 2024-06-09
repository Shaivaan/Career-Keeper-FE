import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginRoute } from '../../../Components/Sidebar/utils';
import { FormTextField } from '../../../Components/ProjectsComp/AddEditProjectModalComp/AddEditProjectModalComp';
import { Formik } from 'formik';
import { register_initial_values, register_validation_schema } from '../../../Components/FormsComp/InitialValues';


// TODO remove, this demo shouldn't need to reset the theme.
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
  return  <Box sx={{ mt: 3 }}>

        <Formik
          initialValues={register_initial_values}
          validationSchema={register_validation_schema}
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
            errors,
            touched,
          }) => (
            <>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormTextField
                autoComplete="given-name"
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
                autoComplete="family-name"
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
                type="password"
                id="password"
                autoComplete="off"
                value={values.password}
                error={(errors.password && touched.password) as boolean}
                helperText={touched.password && errors.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={()=>handleSubmit()}
          >
            Sign Up
          </Button>
          </>
        
        )}
        </Formik>





  <Grid container justifyContent="flex-end">
    <Grid item>
      <Link href={loginRoute} variant="body2">
        Already have an account? Sign in
      </Link>
    </Grid>
  </Grid>
</Box>
}